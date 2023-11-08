import React from "react";
import useFetch from "../../../hooks/useFetch";
import Products from "../../Products/Products";

const RelatedProducts = ({ categoryId, productId }) => {
    const { data } = useFetch(
        `/api/productos?populate=deep&filters[id][$ne]=${productId}&filters[subcategorias][categoria][id]=${categoryId}&pagination[start]=0`
    );

    return (
        <div className="related-products">
            <Products headingText="Productos Relacionados" products={data} />
        </div>
    );
};

export default RelatedProducts;
