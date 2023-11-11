import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import { InvoiceColumns } from '../../datatablesource';

const List = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                {/* <Datatable
                    title={'Facturas'}
                    columns={InvoiceColumns}
                    data={data}
                    loading={loading}
                    error={error}
                    handleDateRangeChange={handleDateRange}
                    redirectTo={'invoices'}
                /> */}
            </div>
        </div>
    )
}

export default List