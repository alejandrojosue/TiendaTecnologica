import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import { productColumns } from "../../datatablesource"
import { useState, useEffect } from "react"
import useCategory from '../../hooks/useCategory'
import useSubcategory from '../../hooks/useSubcategory'
import useProduct from '../../hooks/useProduct'
const List = () => {
  const { data, loading, error, handleSubcategory, handleGetAll } = useProduct()
  const [dataCategory, errorCategory, handleGetAllCategory, handleSubcategoryByCategory] = useCategory()
  const [dataSubcategory, errorSubcategory, handleGetAllSubcategory] = useSubcategory()
  const [filteredSubcategories, setFilteredSubcategories] = useState([])
  useEffect(() => {
    handleGetAll()
    handleGetAllCategory()
    handleGetAllSubcategory()
  }, [])
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable
          title={'Listado de Productos'}
          columns={productColumns}
          data={data}
          loading={loading}
          error={error}
          redirectTo={'products'}
          dataCategory={dataCategory}
          dataSubcategory={dataSubcategory}
          filteredSubcategories={filteredSubcategories}
          setFilteredSubcategories={setFilteredSubcategories}
          handleSubcategoryByCategory={handleSubcategoryByCategory}
          handleSubcategory={handleSubcategory}
          handleGetAll={handleGetAll}
        />
      </div>
    </div>
  )
}

export default List