import React, { useContext, useState } from "react";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import { Context } from "../../utils/context";
import CartItem from "./CartItem/CartItem";
import { useNavigate } from 'react-router-dom';
import { useUser } from "../../services/UserContext";

import "./Cart.scss";

const Cart = () => {
    const [processing, setProcessing] = useState(false);
    const { cartItems, setShowCart, cartSubTotal} = useContext(Context);
    const { userName } = useUser();
    const navigate = useNavigate();

    const condicion = async () => {
        if(!userName){
            navigate('/login')
            setShowCart(false)
        }else{
            sessionStorage.setItem('cartSubTotal', cartSubTotal);
            sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
            navigate('/purchase')
            setShowCart(false)
        }
    }
    
    return (
        <div className="cart-panel">
            <div
                className="opac-layer"
                onClick={() => setShowCart(false)}
            ></div>
            <div className="cart-content">
                <div className="cart-header">
                    <span className="heading">Carrito de Compra</span>
                    <span
                        className="close-btn"
                        onClick={() => setShowCart(false)}
                    >
                        <MdClose className="close-btn" />
                        <span className="text">Cerrar</span>
                    </span>
                </div>

                {!cartItems.length && (
                    <div className="empty-cart">
                        <BsCartX />
                        <span>No hay productos en el carrito.</span>
                        <button className="return-cta" onClick={() =>setShowCart(false)}>
                            REGRESAR A LA TIENDA
                        </button>
                    </div>
                )}

                {!!cartItems.length && (
                    <>
                        <CartItem />
                        <div className="cart-footer">
                            <div className="subtotal">
                                <span className="text">Subtotal:</span>
                                <span className="text total">
                                &#76;&#46;{cartSubTotal}
                                </span>
                            </div>
                            <div className="button">
                            <button
                                className="checkout-cta"
                                onClick={condicion}
                                disabled={processing}
                                >
                        {processing ? "Procesando..." : "Procesar Compra"}
                            </button>
                        </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;
