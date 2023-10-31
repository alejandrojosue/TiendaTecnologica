import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import dateFormatToSpanish from "../../helpers/date-format-to-spanish";
import { useDashboard } from "../../hooks/useDashboard";

const Home = () => {
  const { data, loading, error, handleCurrentDate } = useDashboard()
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

  if (loading) return (<div>Cargando...</div>)
  if (error) return (<div>{'error'}</div>)
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <p className="textTime">
          Movimientos del <strong
            onClick={() => handleCurrentDate(false)}
          >{dateFormatToSpanish(`${new Date().getFullYear()}-${new Date().getMonth() + 1 < 10 ? "0" + (new Date().getMonth() + 1) : "0" + (new Date().getMonth() + 1)}-1`)}</strong>
          hasta <strong
            onClick={() => handleCurrentDate(true)}
          >{dateFormatToSpanish(`${new Date().getFullYear()}-${new Date().getUTCDate() === 31 ? new Date().getMonth() + 2 : new Date().getMonth() + 1}-${new Date().getUTCDate() === 31 ? '01' : new Date().getUTCDate()}`)}</strong></p>
        <div className="widgets">
          <Widget type="sale" _value={data && salesAmount} />
          <Widget type="expense" _value={'----'} />
          <Widget type="earning" _value={'----'} />
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
