import "./Purchase.scss";
import React, { useState, useEffect, useContext } from "react";
import { useUser } from "../../../services/UserContext";
import { Context } from "../../../utils/context";
import { makePaymentRequest } from "../../../utils/api";
import { useNavigate } from 'react-router-dom';

const Purchase = () => {
  const [selectedOption, setSelectedOption] = useState("");
  // const [setCartSubTotal] = useState("");
  const { userName } = useUser();
  const { cartItems, cartSubTotal} = useContext(Context);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Nombres: "",
    Apellidos: "",
    Telefono: "",
    Direccion: "",
    Departamento: "",
    Localidad: "",
  });

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    const storedCartSubTotal = sessionStorage.getItem("cartSubTotal");
    // Usa setCartSubTotal para actualizar el estado
    // Solo deberías usar cartSubTotal aquí
    // setCartSubTotal(storedCartSubTotal);
    sessionStorage.removeItem("cartSubTotal");
  }, [cartItems, cartSubTotal]);
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleConfirmarPedido = async () => {
    const requiredFields = [
      "Nombres",
      "Apellidos",
      "Telefono",
      "Direccion",
      "Departamento",
      "Localidad",
    ];
    const missingFields = requiredFields.filter(
      (field) => !formData[field]
    );

    if (missingFields.length > 0) {
      alert(`Falta llenar los campos: ${missingFields.join(", ")}`);
      return;
    }

    setShowConfirmationModal(true);
  };

  const handleConfirmationModalClose = () => {
    setShowConfirmationModal(false);
  };

  const handlePedidoConfirmado = async () => {
    setShowConfirmationModal(false);

    try {
      const filteredCartItems = cartItems.map((item) => ({
        codigo: item.attributes.codigo,
        nombre: item.attributes.nombre,
        cantidad: item.attributes.quantity,
        precio_venta: item.attributes.precio_venta,
      }));

      const paymentData = {
        data: {
          stripeld: userName,
          product: {
            "Datos del cliente": formData,
            "Productos": filteredCartItems,
          },
        },
      };

      await makePaymentRequest.post("/api/orders", paymentData);
    } catch (err) {
      console.error(err);
    }

    navigate("/");
    window.location.reload();   
  };

  return (
    <div className="body1">
      <h1>Complete Los Campos Para Procesar Su Orden</h1>
      <div className="container">
        <div className="left">
          Total a Pagar:
          <div className="price">&#76;&#46;{cartSubTotal} +ISV</div>
        </div>
        <div className="right">
          <label className="lab">Nombres:</label>
          <input
            className="input1"
            type="text"
            placeholder="Nombres Completos"
            name="Nombres"
            value={formData.Nombres}
            onChange={(e) => setFormData({ ...formData, Nombres: e.target.value })}
          />
          <label className="lab">Apellidos:</label>
          <input
            className="input1"
            type="text"
            placeholder="Apellidos Completos"
            name="Apellidos"
            value={formData.Apellidos}
            onChange={(e) => setFormData({ ...formData, Apellidos: e.target.value })}
          />
          <label className="lab">Numero de Telefono</label>
          <input
            className="input1"
            type="text"
            placeholder="Numero de telefono"
            name="Telefono"
            value={formData.Telefono}
            onChange={(e) => setFormData({ ...formData, Telefono: e.target.value })}
          />
          <label className="lab">Direccion de Facturación:</label>
          <input
            className="input1"
            type="text"
            placeholder="Direccion"
            name="Direccion"
            value={formData.Direccion}
            onChange={(e) => setFormData({ ...formData, Direccion: e.target.value })}
          />
          <label className="lab">Seleccione su Departamento:</label>
          <select
            className="slect"
            id="combobox"
            value={selectedOption}
            onChange={(e) => {
              setSelectedOption(e.target.value);
              setFormData({ ...formData, Departamento: e.target.value });
            }}
            name="Departamento"
          >
            <option value="0"></option>
            <option value="Atlántida">Atlántida</option>
            <option value="Choluteca">Choluteca</option>
            <option value="Colón">Colón</option>
            <option value="Comayagua">Comayagua</option>
            <option value="Copán">Copán</option>
            <option value="Cortés">Cortés</option>
            <option value="El Paraíso">El Paraíso</option>
            <option value="Francisco Morazán">Francisco Morazán</option>
            <option value="Gracias a Dios">Gracias a Dios</option>
            <option value="Intibucá">Intibucá</option>
            <option value="Islas de la Bahía">Islas de la Bahía</option>
            <option value="La Paz">La Paz</option>
            <option value="Lempira">Lempira</option>
            <option value="Ocotepeque">Ocotepeque</option>
            <option value="Olancho">Olancho</option>
            <option value="Santa Bárbara">Santa Bárbara</option>
            <option value="Valle">Valle</option>
            <option value="Yoro">Yoro</option>
          </select>
          <label className="lab">Localidad:</label>
          <input
            className="input1"
            type="text"
            placeholder="Localidad"
            name="Localidad"
            value={formData.Localidad}
            onChange={(e) => setFormData({ ...formData, Localidad: e.target.value })}
          />
          <div></div>
          <button className="buton" onClick={handleConfirmarPedido}>
            Confirmar Pedido
          </button>
          {showConfirmationModal && (
            <div className="confirmation-modal">
              <div className="modal-content">
                <h2>¿Estás seguro de realizar tu pedido?</h2>
                <div className="modal-buttons">
                  <button onClick={handlePedidoConfirmado}>Sí</button>
                  <button onClick={handleConfirmationModalClose}>No</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Purchase;
