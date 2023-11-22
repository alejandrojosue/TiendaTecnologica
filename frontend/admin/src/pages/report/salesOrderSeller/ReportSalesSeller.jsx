import { useEffect } from "react"
import Chart from "../../../components/chart/Chart"
import useReport from "../../../hooks/useReport"
import './reportSalesSeller.scss'
import dataChartReport from "../../../helpers/dataChartReport"
import deleteDuplicate from "../../../helpers/deleteDuplicate"
const ReportSalesSeller = () => {
    const { data, reportSales } = useReport()
    useEffect(() => reportSales(), [])

    return (
        <div className="items" style={{ display: 'flex', flexDirection: 'column' }}>
            <h1 className="title">Reporte de Ventas por Vendedor</h1>
            {deleteDuplicate(data, 'ID de Vendedor').map((value, index) => {
                return (
                    <div className="top">
                        <div className="left">
                            <div className="editButton">{index + 1}</div>
                            <h1 className="title">{value['Apellido Vendedor']}</h1>
                            <div className="item">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Google_Contacts_logo.png"
                                    alt=""
                                    className="itemImg"
                                />
                                <div className="details">
                                    <h1 className="itemTitle">{value['Nombre Vendedor']}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <Chart key={index} aspect={3 / 1} title="Mis Ventas Totales ( Últimos 4 meses)" data={dataChartReport(data, 'ID de Vendedor', value['ID de Vendedor'])} />
                        </div>
                    </div>
                )
            })}

        </div>
    )
}

export default ReportSalesSeller