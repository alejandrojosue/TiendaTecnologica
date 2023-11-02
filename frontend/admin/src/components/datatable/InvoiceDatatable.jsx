import "./datatable.scss"
// import './invoiceDatatable.scss'
import { DataGrid } from "@mui/x-data-grid"
import { Link } from "react-router-dom"
import MuiDateRange from '../DateRange/MuiDateRange'
import { InvoiceColumns } from "../../datatablesource"
import { useFetchInvoices } from '../../hooks/useFetchInvoices'
import jsPDF from 'jspdf';

const Datatable = () => {
  const { data, loading, error, handleDateRange } = useFetchInvoices()

  const handleDateRangeChange = (dateRange) => {
    handleDateRange(dateRange)
  };

  const generatePDFReport = () => {
    const doc = new jsPDF();
  
    // Configura el título o encabezado del reporte
    doc.setFontSize(18);
    doc.text('Reporte de Facturas', 10, 10);
  
    const InvoiceColumns = [
      { field: 'id', headerName: 'ID', width: 150 },
      { field: 'nInvoice', headerName: 'No. de Factura', width: 150 },
      { field: 'date', headerName: 'Fecha', width: 150 },
      { field: 'paymentMethod', headerName: 'Metodo de Pago', width: 150 },
      { field: 'total', headerName: 'Total', width: 150 },
      { field: 'status', headerName: 'Estado', width: 150 },
    ];
  
    const columnMapping = {
      id: 'ID',
      nInvoice: ' No. de Factura',
      date: 'Fecha',
      paymentMethod: 'Metodo de Pago',
      total: 'Total',
      status: 'Estado',
    };
  
    // Configura la tabla o contenido de tu reporte
    const columns = InvoiceColumns.map((column) => columnMapping[column.field] || column.headerName);
    const rows = data.map((row) =>
      InvoiceColumns.map((column) => row[column.field])
    );

    doc.autoTable({
      startY: 20, // Posición inicial en la página
      head: [columns], // Encabezados de la tabla
      body: rows, // Datos de la tabla
    });
  
    // Guarda el reporte en un archivo PDF
    doc.save('reporte_facturas.pdf');
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Acción",
      width: 70,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/invoices/view?id=${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton" style={{ padding: "5px" }}>Ver</div>
            </Link>
          </div>
        )
      },
    },
  ]
  if (loading) return <div>Cargando...</div>
  if (error) return <div>Error al cargar los datos.</div>;
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Listado de Facturas
        <Link to="/invoices/new" className="link">
          Crear Nueva
        </Link>
      </div>
      <div className="filters">
        <MuiDateRange onDateRangeChange={handleDateRangeChange} />
        <button className="btnRefresh" onClick={handleDateRangeChange}>Actualizar</button>
<<<<<<< HEAD
        <button className="btnReport">Generar Reporte</button>
=======
        <button className="btnReport" onClick={generatePDFReport}>Generar Report</button>
>>>>>>> 5c046ede4e85017a58a9656d68c51ae60d11c3b7
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={InvoiceColumns.concat(actionColumn)}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
      />
    </div>
  )
}

export default Datatable
