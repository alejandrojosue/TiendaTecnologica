import "../single/invoiceView.scss";
import "../../components/datatable/datatable.scss";
import './newReturn.scss'
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Table from "@mui/material/Table";
import { Link } from "react-router-dom"
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useInvoiceById from "../../hooks/useInvoiceById";
import getIdUrl from "../../helpers/get-id-url";

const NewReturn = () => {
    const id = getIdUrl()
    const { invoice } = useInvoiceById(id)
    const rows = invoice ? [...invoice.details] : []
    return (
        <div className="view">
            <Sidebar />
            <div className="viewContainer">
                <Navbar />
                <div className="top">
                    <p>Factura #{invoice ? invoice.nInvoice : ''}</p>
                    <Link to="/returns" className="link">
                        Regresar
                    </Link>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form>
                            <div className="formInput">
                                <label>Cliente:</label>
                                <input type='text'
                                    value={invoice ? invoice.customer : ""}
                                    readOnly />
                            </div>
                            <div className="formInput">
                                <label>Vendedor:</label>
                                <input type='text'
                                    value={invoice ? invoice.seller : ''}
                                    readOnly />
                            </div>
                            <div className="formInput">
                                <label>Fecha de Emisión:</label>
                                <input type='text'
                                    value={invoice ? invoice.date : ''}
                                    readOnly />
                            </div>
                            <div className="formInput">
                                <label>Monto Total:</label>
                                <input type='text'
                                    value={`L. ${invoice ? invoice.total : 0}`}
                                    readOnly />
                            </div>
                            <div className="formInput">
                                <label>Descuento Total:</label>
                                <input type='text'
                                    value={`L. ${invoice ? invoice.discount : 0}`}
                                    readOnly />
                            </div>
                            <div className="formInput">
                                <label>Impuesto Total:</label>
                                <input type='text'
                                    value={`L. ${invoice ? invoice.tax : 0}`}
                                    readOnly />
                            </div>
                            <div className="formInput" style={{ width: '100%', margin: '0px 40px' }}>
                                <label>Detalle Factura:</label><br />
                                <TableContainer component={Paper} className="table">
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className="tableCell"><b>Código</b></TableCell>
                                                <TableCell className="tableCell"><b>Producto</b></TableCell>
                                                <TableCell className="tableCell"><b>Cantidad</b></TableCell>
                                                <TableCell className="tableCell"><b>P/U</b></TableCell>
                                                <TableCell className="tableCell"><b>Agregar</b></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row, index) => (
                                                <TableRow key={index}>
                                                    <TableCell className="tableCell">{row.sku}</TableCell>
                                                    <TableCell className="tableCell">{row.productName}</TableCell>
                                                    <TableCell className="tableCell">{row.quantity}</TableCell>
                                                    <TableCell className="tableCell">{row.unitPrice}</TableCell>
                                                    <TableCell className="tableCell">
                                                        <div className="btnAdd"><span>+</span></div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                            <div className="formInput" style={{ width: '100%', margin: '0px 40px' }}>
                                <label>Productos a Devolver:</label><br />
                                <TableContainer component={Paper} className="table">
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className="tableCell"><b>Producto</b></TableCell>
                                                <TableCell className="tableCell"><b>Cantidad</b></TableCell>
                                                <TableCell className="tableCell w-300"><b>Motivo Devolución</b></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row, index) => (
                                                <TableRow key={index}>
                                                    <TableCell className="tableCell">{row.productName}</TableCell>
                                                    <TableCell className="tableCell">
                                                        <input type="number" min={0}
                                                            max={row.quantity}
                                                            onKeyDown={e => e.preventDefault()}
                                                            defaultValue={row.quantity} />
                                                    </TableCell>
                                                    <TableCell className="tableCell w-300">
                                                        <textarea className="w-300"></textarea>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default NewReturn