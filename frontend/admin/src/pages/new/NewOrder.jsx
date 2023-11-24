import LoadingModal from "../../components/modal/LoadingModal";
import useOrder from "../../hooks/useOrder";
import { useState } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useFetchProducts } from "../../hooks/useFetchProducts";
import useProvider from "../../hooks/useProvider";
import { beforeCreateInvoice, performInvoiceValidations } from '../../helpers/invoice-validation';
import OrderDetail from "../../models/OrderDetail";
import User from "../../models/User";
import Supplier from "../../models/Supplier";
import Order from "../../models/Order";

const NewOrder = () => {
    const [invoiceItems, setInvoiceItems] = useState([])    
    const { loading } = useOrder()
    const [totalSummary, setTotalSummary] = useState(0)
    const [subtotalSummary, setSubtotalSummary] = useState(0)
    const [taxSummary, setTaxSummary] = useState(0)
    const [discountSummary, setDiscountSummary] = useState(0)
    const { data } = useFetchProducts()
    const { providers } = useProvider();
    const [selectedProvider, setSelectedProvider] = useState('');
    const [texto, setTexto] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const { loading: orderLoading, handleCreate } = useOrder();

    const manejarCambioTexto = (evento) => {
        setTexto(evento.target.value);
      };

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

    const handleSaveAction = async (actionType) => {
        setIsLoading(true)
        if (actionType === "fullPayment") {
            const sellerID = sessionStorage.getItem('userID')
            if (!selectedProvider) {
                alert('No ha ingresado el Proveedor')
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
            
            const encargado = new User(parseInt(sessionStorage.getItem('userID')));
            const proveedor = new Supplier(selectedProvider);
            const detalleOrdenes = invoiceItems.map(item => new OrderDetail(item.id, item.quantity));
            console.log(detalleOrdenes);
            const resumen = texto;
            const estado = "EN PROCESO";
            
            const nuevaOrden = {data: new Order(encargado, proveedor, detalleOrdenes, resumen, estado)};

            console.log(nuevaOrden);

            try {
                await handleCreate(nuevaOrden);
                alert('Orden Creada Exitósamente!');
                setTimeout(() => window.location.href = '/invoices', 1000)
              } catch (error) {
                console.error('Error al guardar la orden:', error);
                alert('Error al guardar la orden. Por favor, inténtalo de nuevo.');
              }
            } else {
              alert("Disponible Próximamente");
            }
        
            setIsLoading(false);
          };

    return (<>
        {loading && <LoadingModal />}
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
                        <label style={{marginTop: "6px"}}>Proveedor:</label>
                        <select
                        style={{ width: "100%",
                                padding: "5px",
                                border: "1px solid gray",
                                borderRadius: "4px",
                                }}
                        value={selectedProvider}
                        onChange={(e) => setSelectedProvider(e.target.value)}
                            >
                {loading ? (
                  <option value="" disabled>Cargando proveedores...</option>
                ) : (
                  <>
                    <option value="" disabled>Selecciona un proveedor</option>
                    {providers.map(provider => (
                      <option key={provider.id} value={provider.id}>
                        {provider.name}
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
                                borderRadius: "4px",}}
                        value={texto}
                        onChange={manejarCambioTexto}
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
                        onClick={() => {
                            handleSaveAction('fullPayment');
                        }}
                        id="btnSave">Guardar</button>
                </div>
            </div>
        </form>
    </>)
}
export default NewOrder