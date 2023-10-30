import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BrandingIcon from "@mui/icons-material/Sell";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import BrandingOutlineIcon from "@mui/icons-material/SellOutlined";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { SessionValidate } from "../../middlewares/SessionValidate";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <span onClick={() => { SessionValidate() }}
            className="logo">Panel de Control</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span onClick={() => { SessionValidate() }}>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTAS</p>

          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span
                onClick={() => { SessionValidate() }}>Inventario</span>
            </li>
          </Link>
          <Link to="/invoices" style={{ textDecoration: "none" }}>
            <li>
              <BrandingIcon className="icon" />
              <span onClick={() => { SessionValidate() }}>Facturas</span>
            </li>
          </Link>
          {/* <Link to="/categories" style={{ textDecoration: "none" }}>
            <li>
              <BrandingIcon className="icon" />
              <span onClick={() => { SessionValidate() }}>Facturas</span>
            </li>
          </Link>
          <Link to="/subcategories" style={{ textDecoration: "none" }}>
            <li>
              <BrandingOutlineIcon className="icon" />
              <span onClick={() => { SessionValidate() }}>Subcategorías</span>
            </li>
          </Link> */}
          {/*           
          <li>
            <CreditCardIcon className="icon" />
            <span>Orders</span>
          </li>
          <li>
            <LocalShippingIcon className="icon" />
            <span>Delivery</span>
          </li>
          <p className="title">USEFUL</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li>
          <p className="title">SERVICE</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li>
          <p className="title">USUARIO</p>
           */}
          <Link to={"/single"} style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Perfil</span>
            </li></Link>
          <p className="title">USUARIO</p>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <li>
              <ExitToAppIcon className="icon" />
              <span onClick={() => { sessionStorage.clear() }}
              >Cerrar Sesión</span>
            </li>
          </Link>
        </ul>
      </div>
      <div className="bottom">
        {/* <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div> */}
        {/* <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div> */}
      </div>
    </div>
  );
};

export default Sidebar;
