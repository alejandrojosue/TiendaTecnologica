import { useContext, useState } from "react";
import { Context } from "../../utils/context";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaPinterest,
    FaCartPlus,
} from "react-icons/fa";
import "./SingleProduct.scss";

const SingleProduct = () => {
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();
    const { handleAddToCart } = useContext(Context);
    const { data } = useFetch(`/api/productos?populate=deep&[filters][id]=${id}`);

    const decrement = () => {
        setQuantity((prevState) => {
            if (prevState === 1) return 1;
            return prevState - 1;
        });
    };
    const increment = () => {
        setQuantity((prevState) => prevState + 1);
    };

    if (!data) return;
    const product = data?.data?.[0]?.attributes;

    return (
        <div className="single-product-main-content">
            <div className="layout">
                <div className="single-product-page">
                    <div className="left">
                    <img src={!(product.img.data.attributes.url ) ? process.env.REACT_APP_STRIPE_APP_DEV_URL +  product.img.data.attributes.formats?.thumbnail.url : process.env.REACT_APP_STRIPE_APP_DEV_URL +  product.img.data.attributes.url } alt="" />
                    </div>
                    <div className="right">
                        <span className="name">{product.nombre}</span>
                        <span className="price">&#76;&#46; {product.precio_venta} + ISV</span>
                        <span className="desc">{product.descripcion}</span>

                        <div className="cart-buttons">
                            <div className="quantity-buttons">
                                <span onClick={decrement}>-</span>
                                <span>{quantity}</span>
                                <span onClick={increment}>+</span>
                            </div>
                            <button
                                className="add-to-cart-button"
                                onClick={() => {
                                    handleAddToCart(data?.data?.[0], quantity);
                                    setQuantity(1);
                                }}
                            >
                                <FaCartPlus size={20} />
                                ADD TO CART
                            </button>
                        </div>

                        <span className="divider" />
                        <div className="info-item">
                            <span className="text-bold">
                                Category:{" "}
                                <span>
                                    {
                                        product.subcategorias.data[0].attributes.categoria.data.attributes.nombre
                                    }
                                </span>
                            </span>
                            <span className="text-bold">
                                Share:
                                <span className="social-icons">
                                    <FaFacebookF size={16} />
                                    <FaTwitter size={16} />
                                    <FaInstagram size={16} />
                                    <FaLinkedinIn size={16} />
                                    <FaPinterest size={16} />
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
                <RelatedProducts
                    productId={id}
                    categoryId={product.subcategorias.data[0].attributes.categoria.data.id}
                />
            </div>
        </div>
    );
};

export default SingleProduct;
