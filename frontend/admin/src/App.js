import InvoiceList from "./pages/list/InvoiceList"
import ProductList from "./pages/list/ProductList"
import ReturnList from "./pages/list/ReturnList"
import RIList from "./pages/list/RIList"
import OrderList from './pages/list/OrderList'
import Login from "./pages/login/Login"
import Home from "./pages/home/Home"
import Single from "./pages/single/Single"
import Unauthorized from "./pages/unauthorized/Unauthorized"
import NotFound from "./pages/notFound/NotFound"
import NewInvoice from "./pages/new/NewInvoice"
import NewReturn from "./pages/new/NewReturn"
import NewOrder from "./pages/new/NewOrder"
import InvoiceView from "./pages/single/InvoiceView"
import Productview from "./pages/single/ProductView"
import ReturnView from "./pages/single/ReturnView"
import Report from "./pages/report/Report"
import ProtectedRouted from "./auth/ProtectedRouted"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./style/dark.scss"
import { useContext } from "react"
import { DarkModeContext } from "./context/darkModeContext"
import { useEffect } from "react"
import CustomReport from "./pages/report/custom/CustomReport"
import Layout from './pages/layout/Layout'
import ReportSalesSeller from './pages/report/salesOrderSeller/ReportSalesSeller'
import ReportSalesCustomer from "./pages/report/salerOrderCustomer/ReportSalesCustomer"
import Test from "./pages/tests/test"
import OrderView from "./pages/single/OrderView"

function App() {
  const { darkMode } = useContext(DarkModeContext)
  // Rutas en las que se debe evitar la recarga o salida
  const pathsPrevent = [
    '/invoices/new',
    '/returns/new',
  ]
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      const msg = '¿Está seguro de cancelar todos los cambios?'
      e.returnValue = msg
      return msg
    }
    if (pathsPrevent.includes(window.location.pathname)) {
      window.addEventListener('beforeunload', handleBeforeUnload)
      return () => window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="test" element={<Layout children={<Test />} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRouted />}>
            <Route path="single" element={<Single />} />
            <Route path="dashboard" element={<Home />} />
            <Route path="invoices">
              <Route index element={<Layout children={<InvoiceList />} />} />
              <Route
                path="new"
                element={<NewInvoice title="Nueva Factura" />}
              />
              <Route
                path="view"
                element={<InvoiceView title="Ver Factura" />}
              />
            </Route>
            <Route path="products">
              <Route index element={<ProductList />} />
              {/* <Route path=":productId" element={<Single />} /> */}
              <Route path="view" element={<Productview />} />
            </Route>
            <Route path="returns">
              <Route index element={<ReturnList />} />
              <Route path="view" element={<ReturnView />} />
              <Route path="select" element={<RIList />} />
              <Route path="new" element={<NewReturn />} />
            </Route>
            <Route path="reports">
              <Route index element={<Report />} />
              <Route path="custom" element={<CustomReport />} />
              <Route path="reportSalesSeller" element={<Layout children={<ReportSalesSeller />} />} />
              <Route path="reportSalesCustomer" element={<Layout children={<ReportSalesCustomer />} />} />
            </Route>
            <Route path="orders">
              <Route index element={<Layout children={<OrderList />} />} />
              <Route path="view" element={<OrderView />} />
              <Route path="new" element={<NewOrder />} />
            </Route>
            <Route path="unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
