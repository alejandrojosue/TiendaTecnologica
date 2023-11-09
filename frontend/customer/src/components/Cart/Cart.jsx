import React, { useContext, useState } from "react";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import { Context } from "../../utils/context";
import CartItem from "./CartItem/CartItem";
import { makePaymentRequest } from "../../utils/api";
import { useNavigate } from 'react-router-dom';

import "./Cart.scss";

const Cart = () => {
    const [showModal, setShowModal] = useState(false);
    const [processing] = useState(false);
    const { cartItems, setShowCart, cartSubTotal} = useContext(Context);

    const Modal = ({ onClose }) => {
        const navigate = useNavigate();
        const closeModalAndGoBack = () => {
            onClose(); // Cierra el modal
            navigate('/');
            window.location.reload();
          };
        return (
            <div className="modal">
                <div className="modal-content">
                    <p>Gracias por tu pedido. El pedido está siendo procesado.</p>
                    <button onClick={closeModalAndGoBack}>Cerrar</button>
                </div>
            </div>
        );
    };

    // const stripePromise = loadStripe(
    //     process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
    // );

    // const handlePayment = async () => {
    //     try {
    //         const stripe = await stripePromise;
    //         const res = await makePaymentRequest.post("/api/orders", {
    //             products: cartItems,
    //         });
    //         await stripe.redirectToCheckout({
    //             sessionId: res.data.stripeSession.id,
    //         });
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    const handlePayment = async () => {
        try {
            // Obtener la dirección IP del cliente (puedes usar servicios externos o bibliotecas para esto).
            const clientIPAddress = "192.168.0.1"; // Reemplaza esto con la lógica real para obtener la IP. 
            
            const filteredCartItems = cartItems.map(item => ({
                codigo: item.attributes.codigo,
                nombre: item.attributes.nombre,
                cantidad: item.attributes.quantity,
                precio_venta: item.attributes.precio_venta,
              }));  

            // Crear un objeto con los datos que se enviarán a la API de Strapi.
            const paymentData = {
                data: {
                    stripeld: clientIPAddress,
                    product: filteredCartItems,
                }
            };
            
            setShowModal(true);

            // Realizar la solicitud a la API de Strapi utilizando la función makePaymentRequest.
             await makePaymentRequest.post("/api/orders", paymentData);
    
        } catch (err) {
            console.error(err);
            // Manejar errores, por ejemplo, mostrar un mensaje al usuario.
        }
    };

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
                        <span>No products in the cart.</span>
                        <button className="return-cta" onClick={() => {}}>
                            RETURN TO SHOP
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
                                onClick={handlePayment}
                                disabled={processing}
                                >
                        {processing ? "Procesando..." : "Procesar Compra"}
                            </button>
                        </div>
                        </div>
                        {showModal && (
                             <Modal onClose={() => setShowModal(false)} />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;
