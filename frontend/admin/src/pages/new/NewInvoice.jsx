import { useEffect, useState } from "react";
import "./newInvoice.scss";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import useProduct from "../../hooks/useProduct";
import { useFetchUsers } from "../../hooks/useFetchUsers";
import { useFetchCompany } from "../../hooks/useFetchCompany";
import useCorrelative from "../../hooks/useCorrelative";
import LoadingModal from "../../components/modal/LoadingModal";
import { beforeCreateInvoice, performInvoiceValidations } from '../../helpers/invoice-validation'
import print from "../../helpers/print-invoice"
import InvoiceDeatil from "../../models/InvoiceDeatil";
import Product from "../../models/Product";
import Invoice from "../../models/Invoice";
import User from "../../models/User";
import useInvoice from "../../hooks/useInvoice";

const New = () => {
    const { data, handleGetAll } = useProduct()
    const [rtnCustomer, setRtnCustomer] = useState('')
    const { dataUser } = useFetchUsers(rtnCustomer)
    const { dataCompany } = useFetchCompany()
    const correlativeHook = useCorrelative()
    const { handleCreate } = useInvoice()

    const [invoiceItems, setInvoiceItems] = useState([])
    const [totalSummary, setTotalSummary] = useState(0)
    const [subtotalSummary, setSubtotalSummary] = useState(0)
    const [taxSummary, setTaxSummary] = useState(0)
    const [discountSummary, setDiscountSummary] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    performInvoiceValidations(dataCompany, correlativeHook.data)

    useEffect(() => {
        handleGetAll()
        correlativeHook.get()
    }, [])

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
        const product = data?.find((product) => product.sku === value && product.status);
        if (product) {
            const updatedItems = [...invoiceItems];
            updatedItems[index] = {
                ...updatedItems[index],
                id: product.id,
                sku: value,
                product: product.name,
                price: product.price,
                quantity: 0,
                stock: product.quantity,
                discount: product.discount,
                total: 0
            };
            setInvoiceItems(updatedItems);
        }
    }

    const calculateSubtotal = (item) => {
        return ((item.price * ((1 + item.tax) - item.discount)) * item.quantity).toFixed(2)
    }

    const handleQuantityChange = (index, value, isReturnable = true) => {
        if (value) {
            if (parseInt(value) > invoiceItems[index].stock) {
                if (isReturnable) {
                    alert('La cantidad de productos ingresada es superior a la cantidad de existencia!')
                    document.getElementById(`inputQuantity${index}`).value = 1
                    handleQuantityChange(index, 1, false)
                    return
                }
            }
            invoiceItems[index].quantity = parseInt(value)
            invoiceItems[index].total = calculateSubtotal(invoiceItems[index])
        } else {
            invoiceItems[index].quantity = 0
            invoiceItems[index].total = 0.00
        }
        setInvoiceItems([...invoiceItems])
        updateTotalSumary()
    }

    const handleSaveAction = async (actionType) => {
        setIsLoading(true)
        if (actionType === "fullPayment") {
            const sellerID = sessionStorage.getItem('userID')
            if (!dataUser) {
                alert('No ha ingresado los datos de Cliente!')
                setIsLoading(false)
                return
            }
            if (!invoiceItems.length) {
                alert('No ha añadido ningún producto!')
                setIsLoading(false)
                return
            }

            if ((invoiceItems.filter(item => (item.sku).trim() === "" || item.quantity < 1 || item.quantity === '')).length > 0) {
                alert('Uno de los productos no tiene lleno o no cumple con los parámetros el campo código y/o Cantidad!')
                setIsLoading(false)
                return
            }
            if (!beforeCreateInvoice(
                sellerID, dataCompany, dataUser, invoiceItems
            )) {
                setIsLoading(false)
                return
            }

            const detalleVentas = invoiceItems.map(
                ({ quantity, price, tax, discount, id }) =>
                (new InvoiceDeatil(
                    quantity, price, tax, discount,
                    new Product(parseInt(id))
                ))
            )

            const dataNewInvoice = {
                data: new Invoice(
                    parseInt(correlativeHook.data.nInvoice) + 1,
                    'Efectivo',
                    'Pagada',
                    new User(parseInt(sellerID)),
                    new User(parseInt(dataUser.id)),
                    detalleVentas
                )
            }
            try {
                await handleCreate(dataNewInvoice, invoiceItems)
                printInvoice()
                alert('Factura Creada Exitósamente!')
                setTimeout(() => window.location.href = '/invoices', 1000)
            } catch (error) {
                alert(error)
            }
        } else if (actionType === "partialPayment") {
            // Lógica para guardar y hacer un pago parcial
        } else alert("Disponible Próximante");
        setIsLoading(false)
    }

    const printInvoice = () => {
        const invoiceInfo = {
            rtnCustomer: rtnCustomer,
            customerName: dataUser ? dataUser.name : '',
            vendorId: sessionStorage.getItem('userID'),
            vendorName: sessionStorage.getItem('userName'),
            creationDate: new Date().toLocaleDateString(),
            subtotal: subtotalSummary.toFixed(2),
            taxTotal: taxSummary.toFixed(2),
            discountTotal: discountSummary.toFixed(2),
            total: totalSummary.toFixed(2),
        }
        print(dataCompany, invoiceItems, invoiceInfo)
    }

    return (
        <div>
            {isLoading && <LoadingModal />}
            <form className="new-invoice" onSubmit={e => e.preventDefault()}>
                <div className="header">
                    <div className="top-right">
                        <span>
                            Fecha: {new Date().toLocaleDateString('es-ES', {
                                year: 'numeric',
                                day: '2-digit',
                                month: '2-digit',
                            })}
                        </span>
                        <span>
                            Fecha Vencimiento: {data && dataCompany ? (dataCompany.invoiceDueDate) : ''}
                        </span>
                    </div>
                    <div className="customer-vendor">
                        {/* Input fields for Customer and Vendor */}
                        <div className="formInput">
                            <label>RTN:</label>
                            <input type="text"
                                required
                                maxLength={14}
                                onChange={e => handleRTN(e.target.value)}
                                placeholder="RTN del Cliente" />
                        </div>
                        <div className="formInput">
                            <label>Cliente:</label>
                            <input type="text"
                                value={dataUser ? dataUser.name : ''}
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
                                            required
                                            readOnly
                                        />
                                    </td>
                                    <td>
                                        <input
                                            id={`inputQuantity${index}`}
                                            type="number"
                                            required
                                            min={1}
                                            max={item.stock}
                                            style={{ width: "100px" }}
                                            onChange={(e) => handleQuantityChange(index, e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={item.price}
                                            required
                                            min={0}
                                            style={{ width: "80px" }}
                                            readOnly
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={item.tax}
                                            required
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
                                            required
                                            max={1}
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
                            onClick={() => {
                                handleSaveAction('fullPayment');
                            }}
                            id="btnSaveFullPayment">
                            Guardar y Hacer Pago Completo
                        </button>
                    </div>
                </div>
            </form>
        </div >
    );
};

export default New;