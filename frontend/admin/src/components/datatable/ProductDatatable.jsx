import './datatable.scss'
import './otherstyle.scss'
import { DataGrid } from "@mui/x-data-grid"
import { Link } from "react-router-dom"
import { productColumns } from "../../datatablesource"
import { useFetchProducts } from '../../hooks/useFetchProducts'
import { useFetchSubcategories } from '../../hooks/useFetchSubcategories'
import {useFetchCategories}  from '../../hooks/useFetchCategories'
import filterSubcategoryByCategory from '../../auth/helpers/subcategories-filter'
import { useEffect, useState } from 'react'

const Datatable = () => {
  const { data, handleDelete, handleSubcategory, handleReloadPage, handleCategory} = useFetchProducts();
  const { dataSubcategories } = useFetchSubcategories();
  const { dataCategorias } = useFetchCategories();

  const [selectedCategory, setSelectedCategory] = useState(''); // Estado para almacenar el category seleccionado
  const [filteredSubcategories, setFilteredSubcategories] = useState(dataSubcategories); // Estado para subcategorías filtradas


  useEffect(() => {
    if (selectedCategory) {
      // Filtra las subcategorías según la categoría seleccionada
      const filtered = filterSubcategoryByCategory(selectedCategory, dataSubcategories);
      setFilteredSubcategories(filtered);
    } else {
      // Si no se ha seleccionado una categoría, muestra todas las subcategorías
      setFilteredSubcategories(dataSubcategories);
    }
  }, [selectedCategory]);

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
      <select name="categoria" className='selectCategory' id="categoria" onChange={(e) => setSelectedCategory(e.target.value)}>
      <option value="none">Seleccione una Categoria</option>
      {
          dataCategorias.map(data =>(
            <option key={data.id} value={data.name}>
              {
                data.name
              }
            </option>
          ))
        }
      </select>
      <select name="subcategoria" className='selectSubcategory' id="subcategoria"  onChange={e=>{
        if(e.target.value === 'none') return
        handleSubcategory(parseInt(e.target.value))
      }}
       >
        <option value="none">Seleccione una subcategoría</option>
        {
          filteredSubcategories.map(data =>(
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
