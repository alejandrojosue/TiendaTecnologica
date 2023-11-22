import "./invoiceView.scss";
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Table from '../../components/table/InvoiceDetails'
import getIdUrl from "../../helpers/get-id-url";
import useInvoice from "../../hooks/useInvoice";
import { useEffect } from "react";

const InvoiceView = () => {

    const id = getIdUrl()
    const { data, handleId } = useInvoice()
    useEffect(() => handleId(id), [])

    return (
        <div className="view">
            <Sidebar />
            <div className="viewContainer">
                <Navbar />
                <div className="top">
                    <p>Factura #{data ? data.nInvoice : ''}</p>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form>
                            <div className="formInput">
                                <label>Cliente:</label>
                                <input type='text'
                                    value={data && data.customer ? data.customer : ""}
                                    readOnly />
                            </div>
                            <div className="formInput">
                                <label>Vendedor:</label>
                                <input type='text'
                                    value={data && data.seller ? data.seller : ''}
                                    readOnly />
                            </div>
                            <div className="formInput">
                                <label>Fecha de Emisión:</label>
                                <input type='text'
                                    value={data && data.date ? data.date : ''}
                                    readOnly />
                            </div>
                            <div className="formInput">
                                <label>Monto Total:</label>
                                <input type='text'
                                    value={`L. ${data && data.total ? data.total : 0}`}
                                    readOnly />
                            </div>
                            <div className="formInput">
                                <label>Descuento Total:</label>
                                <input type='text'
                                    value={`L. ${data && data.discount ? data.discount : 0}`}
                                    readOnly />
                            </div>
                            <div className="formInput">
                                <label>Impuesto Total:</label>
                                <input type='text'
                                    value={`L. ${data && data.tax ? data.tax : 0}`}
                                    readOnly />
                            </div>
                            <div className="formInput" style={{ width: '100%', margin: '0px 40px' }}>
                                <label>Detalle Factura:</label><br />
                                <Table rows={data && data.details ? data.details : []} />
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