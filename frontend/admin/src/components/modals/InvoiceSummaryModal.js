// InvoiceSummaryModal.js
import React from "react";
import './invoiceSummaryModal.scss'

const InvoiceSummaryModal = (isOpen) => {
    return (
        // Contenido del modal
        <div className={`invoice-form ${isOpen && 'isOpen'}`}
        >
            <span
                className="btnClose">x</span>
            <h2>Confirmación de Factura</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="idCliente">RTN del Cliente:</label>
                    <input
                        type="text"
                        id="idCliente"
                        defaultValue={'03012001010192'}
                        readOnly
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="nombreCliente">Nombre del Cliente:</label>
                    <input
                        type="text"
                        id="nombreCliente"
                        defaultValue={'Alejandro Diaz'}
                        readOnly
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="fecha">Fecha:</label>
                    <input
                        type="datetime-local"
                        id="fecha"
                        defaultValue={'2023-10-23T12:00'}
                        readOnly
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="metodoPago">Método de Pago:</label>
                    <select id="metodoPago" defaultValue={"Efectivo"} readOnly>
                        <option value="">Seleccionar Método de Pago</option>
                        <option value="Efectivo">Efectivo</option>
                        <option value="Tarjeta">Tarjeta</option>
                        <option value="Transferencia">Transferencia</option>
                    </select>

                </div>

                <div className="form-group">
                    <label htmlFor="totalAPagar">Total a Pagar:</label>
                    <input
                        type="text"
                        id="totalAPagar"
                        value={'L. 50000.00'}
                    />
                </div>

                <button type="submit">Guardar Factura</button>
            </form>
        </div>
    );
};

export default InvoiceSummaryModal;