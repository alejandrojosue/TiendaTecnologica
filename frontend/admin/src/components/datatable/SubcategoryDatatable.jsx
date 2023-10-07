import "./datatable.scss"
import { DataGrid } from "@mui/x-data-grid"
import { Link } from "react-router-dom"
import { subCategoryColumns } from "../../datatablesource"
import { useFetchSubcategories } from '../../hooks/useFetchSubcategories'

const Datatable = () => {
  const { data, loading, error, handleDelete } = useFetchSubcategories()
  const actionColumn = [
    {
      field: "action",
      headerName: "Acción",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/subcategories/${params.row.id}`} style={{ textDecoration: "none" }}>
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
        <Link to="/subcategory/new" className="link">
          Agregar
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={subCategoryColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  )
}

export default Datatable
