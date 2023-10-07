import CategoryList from "./pages/list/CategoryList";
import SubcategoryList from "./pages/list/SubcategoryList";
import ProductList from "./pages/list/ProductList";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Single from "./pages/single/Single";
import Unauthorized from "./pages/unauthorized/Unauthorized";
import New from "./pages/new/New";
import ProtectedRouted from "./auth/ProtectedRouted";
import { BrowserRouter, Routes, Route, RouterProvider } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";

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
            <Route path="categories">
              <Route index element={<CategoryList />} />
              <Route path=":categoryId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
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
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
