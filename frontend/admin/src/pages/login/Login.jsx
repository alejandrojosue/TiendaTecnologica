import './login.scss'
import { useState } from 'react'
import { fetchDataFromAPI } from '../../services/api/context'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const handleLogin = async () => {
    try {
      if (identifier && password) {
        const response = await fetchDataFromAPI('/auth/local', 'POST', null, { identifier, password })
          .catch(err => {
            if (err == 'Error: Bad Request') alert('Usuario y/o contraseña no váildos!')
          })
        if (response) {
          if (!response.user.confirmed || response.user.blocked) {
            alert('El usuario actual no se ha confirmado y/o está bloqueado!\nFavor contactarse con el administrador.')
            return
          }
          sessionStorage.setItem('daiswadod', response.jwt)
          sessionStorage.setItem('userID', response.user.id)
          sessionStorage.setItem('userName', response.user.nombre)
          sessionStorage.setItem('SESSION_TIME', new Date().getTime())
          navigate('/dashboard')
        }
      } else alert("Debe llenar los campos!")
    } catch (error) {
      setError(error)
    }
  }


  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder='Usuario'
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
        <label>Usuario</label>
      </div>
      <div className="input-container">
        <input
          type="password"
          placeholder='contraseña'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>Contraseña</label>
      </div>
      <button onClick={handleLogin}>Acceder</button>
      {error && <div className="error">{error}</div>}
    </div>
  )
}
export default Login