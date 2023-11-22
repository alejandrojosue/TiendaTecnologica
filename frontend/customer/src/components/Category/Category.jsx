import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Products from "../Products/Products";
import { Context } from "../../utils/context";
import { fetchDataFromApi } from "../../utils/api";
import Subcategory from "./SubCategory/subcategory";
import "./Category.scss";

const Category = () => {
  const { setCategories } = useContext(Context);
  const [subcategories, setSubcategories] = useState([]);
  const { id } = useParams();
  const { data } = useFetch(
    `/api/productos?populate=deep&filters[subcategorias][categoria][id]=${id}&pagination[start]=0`
  );

  useEffect(() => {
    fetchDataFromApi(`/api/subcategorias?populate=deep&filters[categoria][id]=${id}`)
      .then((subcategoriesResponse) => {
        setSubcategories(subcategoriesResponse.data);
      })
      .catch((error) => {
        console.error("Error fetching subcategories:", error);
      });
  }, [id]);

  const getCategories = () => {
    fetchDataFromApi("/api/categorias?populate=*").then((res) => {
      setCategories(res);
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="category-main-content">
      <div className="layout">
        <Products headingText="Subcategorias" />
        <Subcategory
          subcategories={subcategories}
        />
        <Products headingText="Productos Relacionados con la Categoria" />
        <div className="category-title">
          {data?.data?.[0]?.attributes?.categories?.data?.[0]?.attributes?.title}
        </div>
        <Products innerPage={true} products={data} />
      </div>
    </div>
  );
};

export default Category;
