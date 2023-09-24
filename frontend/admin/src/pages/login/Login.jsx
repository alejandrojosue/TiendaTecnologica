import './login.scss'
import React, { useState } from 'react';
import { fetchDataFromAPI } from '../../services/api/context';
import { Navigate } from 'react-router-dom'


const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const authenticate = async () => {
    try {
      const response = await fetchDataFromAPI('/auth/local', 'POST', null, { identifier, password });
      console.log(response.jwt)
      sessionStorage.setItem('daiswadod', response.jwt)
    } catch (error) {
      setError(error);
    }
  }
  const handleLogin = () => {
    authenticate()
    return <Navigate to="/dashboard" />
  }

  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder='Usuario'
          value={identifier}
          onChange={(target) => setIdentifier(target.value)}
          required
        />
        <label>Usuario</label>
      </div>
      <div className="input-container">
        <input
          type="password"
          placeholder='contraseña'
          value={password}
          onChange={(target) => setPassword(target.value)}
          required
        />
        <label>Contraseña</label>
      </div>
      <button onClick={handleLogin}>Acceder</button>
      {error && <div className="error">{error}</div>}
    </div>
  );
};
export default Login