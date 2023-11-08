import React from "react";

import "./Banner.scss";
import BannerImg from "../../../assets/banner-img.png";

const Banner = () => {
    return (
        <div className="hero-banner">
            <div className="content">
                <div className="text-content">
                    <h1>NuraPhone 120B</h1>
                    <p>
                        Auriculares inalámbricos Bluetooth, perfil de sonido personalizado, 
                        cancelación activa de ruido (ANC)0 y mucho mas.
                    </p>
                    <div className="ctas">
                        <div className="banner-cta">LEER MAS.</div>
                        <div className="banner-cta v2">COMPRAR AHORA</div>
                    </div>
                </div>
                <img className="banner-img" src={BannerImg} />
            </div>
        </div>
    );
};

export default Banner;
