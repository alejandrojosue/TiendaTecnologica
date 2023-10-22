import InvoiceList from "./pages/list/InvoiceList";
import SubcategoryList from "./pages/list/SubcategoryList";
import ProductList from "./pages/list/ProductList";
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

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRouted />}>
            <Route path="dashboard" element={<Home />} />
            <Route path="subcategories" element={<SubcategoryList />} />
            <Route path="invoices">
              <Route index element={<InvoiceList />} />
              <Route path=":invoiceId" element={<Single />} />
              <Route
                path="new"
                element={<NewInvoice inputs={userInputs} title="Nueva Factura" />}
              />
            </Route>
            <Route path="products">
              <Route index element={<ProductList />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
