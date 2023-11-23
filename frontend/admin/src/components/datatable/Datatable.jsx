import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom"
import MuiDateRange from '../DateRange/MuiDateRange';
import generatePDFReport from '../../helpers/generatePDFReport'
import IsLoading from '../isLoading/IsLoading';

const Datatable = ({
  title,
  columns,
  data,
  loading,
  error,
  handleGetAll,
  handleDateRangeChange,
  redirectTo,
  handleRTN,
  redirectToNew,
  dataCategory,
  dataSubcategory,
  filteredSubcategories,
  setFilteredSubcategories,
  handleSubcategoryByCategory,
  handleSubcategory,
  isEditable
}) => {
  if (loading) return <IsLoading />;
  if (error) return <div>Error al cargar los datos.</div>;

  const generateReport = () => {
    const dataTransformed = title === 'Listado de Productos'
      ? data.map(row => ({ ...row, status: row.status ? 'Activo' : 'Inactivo' }))
      : data
    generatePDFReport(title, columns, dataTransformed) // Genera el informe PDF
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Acción",
      width: isEditable ? 115 : 70,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/${redirectToNew ? 'returns/new' : `${redirectTo}/view`}?id=${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton" style={{ padding: "5px" }}>
                {!handleRTN ? 'Ver' : 'Crear'}
              </div>
            </Link>
            {isEditable &&
              <Link to={`/${redirectTo}/edit?id=${params.row.id}`} style={{ textDecoration: "none" }}>
                <div className="editButton" style={{ padding: "5px" }}>
                  Editar
                </div>
              </Link>
            }
          </div>
        )
      },
    },
  ]

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {title}
        {(!handleRTN && !handleSubcategory) &&
          <>
            <Link to={`/${redirectTo}/${redirectTo === 'returns' ? 'select' : 'new'}`} className="link">
              Crear Nueva
            </Link>
          </>
        }
      </div>
      <div className="filters">
        {handleDateRangeChange && <MuiDateRange onDateRangeChange={handleDateRangeChange} />}
        {dataCategory &&
          <>
            <select name="categoria" className='selectCategory' id="categoria" onChange={(e) => {
              setFilteredSubcategories(handleSubcategoryByCategory(e.target.value, dataSubcategory))
            }}>
              <option value="none">Seleccione una Categoria</option>
              {
                dataCategory.map(data => (
                  <option key={data.id} value={data.name}>
                    {data.name}
                  </option>
                ))
              }
            </select>
            <select name="subcategoria" className='selectSubcategory' id="subcategoria" onChange={e => {
              if (e.target.value !== 'none')
                handleSubcategory(parseInt(e.target.value))
            }}>
              <option value="none">Seleccione una Subcategoría</option>
              {
                filteredSubcategories.map(data => (
                  <option key={data.id} value={data.id}>
                    {data.name}
                  </option>
                ))
              }
            </select>
          </>
        }
        {!handleRTN ?
          <>
            <button className="btnRefresh" onClick={handleGetAll}>
              Actualizar
            </button>
            <button className="btnReport" onClick={generateReport}>
              Generar Reporte
            </button>
          </> :
          <>
            <input type="number"
              className="textField"
              placeholder="RTN Cliente"
              onChange={e => { handleRTN(e.target.value) }} />
          </>
        }
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={columns.concat(actionColumn)}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
      />
    </div>
  )
}

export default Datatable;