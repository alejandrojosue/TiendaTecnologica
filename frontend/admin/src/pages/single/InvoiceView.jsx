import "./invoiceView.scss";
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Table from '../../components/table/InvoiceDetails'
import useInvoiceById from "../../hooks/useInvoiceById";
import getIdUrl from "../../helpers/get-id-url";

const InvoiceView = () => {

    const id = getIdUrl()
    const { invoice } = useInvoiceById(id)
    const rows = invoice ? [...invoice.details] : []
    return (
        <div className="view">
            <Sidebar />
            <div className="viewContainer">
                <Navbar />
                <div className="top">
                    <p>Factura #{invoice ? invoice.nInvoice : ''}</p>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form>
                            <div className="formInput">
                                <label>Cliente:</label>
                                <input type='text'
                                    value={invoice ? invoice.customer : ""}
                                    readOnly />
                            </div>
                            <div className="formInput">
                                <label>Vendedor:</label>
                                <input type='text'
                                    value={invoice ? invoice.seller : ''}
                                    readOnly />
                            </div>
                            <div className="formInput">
                                <label>Fecha de Emisión:</label>
                                <input type='text'
                                    value={invoice ? invoice.date : ''}
                                    readOnly />
                            </div>
                            <div className="formInput">
                                <label>Monto Total:</label>
                                <input type='text'
                                    value={`L. ${invoice ? invoice.total : 0}`}
                                    readOnly />
                            </div>
                            <div className="formInput">
                                <label>Descuento Total:</label>
                                <input type='text'
                                    value={`L. ${invoice ? invoice.discount : 0}`}
                                    readOnly />
                            </div>
                            <div className="formInput">
                                <label>Impuesto Total:</label>
                                <input type='text'
                                    value={`L. ${invoice ? invoice.tax : 0}`}
                                    readOnly />
                            </div>
                            <div className="formInput" style={{ width: '100%', margin: '0px 40px' }}>
                                <label>Detalle Factura:</label><br />
                                <Table rows={rows} />
                            </div>

                            <a href="/invoices">Regresar</a>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default InvoiceView