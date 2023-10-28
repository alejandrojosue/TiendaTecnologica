import React from "react";
import "./LoadingModal.scss"; // Agrega estilos CSS para el modal

const LoadingModal = () => {
    return (
        <div className="loading-modal">
            <div className="loading-content">
                <img src="https://i.gifer.com/ZKZg.gif"
                    width={"50px"} height={'50px'} />&nbsp;
                <span>Procesando la transacción...</span>
            </div>
        </div>
    );
};

export default LoadingModal