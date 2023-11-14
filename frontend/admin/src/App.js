import InvoiceList from "./pages/list/InvoiceList"
import ProductList from "./pages/list/ProductList"
import ReturnList from "./pages/list/ReturnList"
import RIList from "./pages/list/RIList"
import Login from "./pages/login/Login"
import Home from "./pages/home/Home"
import Single from "./pages/single/Single"
import Unauthorized from "./pages/unauthorized/Unauthorized"
import NotFound from "./pages/notFound/NotFound"
import NewInvoice from "./pages/new/NewInvoice"
import NewReturn from "./pages/new/NewReturn"
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
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRouted />}>
            <Route path="single" element={<Single />} />
            <Route path="dashboard" element={<Home />} />
            <Route path="invoices">
              <Route index element={<InvoiceList />} />
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
              <Route path="select" element={<RIList />} />
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
