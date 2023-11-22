import LoadingModal from "../../components/modal/LoadingModal";
import useOrder from "../../hooks/useOrder";

const NewOrder = () => {
    const { data, loading } = useOrder()
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
                    {/* Input fields for Customer and Vendor */}
                    <div className="formInput">
                        <label>RTN:</label>
                        <input type="text"
                            required
                            // onChange={e => handleRTN(e.target.value)}
                            placeholder="RTN del Cliente" />
                    </div>
                    <div className="formInput">
                        <label>Proveedor:</label>
                        <input type="text"
                            // value={dataUser ? dataUser.name : ''}
                            readOnly
                            placeholder="Nombre del Cliente" />
                    </div>
                    <div className="formInput">
                        <label>Vendedor:</label>
                        <input type="text" value={sessionStorage.getItem('userName')} readOnly />
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
                        {/* {invoiceItems.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        type="number"
                                        required
                                    // onChange={(e) => handleSkuChange(index, e.target.value)}
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
                                    // onChange={(e) => handleQuantityChange(index, e.target.value)}
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
                                    <button
                                    // onClick={() => handleDeleteItem(index)}
                                    >
                                        <DeleteForeverIcon className="icon" />
                                    </button>
                                </td>
                            </tr>
                        ))} */}
                    </tbody>
                </table>
            </div>
            <button className="btnAdd"
            // onClick={handleAddItem}
            >Añadir Nuevo Artículo</button>
            <div className="calculations">
                <div className="invoice-summary">
                    <div className="summary-detail">
                        <div className="summary-div">
                            <div className="summary-description">Subtotal:</div>
                            {/* <div className="summary-value"> L.{subtotalSummary.toFixed(2)} </div> */}
                        </div>
                        <div className="summary-div">
                            <div className="summary-description">Impuesto Total:</div>
                            {/* <div className="summary-value"> L.{taxSummary.toFixed(2)} </div> */}
                        </div>
                        <div className="summary-div">
                            <div className="summary-description">Descuento Total:</div>
                            {/* <div className="summary-value"> L.{discountSummary.toFixed(2)} </div> */}
                        </div>
                        <div className="summary-div">
                            <div className="summary-description">Monto Total:</div>
                            {/* <div className="summary-value"> L.{totalSummary.toFixed(2)} </div> */}
                        </div>
                    </div>
                </div>
                <div className="actions">
                    <button
                        // onClick={handleSaveAction}
                        id="btnSave">Guardar</button>
                    <button
                        // onClick={handleSaveAction}
                        id="btnSavePartialPayment">Guardar y Hacer Pago Parcial</button>
                    <button
                        // onClick={() => {
                        //     handleSaveAction('fullPayment');
                        // }}
                        id="btnSaveFullPayment">
                        Guardar y Hacer Pago Completo
                    </button>
                </div>
            </div>
        </form>
    </>)
}
export default NewOrder