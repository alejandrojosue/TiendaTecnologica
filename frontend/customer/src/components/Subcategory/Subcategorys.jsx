import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Products from "../Products/Products";

const Subcategorys = () => {
  const { id } = useParams();
  const { data } = useFetch(
    `/api/productos?populate=deep&filters[subcategorias][id]=${id}&pagination[start]=0`
  );

  return (
    <div className="category-main-content">
      <div className="layout">
        <Products headingText="Productos Relacionados con la Subcategoria" />
        <div className="category-title">
          {data?.data?.[0]?.attributes?.categories?.data?.[0]?.attributes?.title}
        </div>
        <Products innerPage={true} products={data} />
      </div>
    </div>
  );
};

export default Subcategorys;
