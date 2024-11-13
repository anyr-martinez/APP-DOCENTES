import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Styles/RecuperarContrasena.css';

const RecuperarContrasena = () => {
    const [recoveryEmail, setRecoveryEmail] = useState('');
    const [pin, setPin] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [step, setStep] = useState(1); // 1: Recuperar PIN, 2: Actualizar Contraseña
    const navigate = useNavigate();

    const handleRecuperarContrasena = async (event) => {
        event.preventDefault();

        if (!recoveryEmail) {
            setError('Por favor, ingrese su correo electrónico.');
            return;
        }

        try {
            const response = await axios.post('https://0zqb1tjz-3002.use.devtunnels.ms/api/usuarios/recuperar_contrasena', {
                email: recoveryEmail,
            });

            setMessage('Se ha enviado un correo de recuperación.');
            setError('');
            setStep(2); // Avanza al siguiente paso
            console.log('Recovery email sent:', response.data);
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error || 'Error al enviar el correo de recuperación. Por favor, inténtelo de nuevo.');
                console.error('Recovery email failed:', error.response.data);
            } else if (error.request) {
                setError('No se recibió respuesta del servidor. Por favor, inténtelo de nuevo.');
                console.error('No response received:', error.request);
            } else {
                setError('Error al enviar la solicitud. Por favor, inténtelo de nuevo.');
                console.error('Error in request setup:', error.message);
            }
            setMessage('');
        }
    };

    const handleActualizarContrasena = async (event) => {
        event.preventDefault();

        if (!recoveryEmail || !pin || !newPassword) {
            setError('Por favor, complete todos los campos.');
            return;
        }

        try {
            const response = await axios.post('https://0zqb1tjz-3002.use.devtunnels.ms/api/usuarios/actualizar_contrasena', {
                email: recoveryEmail,
                contrasena: newPassword,
                pin,
            });

            setMessage('Contraseña actualizada correctamente.');
            setError('');
            console.log('Password updated:', response.data);
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error || 'Error al actualizar la contraseña. Por favor, inténtelo de nuevo.');
                console.error('Password update failed:', error.response.data);
            } else if (error.request) {
                setError('No se recibió respuesta del servidor. Por favor, inténtelo de nuevo.');
                console.error('No response received:', error.request);
            } else {
                setError('Error al enviar la solicitud. Por favor, inténtelo de nuevo.');
                console.error('Error in request setup:', error.message);
            }
            setMessage('');
        }
    };

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-box">
                <h2>{step === 1 ? 'Recuperar Contraseña' : 'Actualizar Contraseña'}</h2>
                {error && <p className="error-message">{error}</p>}
                {message && <p className="success-message">{message}</p>}
                {step === 1 ? (
                    <form onSubmit={handleRecuperarContrasena}>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo Electrónico"
                                value={recoveryEmail}
                                onChange={(e) => setRecoveryEmail(e.target.value)}
                                autoComplete="email"
                            />
                            <span className="input-icon">@</span>
                        </div>
                        <div className="button-container">
                            <button type="submit">Enviar</button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleActualizarContrasena}>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="PIN de Recuperación"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                            />
                            <span className="input-icon">🔑</span>
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Nueva Contraseña"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                autoComplete="new-password"
                            />
                            <span className="input-icon">🔒</span>
                        </div>
                        <div className="button-container">
                            <button type="submit">Actualizar Contraseña</button>
                        </div>
                    </form>
                    
                )}
                <div className="button-container">
                <div className="or-separator">- OR -</div>
                    <button onClick={() => navigate('/')}>Volver al Login</button>
                </div>
            </div>
        </div>
    );
};

export default RecuperarContrasena;