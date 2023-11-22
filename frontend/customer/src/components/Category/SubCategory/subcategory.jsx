import React from "react";
import { useNavigate } from "react-router-dom";
import "./subcategory.scss";

const Subcategory = ({ subcategories }) => {
  const navigate = useNavigate();

  // Verificar si subcategories es un objeto con la propiedad data
  const subcategoryData = subcategories?.data || subcategories;

  return (
    <div className="shop-by-category1">
      <div className="categories1">
        {subcategoryData.map((item) => (
          <div
            key={item.id}
            className="category1"
            onClick={() => navigate(`/subcategorys/${item.id}`)}
          >
            <p className="category-name1">{item.attributes.nombre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subcategory;
