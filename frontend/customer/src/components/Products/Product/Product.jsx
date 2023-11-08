import React from "react";
import { useNavigate } from "react-router-dom";
import "./Product.scss";

const Product = ({ id, data }) => {
    const navigate = useNavigate();
    return (
        <div
            className="product-card"
            onClick={() => navigate("/product/" + id)}
        >
            <div className="thumbnail">
                <img src={!(data.img.data.attributes.url ) ? process.env.REACT_APP_STRIPE_APP_DEV_URL +  data.img.data.attributes.formats?.thumbnail.url : process.env.REACT_APP_STRIPE_APP_DEV_URL +  data.img.data.attributes.url } alt="" />
            </div>
            <div className="prod-details">
                <span className="name">{data.nombre}</span>
                <span className="price">&#76;&#46; {data.precio_venta}</span>
                <span className="name">+ ISV</span><br />
            </div>
        </div>
    );
};

export default Product; 
