import "./datatable.scss"
import { DataGrid } from "@mui/x-data-grid"
import { Link } from "react-router-dom"
import { InvoiceColumns } from "../../datatablesource"
import { useFetchInvoices } from '../../hooks/useFetchInvoices'
import { useState } from "react"
const Datatable = () => {
    const { data, loading, error, handleRTN } = useFetchInvoices()
    const [rtn, setRTN] = useState(null)

    const actionColumn = [
        {
            field: "action",
            headerName: "Acción",
            width: 70,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to={`/returns/new?id=${params.row.id}`} style={{ textDecoration: "none" }}>
                            <div className="viewButton" style={{ padding: "5px" }}>Crear</div>
                        </Link>
                    </div>
                )
            },
        },
    ]
    if (loading) return <div>Cargando...</div>
    if (error) return <div>Error al cargar los datos.</div>;
    return (
        <div className="datatable">
            <div className="datatableTitle">
                Seleccione una factura

            </div>
            <div className="filters">
                <span style={{ margin: 'auto 0px', paddingRight: '3px' }}>RTN:</span>
                <input type="number"
                    className="textField"
                    placeholder="RTN Cliente"
                    onChange={e => {
                        handleRTN(e.target.value)
                        setRTN(e.target.value)
                    }} />
            </div>
            <DataGrid
                className="datagrid"
                rows={rtn ? data.filter(value => value.status !== 'Anulada') : []}
                columns={InvoiceColumns.concat(actionColumn)}
                pageSize={8}
                rowsPerPageOptions={[8]}
                checkboxSelection
            />
        </div>
    )
}

export default Datatable
