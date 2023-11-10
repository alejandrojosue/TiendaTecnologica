import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import useFetchReturns from '../../hooks/useFetchReturns';
import { ReturnColumns } from '../../datatablesource';

const List = () => {
  const [data, loading, error, handleDateRange, handleCancelRequest] = useFetchReturns();
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable
          title={'Listado de Devoluciones'}
          columns={ReturnColumns}
          data={data}
          loading={loading}
          error={error}
          handleDateRangeChange={handleDateRange}
          redirectTo={'returns'}
        />
      </div>
    </div>
  )
}

export default List