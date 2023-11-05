import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = (data) => {
  const rows = data.data?.slice(0, 20) || []
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
        <TableHead >
          <TableRow key={data.id} >
            <TableCell className="tableCell">ID Transacción</TableCell>
            <TableCell className="tableCell">Fecha</TableCell>
            <TableCell className="tableCell">Monto Total</TableCell>
            <TableCell className="tableCell">Impuesto Total</TableCell>
            <TableCell className="tableCell">Descuento Total</TableCell>
            <TableCell className="tableCell">Método de Pago</TableCell>
            <TableCell className="tableCell">Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.nInvoice}>
              <TableCell className="tableCell">{row.nInvoice}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">L. {row.total}</TableCell>
              <TableCell className="tableCell">L. {row.tax}</TableCell>
              <TableCell className="tableCell">L. {row.discount}</TableCell>
              <TableCell className="tableCell">{row.paymentMethod}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status === 'Pagada' ? 'Pagada' : 'Anulada'}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
