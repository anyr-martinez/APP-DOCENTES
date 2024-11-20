import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import fondo from '../../assets/images/fondo.jpg';
import '../Styles/Login/Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { UsuarioIniciarSesion } from '../Configuracion/ApiUrls';
import { AxiosPublico } from '../Axios/Axios';
import { mostraAlerta, mostraAlertaOK, mostraAlertaError } from '../SweetAlert/SweetAlert';
import { UsuarioContext } from '../Contexto/usuario/UsuarioContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const { setLogin, setCerrarSesion } = useContext(UsuarioContext);

    useEffect(() => {
        // Al acceder a la página de inicio de sesión, cerrar sesión y eliminar el token
        setCerrarSesion();
    }, [setCerrarSesion]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            setError('Por favor, complete todos los campos.');
            mostraAlerta('Por favor, complete todos los campos.', 'warning');
            return;
        }

        try {
            const response = await AxiosPublico.post(UsuarioIniciarSesion, {
                login: email,
                contrasena: password,
            });

            if (response && response.data) {
                const { Token, Usuario } = response.data;
                setLogin({ usuario: Usuario, token: Token });

                if (Usuario.tipo === 'Estudiante') {
                    navigate('/dashboard-estudiante');
                } else if (Usuario.tipo === 'Docente') {
                    navigate('/dashboard-docente');
                } else {
                    navigate('/dashboard');
                }

                console.log('Login successful:', response.data);
                mostraAlertaOK('Inicio de sesión exitoso', 'success');
            } else {
                setError('Error en el inicio de sesión. Por favor, inténtelo de nuevo.');
                console.error('Login failed: response data is undefined');
                mostraAlertaError('Error en el inicio de sesión. Por favor, inténtelo de nuevo.', 'error');
            }
        } catch (error) {
            setError('Error en el inicio de sesión. Por favor, inténtelo de nuevo.');
            console.error('Login failed:', error);
            mostraAlertaError('Error en el inicio de sesión. Por favor, inténtelo de nuevo.', 'error');
        }
    };

    return (
        <div className="login-container" style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
            <div className="login-box">
                <h2>Inicio de Sesión</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="username"
                        />
                        <span className="input-icon"><FontAwesomeIcon icon={faEnvelope} /></span>
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                        <span className="input-icon"><FontAwesomeIcon icon={faLock} /></span>
                    </div>
                    <div className="button-container">
                        <button type="submit">Sign In</button>
                    </div>
                    <div className="button-container">
                        <div className="or-separator">- OR -</div>
                        <Link to="/recuperar-contrasena">
                            <button type="button">Olvidé la Contraseña</button>
                        </Link>
                    </div>
                    <div className="button-container">
                        <Link to="/registro-estudiante">Crear Cuenta</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;