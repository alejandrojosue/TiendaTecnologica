import "./datatable.scss"
import { DataGrid } from "@mui/x-data-grid"
import { Link } from "react-router-dom"
import { InvoiceColumns } from "../../datatablesource"
import { useFetchSInvoices } from '../../hooks/useFetchInvoices'


const Datatable = () => {
  const { data, loading, error } = useFetchSInvoices()
  const actionColumn = [
    {
      field: "action",
      headerName: "Acción",
      width: 70,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/invoice?id=${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton" style={{ padding: "5px" }}>Ver</div>
            </Link>
          </div>
        )
      },
    },
  ]
  if (loading) return <div>Cargando...</div>
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Agregar nuevo
        <Link to="/invoices/new" className="link">
          Agregar
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={InvoiceColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  )
}

export default Datatable
