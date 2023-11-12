import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import useReturn from '../../hooks/useReturn';
import { ReturnColumns } from '../../datatablesource';
import { useEffect } from "react";

const List = () => {
  const { data, loading, error, handleGetAll, handleDateRange } = useReturn()
  useEffect(() => handleGetAll(), [])
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
          handleGetAll={handleGetAll}
        />
      </div>
    </div>
  )
}

export default List