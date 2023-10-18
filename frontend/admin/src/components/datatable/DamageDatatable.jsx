import "./datatable.scss"
import { DataGrid } from "@mui/x-data-grid"
import { Link } from "react-router-dom"
import { damagedColumns } from "../../datatablesource"
import { useFetchProducts } from '../../hooks/useFetchProducts'

const Datatable = () => {
  const { data, handleDelete } = useFetchProducts()
  const actionColumn = [
    {
      field: "action",
      headerName: "Acción",
      width: 150,
      renderCell: (params) => {

        return (
          <div className="cellAction">
            <Link to={`/products/${params.row.id}`} style={{ textDecoration: "none" }}>
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
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Agregar nuevo
        <Link to="/product/new" className="link">
          Agregar
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={productColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  )
}

export default Datatable
