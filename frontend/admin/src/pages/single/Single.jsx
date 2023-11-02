import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useInvoiceBySeller } from "../../hooks/useInvoiceBySeller";

const Single = () => {
  const { data, loading, error } = useInvoiceBySeller(sessionStorage.getItem('userID'))
  if (loading) return (<div>Cargando...</div>)
  if (error) return (<div>Error al cargar datos</div>)
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
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
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
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
