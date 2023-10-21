import { useState } from "react";
import { useFetchProductsId } from "../../hooks/useFetchProducts";
import React, { Component } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./found.scss";

const FoundProduct =({inputs, title}) => {
    const [file, setFile] = useState("");
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get('id');
    const {data, loading} = useFetchProductsId(id)

    return(
        <div className="new">
            <div className="sidebar">
                <Sidebar />
            </div>
            <div className="newContainer">
            <div>
                <Navbar />
                </div>
        <div className="bottom">
        <label htmlFor="id">Codigo:</label>
        <input type="text" value={data && data.sku ? data.sku : ''} readOnly />
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" value={data && data.name ? data.name : ''} readOnly />
        <label htmlFor="precioc">Precio de Compra:</label>
        <input type="text" value={data && data.priceC ? data.priceC : ''} readOnly />
        <label htmlFor="descripcion">Descripcion:</label>
        <input type="text" value={data && data.description ? data.description : ''} readOnly />
        <label htmlFor="preciov">Precio de venta:</label>
        <input type="text" value={data && data.priceV ? data.priceV : ''} readOnly />
        </div>
        </div>
        </div>  
    );
};
export default FoundProduct;