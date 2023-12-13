import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import IsLoading from '../../components/isLoading/IsLoading'
import useInvoice from "../../hooks/useInvoice";
import { useEffect } from "react";
import dataChartValues from "../../helpers/dataChart";
const Single = () => {
  // const { data, loading, error, handleSellerId } = useInvoice()
  // useEffect(() => handleSellerId(sessionStorage.getItem('userID')), [])
  // let dataChart = dataChartValues(data && data)

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        {/* {loading && <IsLoading />}
        {error && <div>Error al cargar datos</div>} */}
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
            {/* <Chart aspect={3 / 1} title="Mis Ventas Totales ( Últimos 4 meses)" data={dataChart} /> */}
          </div>
        </div>
        {/* <div className="bottom">
          <h1 className="title">Últimas 20 Transacciones</h1>
          <List data={data} />
        </div> */}
      </div>
    </div>
  );
};

export default Single;
