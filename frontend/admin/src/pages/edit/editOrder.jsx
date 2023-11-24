import './edit.scss'
import { useState, useEffect } from "react";
import "../new/newInvoice.scss";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useFetchProducts } from "../../hooks/useFetchProducts";
import LoadingModal from "../../components/modal/LoadingModal";
import { beforeCreateInvoice, performInvoiceValidations } from '../../helpers/invoice-validation'
import print from "../../helpers/print-invoice"
import OrderDetail from "../../models/OrderDetail";
import Product from "../../models/Product";
import Order from "../../models/Order";
import User from "../../models/User";
import useOrder from "../../hooks/useOrder";
import Supplier from "../../models/Supplier";
import getIdUrl from '../../helpers/get-id-url';
import useProvider from '../../hooks/useProvider';

const EditOrder = () => {
    const id = getIdUrl()
    const { data, loading, handleId, handleUpdate, handleLoading } = useOrder()
    const productData = useFetchProducts()

    const [orderItems, setOrderItems] = useState([])
    const [totalSummary, setTotalSummary] = useState(0)
    const [subtotalSummary, setSubtotalSummary] = useState(0)
    const [taxSummary, setTaxSummary] = useState(0)
    const [discountSummary, setDiscountSummary] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const { providers } = useProvider();
    const [supplierID, setSupplierID] = useState(0)
    const [status, setStatus] = useState('')
    const [summaryText, setSummaryText] = useState('')

    const handleSummaryText = (value) => setSummaryText(value)
    const handleStatus = (value) => setStatus(value)
    const handleSupplierID = (value) => setSupplierID(value)

    const handleProductList = () => {
        if (Array.isArray(data)) return;
        setOrderItems([...data?.details?.map(
            ({ quantity, productID, sku, productName, unitPrice }) => ({
                id: productID,
                sku,
                product: productName,
                quantity,
                price: unitPrice,
                tax: 0.15,
                discount: 0,
                total: (quantity * unitPrice * (1 + 0.15 - 0)).toFixed(2)
            }))])
    }

    useEffect(() => {
        handleId(id)
        handleProductList()
        handleStatus(data.status)
        handleSupplierID(data.supplierID)
        handleSummaryText(data.summary ? data.summary : '')
    }, [loading])

    const handleAddItem = () => {
        const newItem = {
            id: 0,
            sku: "", // Agregar un campo SKU
            product: "",
            quantity: 0,
            price: 0,
            tax: 0.15,
            discount: 0,
            total: 0
        };
        setOrderItems([...orderItems, newItem]);
    };

    const handleDeleteItem = (index) => {
        orderItems.splice(index, 1)
        setOrderItems([...orderItems])
        updateTotalSumary()
    }

    const updateTotalSumary = () => {
        setSubtotalSummary(orderItems.reduce((acc, value) => acc + value.price * value.quantity, 0))
        setTaxSummary(orderItems.reduce((acc, value) => acc + value.price * value.tax * value.quantity, 0))
        setDiscountSummary(orderItems.reduce((acc, value) => acc + value.price * value.discount * value.quantity, 0))
        setTotalSummary(orderItems.reduce((acc, value) => acc + parseFloat(value.total), 0))
    }

    const handleSkuChange = (index, value) => {
        // Buscar el producto en base al SKU
        const product = productData.data.find((product) => product.sku === value && product.status);
        if (product) {
            const updatedItems = [...orderItems];
            updatedItems[index] = {
                ...updatedItems[index],
                id: product.id,
                sku: value,
                product: product.name,
                price: product.price,
                quantity: 0,
                discount: product.discount,
                total: 0
            };
            setOrderItems(updatedItems);
        }
    }

    const calculateSubtotal = (item) => {
        return ((item.price * ((1 + item.tax) - item.discount)) * item.quantity).toFixed(2)
    }

    const handleQuantityChange = (index, value) => {
        if (value) {
            orderItems[index].quantity = parseInt(value)
            orderItems[index].total = calculateSubtotal(orderItems[index])
        } else {
            orderItems[index].quantity = 0
            orderItems[index].total = 0.00
        }
        setOrderItems([...orderItems])
        updateTotalSumary()
    }

    const handleSaveAction = async () => {
        setIsLoading(true)
        const agentID = sessionStorage.getItem('userID')
        // if (!dataUser) {
        //     alert('No ha ingresado los datos de Proveedor!')
        //     setIsLoading(false)
        //     return
        // }
        if (!orderItems.length) {
            alert('No ha añadido ningún producto!')
            setIsLoading(false)
            return
        }

        if ((orderItems.filter(item => (item.sku).trim() === "" || item.quantity < 1 || item.quantity === '')).length > 0) {
            alert('Uno de los productos no tiene lleno o no cumple con los parámetros el campo código y/o Cantidad!')
            setIsLoading(false)
            return
        }

        const Ordenes = orderItems.map(
            ({ quantity, id }) => new OrderDetail(id, quantity))

        const dataNewOrder = {
            data: new Order(
                new User(parseInt(agentID)),
                new Supplier(supplierID),
                Ordenes,
                summaryText,
                status
            )
        }
        await handleUpdate(id, dataNewOrder)
        // printInvoice()
        alert('Orden de Compra Modificada Exitósamente!')
        setTimeout(() => window.location.href = '/orders', 1000)
        // Lógica para guardar y hacer un pago parcial
        setIsLoading(false)
    }

    const printInvoice = () => {
        const invoiceInfo = {
            vendorId: sessionStorage.getItem('userID'),
            vendorName: sessionStorage.getItem('userName'),
            creationDate: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
            subtotal: subtotalSummary.toFixed(2),
            taxTotal: taxSummary.toFixed(2),
            discountTotal: discountSummary.toFixed(2),
            total: totalSummary.toFixed(2),
        }
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
                    </div>
                    <div className="customer-vendor">
                        <div className="formInput">
                            <label>Proveedor:</label>
                            <select
                                value={supplierID}
                                onChange={e => handleSupplierID(parseInt(e.target.value))}>
                                {providers?.map(provider => (
                                    <option key={provider.id} value={provider.id}>
                                        {provider.name}
                                    </option>
                                ))}
                            </select>
                            <label style={{ marginTop: "6px" }}>Estado de Orden:</label>
                            <select
                                value={status}
                                onChange={e => handleStatus(e.target.value)}>
                                <option value="EN PROCESO">EN PROCESO</option>
                                <option value="Recibida">Recibida</option>
                                <option value="Cancelada">Cancelada</option>
                            </select>
                        </div>
                        <div className="formInput">
                            <label>Encargado:</label>
                            <input type="text" value={sessionStorage.getItem('userName')} readOnly />
                        </div>
                        <div className="formInput">
                            <label>Resumen:</label>
                            <textarea id='txtSummary'
                                style={{
                                    padding: "5px",
                                    border: "1px solid gray",
                                    borderRadius: "4px",
                                }}
                                value={summaryText}
                                onChange={e => handleSummaryText(e.target.value)}
                                rows={4}
                                cols={50}
                            />
                        </div>

                        <a href="/orders" className="btnRegresar">Regresar</a>
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
                            {orderItems?.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <input
                                            type="number"
                                            required
                                            defaultValue={item.sku}
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
                                            defaultValue={item.quantity}
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
                    <div className="actions" style={{ justifyContent: 'start' }}>
                        <button
                            style={{ marginLeft: 5 }}
                            onClick={handleSaveAction}
                            id="btnSave">Guardar</button>
                    </div>
                </div>
            </form>
        </div >
    );
};

export default EditOrder;