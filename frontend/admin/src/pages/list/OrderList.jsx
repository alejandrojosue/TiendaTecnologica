import "./list.scss"
import Datatable from "../../components/datatable/Datatable"
import { orderColumns } from '../../datatablesource'
import useOrder from '../../hooks/useOrder'
import { useEffect } from "react"
const List = () => {
    const { data, loading, error, handleGetAll, handleDateRange } = useOrder()
    useEffect(() => handleGetAll(), [])
    return (
        <>
            <Datatable
                title={'Listado de Ordenes de Compra'}
                columns={orderColumns}
                data={data}
                loading={loading}
                error={error}
                redirectTo={'orders'}
                handleGetAll={handleGetAll}
                handleDateRangeChange={handleDateRange}
                isEditable={true}
            /></>
    )
}

export default List