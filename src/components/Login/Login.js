import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Login.css'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        }
    }, [navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            setError('Por favor, complete todos los campos.');
            return;
        }

        try {
            const response = await axios.post('https://0zqb1tjz-3002.use.devtunnels.ms/api/usuarios/iniciar_sesion', {
                login: email,
                contrasena: password,
            });

            const { Token, Usuario } = response.data;
            localStorage.setItem('token', Token);

            if (Usuario.tipo === 'Estudiante') {
                navigate('/dashboard-estudiante');
            } else if (Usuario.tipo === 'Docente') {
                navigate('/dashboard-docente');
            } else {
                navigate('/dashboard');
            }

            console.log('Login successful:', response.data);
        } catch (error) {
            setError('Error en el inicio de sesión. Por favor, inténtelo de nuevo.');
            console.error('Login failed:', error.response.data);
        }
    };


    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Sign in to start your session</h2>
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
                        <span className="input-icon">@</span>
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
                        <span className="input-icon">🔒</span>
                    </div>
                    <div className="button-container">
                        <button type="submit">Sign In</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;