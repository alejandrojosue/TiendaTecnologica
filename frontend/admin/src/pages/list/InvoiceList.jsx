'use strict'

import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import { useFetchInvoices } from '../../hooks/useFetchInvoices';
import { InvoiceColumns } from '../../datatablesource';
const List = () => {
  const { data, loading, error, handleDateRange } = useFetchInvoices();
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable
          title={'Listado de Facturas'}
          columns={InvoiceColumns}
          data={data}
          loading={loading}
          error={error}
          handleDateRangeChange={handleDateRange}
          redirectTo={'invoices'}
        />
      </div>
    </div>
  )
}

export default List