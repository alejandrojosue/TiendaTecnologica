import './datatable.scss'
import './otherstyle.scss'
import { DataGrid } from "@mui/x-data-grid"
import { Link } from "react-router-dom"
import { productColumns } from "../../datatablesource"
import { useFetchProducts } from '../../hooks/useFetchProducts'
import { useFetchSubcategories } from '../../hooks/useFetchSubcategories'
import {useFetchCategories}  from '../../hooks/useFetchCategories'

const Datatable = () => {
  const { data, handleDelete, handleSubcategory, handleReloadPage} = useFetchProducts()
  const { dataSubcategories } = useFetchSubcategories()
  const { dataCategorias } = useFetchCategories();


  const actionColumn = [
    {
      field: "action",
      headerName: "Acción",
      width: 70,
      renderCell: (params) => {

        return (
          <div className="cellAction">
            <Link to={`/products/view/?id=${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton" style={{ padding: "5px" }}>Ver</div>
            </Link>
            {/* <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
              style={{ padding: "5px" }}
            >
              Borrar
            </div> */}
          </div>
        )
      },
    },
  ]
  return (
    <div className="datatable">
      {/* <div className="datatableTitle">
        Agregar nuevo
        <Link to="/product/new" className="link">
          Agregar
        </Link>
      </div> */}
      <select name="categoria" className='selectCategory' id="categoria">
      {
          dataCategorias.map(data =>(
            <option key={data.id} value={data.id}>
              {
                data.name
              }
            </option>
          ))
        }
      </select>
      <select name="subcategoria" className='selectSubcategory' id="subcategoria" onChange={e => handleSubcategory(e.target.value)} 
       >
        {
          dataSubcategories.map(data =>(
            <option key={data.id} value={data.id}>
              {
                data.name
              }

            </option>
          ))
        }
      </select>
        <button className='btnReload' onClick={handleReloadPage}>Actualizar</button>
      <br />
      <br />
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
