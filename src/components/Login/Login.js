import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        }
    }, [navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!username || !password) {
            setError('Por favor, complete todos los campos.');
            return;
        }

        try {
            const response = await axios.post('https://0zqb1tjz-3002.use.devtunnels.ms/api/usuarios/iniciar_sesion', {
                login: username,
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
        <div className="login-form">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        id="username"
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        autoComplete="username"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        autoComplete="current-password"
                    />
                </div>
                <div className="button-container">
                    <button
                        className="submit-button"
                        type="submit"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;