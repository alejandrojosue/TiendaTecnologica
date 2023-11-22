import './report.scss'
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import PointOfSaleIcon from '@mui/icons-material/PointOfSale'
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned'
import InventoryIcon from '@mui/icons-material/Inventory'
import useReport from '../../hooks/useReport'
import ReportModal from '../../components/modal/ReportModal'
const Report = () => {
    const {
        data, visibleModal, title, reportSales, reportProducts,
        reportReturns, handleVisibleModal, handleTitle
    } = useReport()
    return (
        <div className="container">
            <Sidebar />
            <div className="reportContainer">
                <Navbar />
                {visibleModal && <ReportModal
                    title={`Reporte de ${title}`}
                    data={data}
                    handleModal={handleVisibleModal}
                />}
                <div className="options">
                    <div>
                        <p className="title">
                            <span className='text'>Ventas</span>
                            <span className='icon'><PointOfSaleIcon /></span>
                        </p>
                        <ul>
                            <li onClick={() => {
                                handleTitle('Ventas')
                                reportSales()
                            }}>
                                Generar Reporte de Todas las Ventas
                            </li>
                            <li onClick={() => window.location.href = '/reports/reportSalesSeller'}>
                                Generar Reporte por Vendedor
                            </li>
                            <li onClick={() => window.location.href = '/reports/reportSalesCustomer'}>
                                Generar Reporte por Cliente
                            </li>
                            <li>
                                <a href="/reports/custom?title=sales">
                                    Generar Reporte Personalizado
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p className="title">
                            <span className='text'>Devoluciones</span>
                            <span className='icon'><AssignmentReturnedIcon /></span>
                        </p>
                        <ul>
                            <li onClick={() => {
                                handleTitle('Devoluciones')
                                reportReturns()
                            }}>
                                Generar Reporte de Todas las Devoluciones
                            </li>
                            <li>
                                <a href="/reports/custom?title=returns">
                                    Generar Reporte Personalizado
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p className="title">
                            <span className='text'>Inventario</span>
                            <span className='icon'><InventoryIcon /></span>
                        </p>
                        <ul>
                            <li onClick={() => {
                                handleTitle('Productos')
                                reportProducts()
                            }}>
                                Generar Reporte de Todos los Productos
                            </li>
                            <li>
                                <a href="/reports/custom?title=products">
                                    Generar Reporte Personalizado
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Report