import React, { useState, useEffect } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useFetchProducts } from "../../hooks/useFetchProducts";
import "./newInvoice.scss";
import { useFetchUsers } from "../../hooks/useFetchUsers";
import { useFetchCompany } from "../../hooks/useFetchCompany";
import InvoiceValidations from "../../middlewares/invoice-validations";
import { useFetchCorrelative } from "../../hooks/useFetchCorrelative";
import useCorrelativeUpdater from "../../hooks/useCorrelativeUpdater";
import { useUpdateProduct } from '../../hooks/useUpdateProduct'
import useCreateInvoice from "../../hooks/useCreateInvoice";
import LoadingModal from "../../components/modal/LoadingModal";



const New = () => {
    const { data } = useFetchProducts()
    const [rtnCustomer, setRtnCustomer] = useState('')
    const { dataUser } = useFetchUsers(rtnCustomer)
    const { dataCompany } = useFetchCompany()
    const { dataCorrelative } = useFetchCorrelative()
    const { isLoadingProduct, error, updateProduct } = useUpdateProduct();

    const [invoiceItems, setInvoiceItems] = useState([])
    const [totalSummary, setTotalSummary] = useState(0)
    const [subtotalSummary, setSubtotalSummary] = useState(0)
    const [taxSummary, setTaxSummary] = useState(0)
    const [discountSummary, setDiscountSummary] = useState(0)
    const [isLoading, setIsLoading] = useState(false);

    const correlativeUpdater = useCorrelativeUpdater()
    const createInvoiceHook = useCreateInvoice()
    const invoiceValidations = new InvoiceValidations()

    useEffect(() => {
        invoiceValidations.isExpired(dataCompany.invoiceDueDate)
        invoiceValidations.outRange(parseInt(dataCorrelative.nInvoice) + 1, parseInt(dataCompany.finalInvoiceRange))
    },
        [dataCompany, dataCorrelative]) // Solo cuando dataCompany cambia

    const handleRTN = (value) => setRtnCustomer(value)

    const handleAddItem = () => {
        const newItem = {
            id: 0,
            sku: "", // Agregar un campo SKU
            product: "",
            quantity: 2,
            price: 0,
            tax: 0.15,
            discount: 0,
            total: 0
        };
        setInvoiceItems([...invoiceItems, newItem]);
    };

    const handleDeleteItem = (index) => {
        invoiceItems.splice(index, 1)
        setInvoiceItems([...invoiceItems])
        updateTotalSumary()
    }

    const updateTotalSumary = () => {
        setSubtotalSummary(invoiceItems.reduce((acc, value) => acc + value.price * value.quantity, 0))
        setTaxSummary(invoiceItems.reduce((acc, value) => acc + value.price * value.tax * value.quantity, 0))
        setDiscountSummary(invoiceItems.reduce((acc, value) => acc + value.price * value.discount * value.quantity, 0))
        setTotalSummary(invoiceItems.reduce((acc, value) => acc + parseFloat(value.total), 0))
    }

    const handleSkuChange = (index, value) => {
        // Buscar el producto en base al SKU
        const product = data.find((product) => product.sku === value && product.status);
        if (product) {
            const updatedItems = [...invoiceItems];
            updatedItems[index] = {
                ...updatedItems[index],
                id: product.id,
                sku: value,
                product: product.name,
                price: product.price,
                discount: product.discount,
                total: 0
            };
            setInvoiceItems(updatedItems);
        }
    }

    const calculateSubtotal = (item) => {
        return ((item.price * ((1 + item.tax) - item.discount)) * item.quantity).toFixed(2)
    }

    const handleQuantityChange = (index, value) => {
        if (value) {
            invoiceItems[index].quantity = parseInt(value)
            invoiceItems[index].total = calculateSubtotal(invoiceItems[index])
        } else {
            invoiceItems[index].total = 0
        }
        setInvoiceItems([...invoiceItems])
        updateTotalSumary()
    }

    const handleSaveAction = async (actionType) => {
        setIsLoading(true); // Muestra el modal de carga
        if (actionType === "fullPayment") {
            const seller = sessionStorage.getItem('userID')
            if (!invoiceValidations
                .beforeCreate(
                    seller,
                    dataCompany.invoiceDueDate, //dueDate
                    invoiceItems.length,
                    invoiceItems.length && invoiceItems[0].sku,
                    dataCompany, dataUser
                )) {
                setIsLoading(false); // Oculta el modal de carga en caso de error
                return;
            }

            const detalleVentas = invoiceItems.map(item => ({
                cantidad: item.quantity,
                precio: item.price,
                isv: item.tax,
                descuento: item.discount,
                producto: {
                    id: parseInt(item.id)
                },
            }));

            const dataNewInvoice = {
                data: {
                    noFactura: parseInt(dataCorrelative.nInvoice) + 1,
                    medotoPago: "Efectivo",
                    estado: "Pagada",
                    vendedor: {
                        id: parseInt(seller)
                    },
                    cliente: {
                        id: parseInt(dataUser.id)
                    },
                    detalleVentas
                }
            }
            await correlativeUpdater.updateCorrelative(dataNewInvoice.data.noFactura)
            await createInvoiceHook.createInvoice(dataNewInvoice)
            invoiceItems.forEach(async (item) => await updateProduct(item.id, item.quantity))
            if (error === null) window.location.reload()
            setIsLoading(false);
        } else if (actionType === "partialPayment") {
            // Lógica para guardar y hacer un pago parcial
        } else alert("Disponible Próximante");
    }

    return (
        <div className="new-invoice">
            {isLoading && <LoadingModal />}
            <div className="header">
                <div className="top-right">
                    <span>
                        Fecha: {`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`}
                    </span>
                    <span>
                        Fecha Vencimiento: {data && dataCompany.invoiceDueDate}
                    </span>
                </div>
                <div className="customer-vendor">
                    {/* Input fields for Customer and Vendor */}
                    <div className="formInput">
                        <label>RTN:</label>
                        <input type="text"
                            onChange={e => handleRTN(e.target.value)}
                            placeholder="RTN del Cliente" />
                    </div>
                    <div className="formInput">
                        <label>Cliente:</label>
                        <input type="text"
                            value={dataUser && dataUser.name}
                            readOnly
                            placeholder="Nombre del Cliente" />
                    </div>
                    <div className="formInput">
                        <label>Vendedor:</label>
                        <input type="text" value={sessionStorage.getItem('userName')} readOnly />
                    </div>
                    <a href="/invoices" className="btnRegresar">Regresar</a>
                </div>
            </div>
            <div className="wraper">
                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th style={{ width: "330px" }}>Producto</th>
                            <th style={{ width: "100px" }}> Cantidad</th>
                            <th style={{ width: "80px" }}>Precio</th>
                            <th style={{ width: "60px" }}>ISV</th>
                            <th>Descuento</th>
                            <th>Subtotal</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody >
                        {invoiceItems.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        type="number"
                                        required
                                        onChange={(e) => handleSkuChange(index, e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input type="text"
                                        value={item.product}
                                        style={{ width: "400px" }}
                                        readOnly
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        required
                                        min={1}
                                        style={{ width: "100px" }}
                                        onChange={(e) => handleQuantityChange(index, e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={item.price}
                                        min={0}
                                        style={{ width: "80px" }}
                                        readOnly
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={item.tax}
                                        min={0}
                                        style={{ width: "60px" }}
                                        readOnly
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={item.discount}
                                        min={0}
                                        max={100}
                                        readOnly
                                    />
                                </td>
                                <td
                                    style={{ width: "120px", color: item.total < 0 ? "red" : "initial" }}>
                                    L. {item.total}</td>
                                <td>
                                    <button onClick={() => handleDeleteItem(index)}>
                                        <DeleteForeverIcon className="icon" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button className="btnAdd" onClick={handleAddItem}>Añadir Nuevo Artículo</button>
            <div className="calculations">
                {/* Display Subtotal, Tax, Discount, and Total */}
                <div className="invoice-summary">
                    <div className="summary-detail">
                        <div className="summary-div">
                            <div className="summary-description">Subtotal:</div>
                            <div className="summary-value"> L.{subtotalSummary.toFixed(2)} </div>
                        </div>
                        <div className="summary-div">
                            <div className="summary-description">Impuesto Total:</div>
                            <div className="summary-value"> L.{taxSummary.toFixed(2)} </div>
                        </div>
                        <div className="summary-div">
                            <div className="summary-description">Descuento Total:</div>
                            <div className="summary-value"> L.{discountSummary.toFixed(2)} </div>
                        </div>
                        <div className="summary-div">
                            <div className="summary-description">Monto Total:</div>
                            <div className="summary-value"> L.{totalSummary.toFixed(2)} </div>
                        </div>
                    </div>
                </div>
                <div className="actions">
                    <button
                        onClick={handleSaveAction}
                        id="btnSave">Guardar</button>
                    <button
                        onClick={handleSaveAction}
                        id="btnSavePartialPayment">Guardar y Hacer Pago Parcial</button>
                    <button
                        onClick={() => handleSaveAction('fullPayment')}
                        id="btnSaveFullPayment">Guardar y Hacer Pago Completo</button>

                </div>
            </div>
        </div >
    );
};

export default New;