import LoadingModal from "../../components/modal/LoadingModal"
import useOrder from "../../hooks/useOrder"
import { useEffect, useState } from "react"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import useProduct from "../../hooks/useProduct"
import useSupplier from "../../hooks/useSupplier"
import OrderDetail from "../../models/OrderDetail"
import User from "../../models/User"
import Supplier from "../../models/Supplier"
import Order from "../../models/Order"

const NewOrder = () => {
    const [orderItems, setorderItems] = useState([])
    const [totalSummary, setTotalSummary] = useState(0)
    const [subtotalSummary, setSubtotalSummary] = useState(0)
    const [taxSummary, setTaxSummary] = useState(0)
    const [discountSummary, setDiscountSummary] = useState(0)
    const { data, handleGetAll } = useProduct()
    const supplierHook = useSupplier()
    const [seletSupplier, setSelectedSupplier] = useState('')
    const [texto, setTexto] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { loading, handleCreate } = useOrder()

    useEffect(() => {
        handleGetAll()
        supplierHook.getAll()
    }, [])

    const manejarCambioTexto = (evento) => {
        setTexto(evento.target.value)
    }

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
        }
        setorderItems([...orderItems, newItem])
    }

    const handleSkuChange = (index, value) => {
        // Buscar el producto en base al SKU
        const product = data.find((product) => product.sku === value && product.status)
        if (product) {
            const updatedItems = [...orderItems]
            updatedItems[index] = {
                ...updatedItems[index],
                id: product.id,
                sku: value,
                product: product.name,
                price: product.cost,
                quantity: 0,
                discount: product.discount,
                total: 0
            }
            setorderItems(updatedItems)
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
        setorderItems([...orderItems])
        updateTotalSumary()
    }

    const handleDeleteItem = (index) => {
        orderItems.splice(index, 1)
        setorderItems([...orderItems])
        updateTotalSumary()
    }

    const updateTotalSumary = () => {
        setSubtotalSummary(orderItems.reduce((acc, value) => acc + value.price * value.quantity, 0))
        setTaxSummary(orderItems.reduce((acc, value) => acc + value.price * value.tax * value.quantity, 0))
        setDiscountSummary(orderItems.reduce((acc, value) => acc + value.price * value.discount * value.quantity, 0))
        setTotalSummary(orderItems.reduce((acc, value) => acc + parseFloat(value.total), 0))
    }

    const handleSaveAction = async () => {
        setIsLoading(true)
        if (!seletSupplier) {
            alert('No ha ingresado el Proveedor')
            setIsLoading(false)
            return
        }
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

        const encargado = new User(parseInt(sessionStorage.getItem('userID')))
        const proveedor = new Supplier(seletSupplier)
        const detalleOrdenes = orderItems.map(item => new OrderDetail(item.id, item.quantity))
        const resumen = texto
        const estado = "EN PROCESO"

        const nuevaOrden = { data: new Order(encargado, proveedor, detalleOrdenes, resumen, estado) }
        try {
            await handleCreate(nuevaOrden)
            alert('Orden Creada Exitósamente!')
            setTimeout(() => window.location.href = '/orders', 1000)
        } catch (error) {
            alert('Error al guardar la orden. Por favor, inténtalo de nuevo.')
        }
        setIsLoading(false)
    }

    return (<>
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
                        <label>Encargado:</label>
                        <input type="text" value={sessionStorage.getItem('userName')} readOnly />
                        <label style={{ marginTop: "6px" }}>Proveedor:</label>
                        <select
                            style={{
                                width: "100%",
                                padding: "5px",
                                border: "1px solid gray",
                                borderRadius: "4px",
                            }}
                            value={seletSupplier}
                            onChange={(e) => setSelectedSupplier(e.target.value)}
                        >
                            {loading ? (
                                <option value="" disabled>Cargando proveedores...</option>
                            ) : (
                                <>
                                    <option value="" disabled>Selecciona un proveedor</option>
                                    {supplierHook.data?.map(supplier => (
                                        <option key={supplier.id} value={supplier.id}>
                                            {supplier.name}
                                        </option>
                                    ))}
                                </>
                            )}
                        </select>
                    </div>
                    <div className="formInput">
                        <label>Resumen:</label>
                        <textarea
                            style={{
                                padding: "5px",
                                border: "1px solid gray",
                                borderRadius: "4px",
                                width: '100%'
                            }}
                            value={texto}
                            onChange={manejarCambioTexto}
                            rows={4}
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
                        {orderItems.map((item, index) => (
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
            <button className="btnAdd"
                onClick={handleAddItem}
            >Añadir Nuevo Artículo</button>
            <div className="calculations">
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
                </div>
            </div>
        </form>
    </>)
}
export default NewOrder