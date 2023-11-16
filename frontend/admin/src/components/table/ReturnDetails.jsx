import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = ({ rows }) => {

    return (
        <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="tableCell"><b>Código</b></TableCell>
                        <TableCell className="tableCell"><b>Producto</b></TableCell>
                        <TableCell className="tableCell"><b>Cantidad</b></TableCell>
                        <TableCell className="tableCell"><b>Motivo</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows?.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell className="tableCell">{row.productSKU}</TableCell>
                            <TableCell className="tableCell">{row.productName}</TableCell>
                            <TableCell className="tableCell">{row.quantity}</TableCell>
                            <TableCell className="tableCell">{row.reason}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default List;
