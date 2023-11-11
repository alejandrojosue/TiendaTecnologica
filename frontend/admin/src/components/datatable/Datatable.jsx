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
  handleDateRangeChange,
  redirectTo,
  handleRTN,
  redirectToNew
}) => {
  if (loading) return <IsLoading />;
  if (error) return <div>Error al cargar los datos.</div>;

  const generateReport = () => {
    generatePDFReport(title, columns, data); // Genera el informe PDF
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Acción",
      width: 70,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/${redirectToNew ? 'returns/new' : `${redirectTo}/view`}?id=${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton" style={{ padding: "5px" }}>
                {!handleRTN ? 'Ver' : 'Crear'}
              </div>
            </Link>
          </div>
        )
      },
    },
  ]

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {title}
        {!handleRTN &&
          <>
            <Link to={`/${redirectTo}/${redirectTo === 'returns' ? 'select' : 'new'}`} className="link">
              Crear Nueva
            </Link>
          </>
        }
      </div>
      <div className="filters">
        {handleDateRangeChange && <MuiDateRange onDateRangeChange={handleDateRangeChange} />}
        {!handleRTN ?
          <>
            <button className="btnRefresh" onClick={() => { handleDateRangeChange(null, null) }}>
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
  );
};

export default Datatable;
