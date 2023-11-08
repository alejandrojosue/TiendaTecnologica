import React from "react";
import "./Footer.scss";
import { FaLocationArrow, FaMobileAlt, FaEnvelope } from "react-icons/fa";
import Payment from "../../assets/payments.png";
const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-content">
                <div className="col">
                    <div className="title">Acerca</div>
                    <div className="text">
                    Navega de manera fácil y segura en nuestra plataforma intuitiva, 
                    y disfruta de entregas rápidas y atención al cliente excepcional. 
                    Haz que la tecnología mejore tu vida con nuestras ofertas exclusivas y 
                    descubre un mundo de posibilidades con nosotros.
                    </div>
                </div>
                <div className="col">
                    <div className="title">Contáctanos</div>
                    <div className="c-item">
                        <FaLocationArrow />
                        <div className="text">
                            Comayagua, La Paz. Barrio los prados
                        </div>
                    </div>
                    <div className="c-item">
                        <FaMobileAlt />
                        <div className="text">Phone: 2771-9012</div>
                    </div>
                    <div className="c-item">
                        <FaEnvelope />
                        <div className="text">Email: contability@radax.com</div>
                    </div>
                </div>
                <div className="col">
                    <div className="title">Categorías</div>
                    <span className="text">Audios</span>
                    <span className="text">Celulares y Accesorios</span>
                    <span className="text">Computadoras y Tablets</span>
                    <span className="text">Gaming</span>
                    <span className="text">Televisores y Entretenimiento</span>
                </div>
                <div className="col">
                    <div className="title">Pagina</div>
                    <span className="text">Inicio</span>
                    <span className="text">Acerca de.</span>
                    <span className="text">Política y Privacidad</span>
                    <span className="text">Retornos</span>
                    <span className="text">Artículos & Condiciones</span>
                    <span className="text">Contáctenos</span>
                </div>
            </div>
            <div className="bottom-bar">
                <div className="bottom-bar-content">
                    <span className="text">
                        REDAX 2023 CREADO POR TEAM UJCV. GRUPO#1 SOFTWARE SOLUTIONS
                    </span>
                    <img src={Payment} />
                </div>
            </div>
        </div>
    );
};

export default Footer;
