import "./ReturnSCSS.scss";
import "../../components/datatable/datatable.scss"
import '../../components/datatable/invoiceDatatable.scss'
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import React, { useState } from "react"
import { useFetchInvoices as  useFetchInvoices} from "../../hooks/useFetchInvoices";
import { InvoiceColumns } from "../../datatablesource"
import { DataGrid } from "@mui/x-data-grid"
import { Link } from "react-router-dom"

const ReturnView = () => {
    const {data, handleRTNFilter} = useFetchInvoices();
    const [searchValue, setSearchValue] = useState("");

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        setSearchValue(inputValue);
        handleRTNFilter(inputValue);
        console.log(handleRTNFilter); // Verifica el valor del input
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

    return (
        <div className="view">
            <Sidebar />
            <div className="viewContainer">
                <Navbar />
                <div className="top">
                    <p>Crear Devoluciones</p>
                </div>
                <label>Buscar por RTN del CLiente:</label>
                <input type="text" value={searchValue} onChange={handleInputChange} />
                <label>Buscar por N° de Factura:</label>
                <input type="text"></input>
                <div className="datatable">
                <DataGrid
                className="datagrid"
                rows={data}
                columns={InvoiceColumns.concat(actionColumn)}
                pageSize={8}
                rowsPerPageOptions={[8]}
                checkboxSelection
                />
            </div>
            </div>
        </div>
    )
}

export default  ReturnView