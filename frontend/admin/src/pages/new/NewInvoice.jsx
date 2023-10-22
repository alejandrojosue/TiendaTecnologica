import React, { useState } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useFetchProducts } from "../../hooks/useFetchProducts";
import "./newInvoice.scss";

const New = () => {
    const { data } = useFetchProducts()
    const [invoiceItems, setInvoiceItems] = useState([])
    const [totalSummary, setTotalSummary] = useState(0)
    const [subtotalSummary, setSubtotalSummary] = useState(0)
    const [taxSummary, setTaxSummary] = useState(0)
    const [discountSummary, setDiscountSummary] = useState(0)

    const handleAddItem = () => {
        const newItem = {
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
        invoiceItems.splice(index--, 1)
        setInvoiceItems(invoiceItems)
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
        const product = data.find((product) => product.sku === value);
        if (product) {
            const updatedItems = [...invoiceItems];
            updatedItems[index] = {
                ...updatedItems[index],
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

    // Implement calculations for subtotal, tax, discount, and total
    return (
        <div className="new-invoice">
            <div className="header">
                <div className="top-right">
                    {/* Display the date */}
                    <span>
                        Fecha: {`${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`}
                    </span>
                    <span>
                        Fecha Vencimiento: {`${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`}
                    </span>
                </div>
                <div className="customer-vendor">
                    {/* Input fields for Customer and Vendor */}
                    <div className="formInput">
                        <label>RTN:</label>
                        <input type="text" placeholder="RTN del Cliente" />
                    </div>
                    <div className="formInput">
                        <label>Cliente:</label>
                        <input type="text" placeholder="Nombre del Cliente" />
                    </div>
                </div>
            </div>

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
                <tbody>
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
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={item.tax}
                                    min={0}
                                    style={{ width: "60px" }}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={item.discount}
                                    min={0}
                                    max={100}
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
            <button className="btnAdd" onClick={handleAddItem}>Añadir Nuevo Artículo</button>
            <div className="calculations">
                {/* Display Subtotal, Tax, Discount, and Total */}
                <div className="invoice-summary">
                    <div>
                        <h2>Resumen de la Factura</h2>
                    </div>
                    <div>
                        <div>
                            <span>Subtotal:</span>
                            <span> L.{subtotalSummary.toFixed(2)} </span>
                        </div>
                        <div>
                            <span>Impuesto Total:</span>
                            <span> L.{taxSummary.toFixed(2)} </span>
                        </div>
                        <div>
                            <span>Descuento Total:</span>
                            <span> L.{discountSummary.toFixed(2)} </span>
                        </div>
                        <div>
                            <span>Total:</span>
                            <span> L.{totalSummary.toFixed(2)} </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="actions">
                <button>Guardar</button>
                <button>Guardar y Hacer Pago Parcial</button>
                <button>Guardar y Hacer Pago Completo</button>
            </div>
        </div>
    );
};

export default New;