import Chart from "../../../components/chart/Chart"
import './reportSalesSeller.scss'
const ReportSalesSeller = () => {
    const dataChart = [
        {
            name: 'Hola',
            Total: 24
        },
        {
            name: 'adios',
            Total: 1242
        },
        {
            name: 'correa',
            Total: 4200
        },
        {
            name: 'samantha',
            Total: 50
        },
        {
            name: 'correa',
            Total: 4000
        },
        {
            name: 'vista',
            Total: 234
        },
        {
            name: 'embarazada',
            Total: 402
        }
    ]
    return (<>
        <Chart
            title={'Ventas'}
            aspect={3 / 1}
            data={dataChart} />
    </>)
}

export default ReportSalesSeller