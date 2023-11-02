import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import dateFormatToSpanish from "../../helpers/date-format-to-spanish";
import { useDashboard } from "../../hooks/useDashboard";
import { useFetchShopping } from "../../hooks/useFetchShopping";

const Home = () => {
  const { data, loading, error, handleCurrentDate } = useDashboard()
  const { dataShop, loadingShop, errorShop } = useFetchShopping()
  const date = new Date()

  const salesAmount =
    data
      .filter(data => data.status === 'Pagada')
      .reduce((acc, value) => {
        return acc + parseFloat(value.total)
      }, 0)
  const salesTax =
    data
      .filter(data => data.status === 'Pagada')
      .reduce((acc, value) => {
        return acc + parseFloat(value.tax)
      }, 0)

  const expense = dataShop.reduce((acc, value) => {
    return acc + value.details.reduce((acc, detail) => {
      return acc + detail.precio * detail.cantidad * (1 + detail.isv - detail.descuento)
    }, 0)
  }, 0)


  if (loading || loadingShop) return (<div>Cargando...</div>)
  if (error || errorShop) return (<div>{'Ha ocurrido un error...'}</div>)

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">

        <Navbar />
        <p className="textTime">
          Movimientos del <strong
            onClick={() => handleCurrentDate(false)}
          >{dateFormatToSpanish(date)}</strong>
          hasta <strong
            onClick={() => handleCurrentDate(true)}
          >{dateFormatToSpanish(date, true)}</strong></p>
        <div className="widgets">
          <Widget type="sale" _value={data && salesAmount} />
          <Widget type="expense" _value={dataShop && expense} />
          {/* <Widget type="earning" _value={'----'} /> */}
          <Widget type="tax" _value={data && salesTax} />
        </div>
        {/* <div className="charts">
          <Featured />
          <Chart title="Últimos 6 meses (Ingresos)" aspect={2 / 1} />
        </div> */}
        <div className="listContainer">
          <div className="listTitle">Últimas 20 Transacciones</div>
          <Table data={data} />
        </div>
      </div>
    </div>
  );
};

export default Home;
