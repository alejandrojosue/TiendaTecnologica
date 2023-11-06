import "./datatable.scss"
import { DataGrid } from "@mui/x-data-grid"
import { Link } from "react-router-dom"
import MuiDateRange from '../DateRange/MuiDateRange'
import { ReturnColumns } from "../../datatablesource"
import useFetchReturns from '../../hooks/useFetchReturns'
import IsLoading from "../isLoading/IsLoading"

const Datatable = () => {
    const [data, loading, error, handleDateRangeChange, ...v] = useFetchReturns()
    const actionColumn = [
        {
            field: "action",
            headerName: "Acción",
            width: 70,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to={`/returns/view?id=${params.row.id}`} style={{ textDecoration: "none" }}>
                            <div className="viewButton" style={{ padding: "5px" }}>Ver</div>
                        </Link>
                    </div>
                )
            },
        },
    ]
    if (loading) return <IsLoading />
    if (error) return <div>Error al cargar los datos.</div>;
    return (
        <div className="datatable">
            <div className="datatableTitle">
                Listado de Devoluciones
                <Link to="/returns/select" className="link">
                    Crear Nueva
                </Link>
            </div>
            <div className="filters">
                <MuiDateRange onDateRangeChange={handleDateRangeChange} />
                <button className="btnRefresh" onClick={handleDateRangeChange}>Actualizar</button>
                <button className="btnReport">Generar Reporte</button>
            </div>
            <DataGrid
                className="datagrid"
                rows={data}
                columns={ReturnColumns.concat(actionColumn)}
                pageSize={8}
                rowsPerPageOptions={[8]}
                checkboxSelection
            />
        </div>
    )
}

export default Datatable
