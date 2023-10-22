import React, { useRef } from 'react';
import './InvoicePrint.scss';

const InvoicePrint = ({ data }) => {
    const printRef = useRef(null);

    const printInvoice = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.open();
        printWindow.document.write(`
            <html>
                <head>
                    <link rel="stylesheet" type="text/css" href="path-to-your-print-styles.css">
                </head>
                <body>
                    <div class="invoice-container">
                        <!-- Your invoice content goes here -->
                        <div class="invoice-header">
                            <h1>Invoice</h1>
                            <!-- Print your data here -->
                        </div>
                        <!-- Rest of the invoice content -->
                    </div>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
        printWindow.onafterprint = () => printWindow.close();
    };

    return (
        <div>
            <button onClick={printInvoice}>Print Invoice</button>
            <div ref={printRef} className="invoice-container">
                <div className="invoice-header">
                    <h1>Invoice</h1>
                    <p>Invoice Number: {data.invoiceNumber}</p>
                    <p>Date: {data.date}</p>
                </div>
                <div className="invoice-customer">
                    <h2>Customer Information</h2>
                    <p>Name: {data.customerName}</p>
                </div>
                <div className="invoice-items">
                    <h2>Invoice Items</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.items.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.description}</td>
                                    <td>{item.quantity}</td>
                                    <td>${item.unitPrice}</td>
                                    <td>${item.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="invoice-summary">
                    <p>Subtotal: ${data.subtotal}</p>
                    <p>Tax (15%): ${data.subtotal * data.tax}</p>
                    <p>Total: ${data.total}</p>
                </div>
            </div>
        </div>
    );
};

export default InvoicePrint;
