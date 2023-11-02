import "./datatable.scss"
// import './invoiceDatatable.scss'
import { DataGrid } from "@mui/x-data-grid"
import { Link } from "react-router-dom"
import MuiDateRange from '../DateRange/MuiDateRange'
import { InvoiceColumns } from "../../datatablesource"
import { useFetchInvoices } from '../../hooks/useFetchInvoices'

const Datatable = () => {
  const { data, loading, error, handleDateRange } = useFetchInvoices()

  const handleDateRangeChange = (dateRange) => {
    handleDateRange(dateRange)
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Acción",
      width: 70,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/invoices/view?id=${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton" style={{ padding: "5px" }}>Ver</div>
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
        Listado de Facturas
        <Link to="/invoices/new" className="link">
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
        columns={InvoiceColumns.concat(actionColumn)}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
      />
    </div>
  )
}

export default Datatable
