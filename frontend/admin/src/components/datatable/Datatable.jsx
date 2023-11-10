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
            <Link to={`/${redirectTo}/view?id=${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton" style={{ padding: "5px" }}>Ver</div>
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
        <Link to={`/${redirectTo}${title === 'Listado de Devoluciones' ? '/select' : '/new'}`} className="link">
          Crear Nueva
        </Link>
      </div>
      <div className="filters">
        {handleDateRangeChange && <MuiDateRange onDateRangeChange={handleDateRangeChange} />}
        <button className="btnRefresh" onClick={handleDateRangeChange}>
          Actualizar
        </button>
        <button className="btnReport" onClick={generateReport}>
          Generar Reporte
        </button>
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
