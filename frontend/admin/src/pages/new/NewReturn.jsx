import "../single/invoiceView.scss";
import "../../components/datatable/datatable.scss";
import './newReturn.scss'
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Table from "@mui/material/Table";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link } from "react-router-dom"
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useInvoiceById from "../../hooks/useInvoiceById";
import getIdUrl from "../../helpers/get-id-url";
import { useState } from "react";
import useCreateReturn from "../../hooks/useCreateReturn";

const NewReturn = () => {
    const id = getIdUrl()
    const { invoice } = useInvoiceById(id)
    const [invoiceItems, setInvoiceItems] = useState([])
    const rows = invoice ? [...invoice.details] : []
    const createReturnHook = useCreateReturn()

    const handleAddItem = ({ id, productName, quantity, unitPrice }, index) => {
        const newItem = {
            id, productName, quantity, quantityVal: quantity, unitPrice, reason: '', index
        };
        if (!invoiceItems.find(value => value.index === index))
            setInvoiceItems([...invoiceItems, newItem]);
    };
    const handleDeleteItem = (index) => {
        invoiceItems.splice(index, 1)
        setInvoiceItems([...invoiceItems])
    }
    const handleQuantityChange = (index, value) => {
        if (value) {
            invoiceItems[index].quantity = parseInt(value)
            // invoiceItems[index].total = calculateSubtotal(invoiceItems[index])
        } else {
            // invoiceItems[index].total = 0
        }
        setInvoiceItems([...invoiceItems])
        console.log(invoiceItems)
    }
    const handleReasonChange = (index, value) => {
        if (value) {
            invoiceItems[index].reason = value
        }
        setInvoiceItems([...invoiceItems])
    }
    const saveReturn = () => {
        if (invoiceItems.find(value => value.reason === '')) {
            alert('Debe ingresar todos los motivos de devolución!')
            return
        }
        const detalleDevoluciones = invoiceItems.map(value => {
            return {
                producto: {
                    id: value.id
                },
                cantidad: value.quantity,
                motivo: value.reason
            }
        })

        const data = {
            data: {
                estado: 'Entregada',
                vendedor: {
                    id: parseInt(sessionStorage.getItem('userID'))
                },
                noFactura: {
                    id: parseInt(id)
                },
                detalleDevoluciones
            }
        }
        if (!(data.data.detalleDevoluciones.length) || !(data.data.noFactura.id) || !(data.data.vendedor.id)) {
            alert('No se puede crear la devolución sin todos los datos requeridos!')
            return
        }
        createReturnHook.createReturn(data)
    }

    return (
        <div className="view">
            <Sidebar />
            <div className="viewContainer">
                <Navbar />
                <div className="top" style={{ marginBottom: 0 }}>
                    <div className="datatable" style={{ width: '100%' }}>
                        <div className="datatableTitle">
                            <span>Factura #{invoice ? invoice.nInvoice : ''}</span>
                            <Link to="/returns" className="link">
                                Regresar
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="bottom" style={{ marginTop: 0 }}>
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
                                                        <div className="btnAdd"
                                                            onClick={() => handleAddItem(row, index)}>
                                                            <span>+</span>
                                                        </div>
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
                                                <TableCell className="tableCell"><b>Acción</b></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {invoiceItems.map((row, index) => (
                                                <TableRow key={index}>
                                                    <TableCell className="tableCell">{row.productName}</TableCell>
                                                    <TableCell className="tableCell">
                                                        <input type="number" min={1}
                                                            max={row.quantityVal}
                                                            onChange={e => handleQuantityChange(index, e.target.value)}
                                                            onKeyDown={e => e.preventDefault()}
                                                            defaultValue={row.quantity} />
                                                    </TableCell>
                                                    <TableCell className="tableCell w-300">
                                                        <textarea required
                                                            onChange={e => handleReasonChange(index, e.target.value)}
                                                            className="w-300"></textarea>
                                                    </TableCell>
                                                    <TableCell className="tableCell">
                                                        <button className="btnDelete" onClick={() => handleDeleteItem(index)}>
                                                            <DeleteForeverIcon className="icon" />
                                                        </button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                            <a className="btnSaveReturn" href="#"
                                onClick={e => {
                                    saveReturn()
                                }}>Guardar</a>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default NewReturn