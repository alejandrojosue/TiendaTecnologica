import "./returnView.scss";
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import getIdUrl from "../../helpers/get-id-url"
import useReturn from "../../hooks/useReturn"
import Table from '../../components/table/ReturnDetails'
import IsLoading from "../../components/isLoading/IsLoading";
import { useEffect } from "react";

const ReturnView = () => {
    const id = getIdUrl()
    const { data, loading, error, handleId } = useReturn()
    useEffect(() => handleId(id), [])
    const rows = data ? data.details : []
    if (error) return (<div>Error al cargar el producto...</div>)
    return (
        <div className="view">
            <Sidebar />
            <div className="viewContainer">
                <Navbar />
                {loading && <IsLoading />}
                <div className="top">
                    <p>Devolución #{data ? data.id : ''}</p>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form>
                            <div className="formInput">
                                <label>Vendedor:</label>
                                <input type='text'
                                    value={data ? data.seller : ''}
                                    readOnly />
                            </div>
                            <div className="formInput">
                                <label>Fecha de Devolución:</label>
                                <input type='text'
                                    value={data ? data.date : ''}
                                    readOnly />
                            </div>
                            <div className="formInput">
                                <label>No. Factura:</label>
                                <input type='text'
                                    value={data ? data.nInvoice : ''}
                                    readOnly />
                            </div>
                            <div className="formInput" style={{ width: '100%', margin: '0px 40px' }}>
                                <label>Detalle Devolución:</label><br />
                                <Table rows={rows} />
                            </div>
                            <a href="/returns">Regresar</a>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ReturnView