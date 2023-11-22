import "./list.scss"
import Datatable from "../../components/datatable/Datatable"
import { InvoiceColumns } from '../../datatablesource'
import useInvoice from '../../hooks/useInvoice'
import { useEffect } from "react"
const List = () => {
  const { data, loading, error, handleDateRange, handleGetAll } = useInvoice()
  useEffect(() => handleGetAll(), [])
  return (
    <>
      <Datatable
        title={'Listado de Facturas'}
        columns={InvoiceColumns}
        data={data}
        loading={loading}
        error={error}
        handleDateRangeChange={handleDateRange}
        redirectTo={'invoices'}
        handleGetAll={handleGetAll}
      /></>
  )
}

export default List