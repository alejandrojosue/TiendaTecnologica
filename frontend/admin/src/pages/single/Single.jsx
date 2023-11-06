import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useInvoiceBySeller } from "../../hooks/useInvoiceBySeller";
import IsLoading from '../../components/isLoading/IsLoading'
const Single = () => {
  const { data, loading, error } = useInvoiceBySeller(sessionStorage.getItem('userID'))
  const months =
    [, 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  let currentMonthArr = [], lastMonthArr = [],
    lastSecondMonthArr = [], lastThirdMonthArr = []
  const currentMonth = new Date().getMonth() + 1
  const lastMonth = new Date().getMonth()
  const lastSecondMonth = new Date().getMonth() - 1
  const lastThirdMonth = new Date().getMonth() - 2
  if (!loading)
    data
      .filter(value => value.status === 'Pagada')
      .forEach(invoice => {
        const month = parseInt(('' + invoice.date).split('/')[1])
        console.log(month, currentMonth)
        if (month === currentMonth)
          currentMonthArr.push(parseFloat(invoice.total))
        else if (month === lastMonth)
          lastMonthArr.push(parseFloat(invoice.total))
        else if (month === lastSecondMonth)
          lastSecondMonthArr.push(parseFloat(invoice.total))
        else if (month === lastThirdMonth)
          lastThirdMonthArr.push(parseFloat(invoice.total))
      })

  let dataChart = [
    {},
    { name: months[lastThirdMonth], Total: lastThirdMonthArr.reduce((acc, value) => { return acc + value }, 0) },
    { name: months[lastSecondMonth], Total: lastSecondMonthArr.reduce((acc, value) => { return acc + value }, 0) },
    { name: months[lastMonth], Total: lastMonthArr.reduce((acc, value) => { return acc + value }, 0) },
    { name: months[currentMonth], Total: currentMonthArr.reduce((acc, value) => { return acc + value }, 0) },
  ]


  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        {loading && <IsLoading />}
        {error && <div>Error al cargar datos</div>}
        <div className="top">
          <div className="left">
            <div className="editButton">Más</div>
            <h1 className="title">Información</h1>
            <div className="item">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Google_Contacts_logo.png"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{sessionStorage.getItem('userName')}</h1>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="Mis Ventas Totales ( Últimos 4 meses)" data={dataChart} />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Últimas 20 Transacciones</h1>
          <List data={data} />
        </div>
      </div>
    </div>
  );
};

export default Single;
