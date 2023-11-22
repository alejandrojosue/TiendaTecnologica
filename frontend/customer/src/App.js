import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Category from "./components/Category/Category";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import Newsletter from "./components/Footer/Newsletter/Newsletter";
import AppContext from "./utils/context";
import Login from "./components/Login/Login";
import Purchase from "./components/Cart/Purchase/Purchase";
import Subcategorys from "./components/Subcategory/Subcategorys";
import Register from "./components/Login/Register/Register";

function App() {
    return (
        <BrowserRouter>
            <AppContext>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/category/:id" element={<Category />} />
                    <Route path="/product/:id" element={<SingleProduct />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/purchase" element={<Purchase />} />
                    <Route path="/subcategorys/:id" element={<Subcategorys />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
                <Newsletter />
                <Footer />
            </AppContext>
        </BrowserRouter>
    );
}

export default App;
