import React, { useState } from "react";
import "./Register.scss";
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    telefono: "",
    RTN: "",
    usuario: "",
    correo: "",
    contraseña: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  function validarNumeros(event) {
    const codigoTecla = event.charCode || event.keyCode;
  
    if (codigoTecla < 48 || codigoTecla > 57) {
      event.preventDefault();
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:1337/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.usuario,
          nombre: formData.nombre,
          apellido: formData.apellido,
          FechaNacimiento: formData.fechaNacimiento,
          telefono: formData.telefono,
          RTN: formData.RTN,
          email: formData.correo,
          password: formData.contraseña,
          provider: "local",
          confirmed: true,
          blocked: false,
          jurado: null,
          role: "2"
        }),
      });

      if (!response.ok) {
        throw new Error(`Error al registrar el usuario: ${response.status}`);
      }
      alert("Usuario registrado exitosamente!");
      navigate('/')
    } catch (error) {
      alert(`Error al registrar el usuario: ${error.message}`);
    }
  };


  return (
    <div className="body11">
      <h1>Registro</h1>
      <form className="container1" onSubmit={handleSubmit}>
        <div className="left1">
          <label className="lab1">Nombre:</label>
          <input
            className="input11"
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          <label className="lab1">Apellido:</label>
          <input
            className="input11"
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
          <label className="lab1">Fecha de Nacimiento:</label>
          <input
            className="input11"
            type="date"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            required
          />
          <label className="lab1">Teléfono:</label>
          <input
            className="input11"
            type="tel"
            name="telefono"
            value={formData.telefono}
            onKeyPress={validarNumeros}
            onChange={handleChange}
          />
        </div>
        <div className="right1">
          <label className="lab1">RTN:</label>
          <input
            className="input11"
            type="text"
            name="RTN"
            value={formData.RTN}
            onChange={handleChange}
            onKeyPress={validarNumeros}
            minLength="14"   // Mínimo de 14 caracteres
            maxLength="14"   // Máximo de 14 caracteres
            required
          />
          <label className="lab1">Usuario:</label>
          <input
            className="input11"
            type="text"
            name="usuario"
            value={formData.usuario}
            onChange={handleChange}
            required
          />
          <label className="lab1">Correo:</label>
          <input
            className="input11"
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
          />
          <label className="lab1">Contraseña:</label>
          <input
            className="input11"
            type={showPassword ? "text" : "password"}
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="show-password-button"
            >
            {showPassword ? "Ocultar" : "Mostrar"}
          </button>
          <button type="submit" className="buton1">
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
