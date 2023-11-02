import React, { useState, useEffect } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useFetchProducts } from "../../hooks/useFetchProducts";
import "./newInvoice.scss";
import { useFetchUsers } from "../../hooks/useFetchUsers";
import { useFetchCompany } from "../../hooks/useFetchCompany";
import { useFetchCorrelative } from "../../hooks/useFetchCorrelative";
import useCorrelativeUpdater from "../../hooks/useCorrelativeUpdater";
import { useUpdateProduct } from '../../hooks/useUpdateProduct'
import useCreateInvoice from "../../hooks/useCreateInvoice";
import LoadingModal from "../../components/modal/LoadingModal";
import { beforeCreateInvoice, performInvoiceValidations } from '../../helpers/invoice-validation'




const New = () => {
    const { data } = useFetchProducts()
    const [rtnCustomer, setRtnCustomer] = useState('')
    const { dataUser } = useFetchUsers(rtnCustomer)
    const { dataCompany } = useFetchCompany()
    const { dataCorrelative } = useFetchCorrelative()
    const { error, updateProduct } = useUpdateProduct();
    const correlativeUpdater = useCorrelativeUpdater()
    const createInvoiceHook = useCreateInvoice()

    const [invoiceItems, setInvoiceItems] = useState([])
    const [totalSummary, setTotalSummary] = useState(0)
    const [subtotalSummary, setSubtotalSummary] = useState(0)
    const [taxSummary, setTaxSummary] = useState(0)
    const [discountSummary, setDiscountSummary] = useState(0)
    const [isLoading, setIsLoading] = useState(false);


    performInvoiceValidations(dataCompany, dataCorrelative)
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
            if (!invoiceItems.length) {
                alert('No ha añadido ningún producto!')
                setIsLoading(false)
                return
            }
            if (!dataUser) {
                alert('No ha ingresado los datos de Cliente!')
                setIsLoading(false)
                return
            }
            if (!beforeCreateInvoice(
                seller, dataCompany, dataUser, invoiceItems
            )) {
                setIsLoading(false);
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
            setIsLoading(false)
            printInvoice()
            return
            await correlativeUpdater.updateCorrelative(dataNewInvoice.data.noFactura)
            await createInvoiceHook.createInvoice(dataNewInvoice)
            invoiceItems.forEach(async (item) => await updateProduct(item.id, item.quantity))
            setTimeout(() => {
                if (error === null) window.location.href = '/invoices'
                setIsLoading(false)
            }, 2000)
        } else if (actionType === "partialPayment") {
            // Lógica para guardar y hacer un pago parcial
        } else alert("Disponible Próximante");
    }

    const printInvoice = () => {

        const invoiceInfo = {
            rtnCustomer: rtnCustomer,
            customerName: dataUser ? dataUser.name : '',
            vendorId: sessionStorage.getItem('userID'),
            vendorName: sessionStorage.getItem('userName'),
            creationDate: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
            subtotal: subtotalSummary.toFixed(2),
            taxTotal: taxSummary.toFixed(2),
            discountTotal: discountSummary.toFixed(2),
            total: totalSummary.toFixed(2),
        };

        // Crear un formato imprimible con la información recolectada
        const thermalPrintWidth = 80;
        const printableContent = `
        <div style="width: 160px; display: flex; flex-direction:column; text-align: left;">
            <div style="width: 100%; font-weight: bold; font-size:14px"><center>${dataCompany.dataName}</center></div>
            <div>Dirección: ${dataCompany.address}</div>
            <div>Correo: ${dataCompany.email}</div>
            <div>Teléfono: ${dataCompany.telphone}</div>
            <div>Sitio Web: ${dataCompany.website}</div>
            <div>RTN: 0301-9014-31231</div>
            <div>CAI: ${dataCompany.CAI}</div>
            <hr>
            <hr>
            <div>RTN del Cliente: ${invoiceInfo.rtnCustomer}</div>
            <div>Cliente: ${invoiceInfo.customerName}</div>
            <div>Vendedor: ${invoiceInfo.vendorName}</div>
            <div>Fecha de Emisión: ${invoiceInfo.creationDate}</div>
            <div>Fecha de Vencimiento: ${dataCompany.invoiceDueDate}</div>
            <div>Original* Copia</div>
            <hr>
            <hr>
            ${invoiceItems
                .map((item) => `
            <div style="width: 100%;">
                <div>${item.sku} ${item.product}</div>
                <div>
                    <span>Unds: ${item.quantity}</span>
                    <span>P/U: ${item.price}${item.tax === 0 ? '' : '*'}${item.discount === 0 ? '' : '**'}</span>
                    <span style="display: inline-block; float: right;">L. ${item.total}</span>
                </div>
            </div>
            <hr>
            `).join('')}
            <hr>
            <div style="width: 100%; text-align: right;">
                <div>Subtotal: L. ${invoiceInfo.subtotal}</div>
                <div>ISV: L. ${invoiceInfo.taxTotal}</div>
                <div>Descuento: L. ${invoiceInfo.discountTotal}</div>
                <div>Monto Total: L. ${invoiceInfo.total}</div>
            </div>
            <div style="text-align: center;">La factura es beneficio de todos "Exíjala"</div>
      </div>
      `;
        const printWindow = window.open('', ' ', '');
        printWindow.document.open();
        printWindow.document.write(`
            <html>
            <head>
            </head>
            <body>
            <style>
                    *{
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                        font-family: Arial;
                        font-size: 8px;
                    }
                    div, hr{
                        margin-top: 3px;
                    }

                </style>
            <div>${printableContent}</div>
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
        printWindow.close();
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
                        onClick={() => {
                            handleSaveAction('fullPayment');
                        }}
                        id="btnSaveFullPayment">
                        Guardar y Hacer Pago Completo
                    </button>

                </div>
            </div>
        </div >
    );
};

export default New;