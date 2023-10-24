// InvoiceSummaryModal.js
import React from "react";
import './invoiceSummaryModal.scss'

const InvoiceSummaryModal = () => {
    return (
        // Contenido del modal
        <div className="invoice-form">
            <h2>Formulario de Factura</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="idCliente">ID del Cliente:</label>
                    <input
                        type="text"
                        id="idCliente"
                        value={'03012001010192'}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="nombreCliente">Nombre del Cliente:</label>
                    <input
                        type="text"
                        id="nombreCliente"
                        value={'Alejandro Diaz'}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="fecha">Fecha:</label>
                    <input
                        type="date"
                        id="fecha"
                        value={'2023-10-23'}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="metodoPago">Método de Pago:</label>
                    <select
                        id="metodoPago"
                        value={'Efectivo'}
                    >
                        <option value="">Seleccionar Método de Pago</option>
                        <option value="Efectivo">Efectivo</option>
                        <option value="Tarjeta">Tarjeta</option>
                        <option value="Transferencia">Transferencia</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="totalAPagar">Total a Pagar:</label>
                    <input
                        type="number"
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