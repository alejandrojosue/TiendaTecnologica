import InvoiceList from "./pages/list/InvoiceList";
import SubcategoryList from "./pages/list/SubcategoryList";
import ProductList from "./pages/list/ProductList";
import ReturnList from "./pages/list/ReturnList";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Single from "./pages/single/Single";
import Unauthorized from "./pages/unauthorized/Unauthorized";
import New from "./pages/new/New";
import NewInvoice from "./pages/new/NewInvoice";
import ProtectedRouted from "./auth/ProtectedRouted";
import { BrowserRouter, Routes, Route, RouterProvider } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import NotFound from "./pages/notFound/NotFound";
import InvoiceView from "./pages/single/InvoiceView";
import View from "./pages/view/viewproducts";
import ReturnView from "./pages/single/ReturnView";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRouted />}>
            <Route path="single" element={<Single />} />
            <Route path="dashboard" element={<Home />} />
            <Route path="subcategories" element={<SubcategoryList />} />
            <Route path="invoices">
              <Route index element={<InvoiceList />} />
              <Route path=":invoiceId" element={<Single />} />
              <Route
                path="new"
                element={<NewInvoice title="Nueva Factura" />}
              />
              <Route
                path="view"
                element={<InvoiceView title="Ver Factura"
                  inputs={productInputs} />}
              />
            </Route>
            <Route path="products">
              <Route index element={<ProductList />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
              <Route path="view" element={<View />} />
            </Route>
            <Route path="returns">
              <Route index element={<ReturnList />} />
              <Route path="view" element={<ReturnView />} />
            </Route>
            <Route path="unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
