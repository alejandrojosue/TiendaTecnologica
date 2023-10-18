import "./datatable.scss"
import { DataGrid } from "@mui/x-data-grid"
import { Link } from "react-router-dom"
import { categoryColumns } from "../../datatablesource"
import { useFetchCategories, useGetAll } from '../../hooks/useFetchCategories'

const Datatable = () => {
  const { data, loading, error, handleDelete } = useGetAll() // useFetchCategories()
  const actionColumn = [
    {
      field: "action",
      headerName: "Acción",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/categories/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton" style={{ padding: "5px" }}>Ver</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
              style={{ padding: "5px" }}
            >
              Borrar
            </div>
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
        <Link to="/category/new" className="link">
          Agregar
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={categoryColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  )
}

export default Datatable
