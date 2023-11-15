import './customReport.scss'
import Navbar from "../../../components/navbar/Navbar"
import Sidebar from "../../../components/sidebar/Sidebar"
import Table from '../../../components/table/TableModal'
import getIdUrl from '../../../helpers/get-id-url'
import useReport from '../../../hooks/useReport'
import { useEffect, useState } from 'react'
import { CSVLink } from 'react-csv'
import exportPDFReport from '../../../helpers/exportPDFReport'
import deleteDuplicate from '../../../helpers/deleteDuplicate'

const CustomReport = () => {
    const title = getIdUrl('title')
    const date =
        new Date().toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    const { data, reportSales, reportProducts, reportReturns } = useReport()
    const [newData, setNewData] = useState([])
    const reports = {
        sales: reportSales,
        products: reportProducts,
        returns: reportReturns
    }
    const filtersExclude = ['id', 'Fecha', 'Total',
        'ID de Vendedor', 'Existencia Actual', 'Cantidad',
        'No. Factura', 'Descripción', 'RTN Cliente']
    useEffect(() => { if (reports[title]) reports[title]() }, [])
    let filters = {}
    const handleFilter = () => {
        setNewData(data.filter(result =>
            Object.entries(filters)
                .every(([key, value]) => result[key] === value)))
    }

    const handleSetFilter = (key, value) => {
        if (value === '*')
            delete filters[key]
        else if (filters[key])
            filters[key] = value
        else {
            const updateFilter = {
                ...filters,
                [key]: value
            }
            filters = updateFilter
        }
    }
    return (
        <div className="container">
            <Sidebar />
            <div className="reportContainer">
                <Navbar />
                <div className="filters">
                    {
                        data.length > 0 && Object.keys(data[0]).map(key =>
                        (!filtersExclude.includes(key) &&
                            <div className="form-control" key={key}>
                                <label htmlFor="select">{key}</label>
                                <select className="select"
                                    onChange={(e) => handleSetFilter(key, e.target.value)}>
                                    <option key={'*'} value={'*'}>Todos</option>
                                    {
                                        deleteDuplicate(data, key).map((obj, index) => (
                                            <option key={index} value={obj[key]}>{obj[key]}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        ))
                    }
                </div>
                <div className="options">
                    <button
                        className='btnDownload'
                        onClick={handleFilter}>Generar</button>
                    <CSVLink
                        className="btnDownload bg-green"
                        data={newData}
                        separator={";"}
                        filename={`Reporte_${title}${date}.csv`}
                    >
                        Exportar CSV
                    </CSVLink>
                    <button
                        href="#"
                        className="btnDownload bg-red"
                        onClick={() => {
                            exportPDFReport(newData, `Reporte_${title}${date}`)
                        }}>
                        Exportar PDF
                    </button>
                </div>
                <div className="results">
                    <Table data={newData} />
                </div>
            </div>
        </div>
    );
};

export default CustomReport;
