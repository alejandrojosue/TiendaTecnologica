import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <p className="textTime">Movimientos del <strong>1 oct. 2023</strong> hasta <strong>31 oct. 2023.</strong></p>
        <div className="widgets">
          <Widget type="sale" />
          <Widget type="expense" />
          <Widget type="earning" />
          <Widget type="tax" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Últimos 6 meses (Ingresos)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Últimas Transacciones</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
