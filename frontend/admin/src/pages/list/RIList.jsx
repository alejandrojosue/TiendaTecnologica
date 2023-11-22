import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import { InvoiceColumns } from '../../datatablesource'
import useInvoice from "../../hooks/useInvoice"

const List = () => {
  const { data, loading, error, handleRTN } = useInvoice()

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable
          title={'Seleccione una Factura'}
          columns={InvoiceColumns}
          data={data}
          loading={loading}
          error={error}
          redirectTo={'returns'}
          handleRTN={handleRTN}
          redirectToNew={'returns/new'}
        />
      </div>
    </div>
  )
}

export default List