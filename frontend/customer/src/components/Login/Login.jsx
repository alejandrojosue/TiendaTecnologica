import "./Login.scss";
import '@fortawesome/fontawesome-free/css/all.min.css';
import React, {useState} from "react";
import { fetchDataFromAPI } from "../../services/context";
import { useNavigate } from 'react-router-dom'
import { useUser } from "../../services/UserContext";


const Login = () =>{

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { setUserName } = useUser()

  const handleLogin = async () => {
    try {
      if (identifier && password) {
        const response = await fetchDataFromAPI('/auth/local', 'POST', null, { identifier, password })
          .catch(err => {
            if (err == 'Error: Bad Request') alert('Usuario y/o contraseña no váildos!')
          })
        if (response) {
          localStorage.setItem('daiswadod', response.jwt)
          localStorage.setItem('userID', response.user.id)
          localStorage.setItem('userName', response.user.nombre)
          setUserName(response.user.nombre);
          localStorage.setItem('SESSION_TIME', new Date().getTime())
          navigate('/')
        }
      } else alert("Debe llenar los campos!")
    } catch (error) {
      setError(error)
    }
  }

    return (
        <div className="body">
            <div className="wrapper">
                <div action="" className="form">
                    <h1 className="title">Inicio</h1>
                    <div className="inp">
                        <input type="text" className="input" placeholder="Usuario" 
                        value={identifier} onChange={(e) => setIdentifier(e.target.value)} required />
                        <i className="fa-solid fa-user"></i>
                    </div>
                    <div className="inp">
                        <input type="password" className="input" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <i className="fa-solid fa-lock"></i>
                    </div>
                    <div>  
                    <button className="submit" onClick={handleLogin}>Iniciar Sesion</button>
                    {/* <p className="footer">¿No tienes cuenta?<a href="#" className="link">Por favor, Registrate</a></p> */}
                    </div>
                </div>
                <div></div>
                <div className="banner">
                    <h1 className="wel_text">BIENVENIDO<br /></h1>
                    <p className="para">A REDAX.</p>
                </div>
            </div>
        </div>
    );
};

export default Login;