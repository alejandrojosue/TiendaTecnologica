import './datatable.scss'
import './otherstyle.scss'
import { DataGrid } from "@mui/x-data-grid"
import { Link } from "react-router-dom"
import { productColumns } from "../../datatablesource"
import { useFetchProducts } from '../../hooks/useFetchProducts'
import { useFetchSubcategories } from '../../hooks/useFetchSubcategories'
import { useFetchCategories } from '../../hooks/useFetchCategories'
import filterSubcategoryByCategory from '../../auth/helpers/subcategories-filter'
import { useEffect, useState } from 'react'
import jsPDF from "jspdf";
import "jspdf-autotable";

const Datatable = () => {
  const { data, handleSubcategory, handleReloadPage } = useFetchProducts();
  const { dataSubcategories } = useFetchSubcategories();
  const { dataCategorias } = useFetchCategories();
  const [selectedCategory, setSelectedCategory] = useState(''); // Estado para almacenar el category seleccionado
  const [filteredSubcategories, setFilteredSubcategories] = useState(dataSubcategories); // Estado para subcategorías filtradas

  const generateReport = (data) => {
    // Crear un nuevo objeto jsPDF
    const doc = new jsPDF();

    // Definir las columnas y filas para el informe
    const columns = productColumns.map((column) => column.headerName);
    const rows = data.map((row) => productColumns.map((column) => row[column.field]));

    // Agregar el título al informe
    doc.text("Informe de Inventario", 10, 10);

    // Generar la tabla
    doc.autoTable({
      head: [columns],
      body: rows,
    });

    // Guardar o mostrar el informe
    doc.save("Informe_Productos.pdf");
  };

  const transformedData = data.map((row) => {
    const transformedRow = { ...row };

    // Reemplaza los valores booleanos con "Activo" o "Inactivo"
    if (transformedRow.status === true) {
      transformedRow.status = "Activo";
    } else {
      transformedRow.status = "Inactivo";
    }

    return transformedRow;
  });


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
      Inventario <br />
      <select name="categoria" className='selectCategory' id="categoria" onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="none">Seleccione una Categoria</option>
        {
          dataCategorias.map(data => (
            <option key={data.id} value={data.name}>
              {
                data.name
              }
            </option>
          ))
        }
      </select>
      <select name="subcategoria" className='selectSubcategory' id="subcategoria" onChange={e => {
        if (e.target.value === 'none') return
        handleSubcategory(parseInt(e.target.value))
      }}
      >
        <option value="none">Seleccione una subcategoría</option>
        {
          filteredSubcategories.map(data => (
            <option key={data.id} value={data.id}>
              {
                data.name
              }
            </option>
          ))
        }
      </select>
      <button className='btnReload' onClick={handleReloadPage}>Actualizar</button>
      <button className='btnReport' onClick={() => generateReport(transformedData)}>
        Generar Informe
      </button>
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
