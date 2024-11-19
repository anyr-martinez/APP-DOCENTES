import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fondo from '../../../assets/images/fondo.jpg';
import '../../Styles/Login/RegistroEstudiante.css';

const RegistroEstudiante = () => {
    const [formData, setFormData] = useState({
        primerNombre: '',
        segundoNombre: '',
        primerApellido: '',
        segundoApellido: '',
        email: '',
        contrasena: '',
        carreraNombre: '' // Cambiado a carreraNombre
    });

    const [carreras, setCarreras] = useState([]);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Cargar la lista de carreras desde el servidor
        const fetchCarreras = async () => {
            try {
                const response = await axios.get('https://0zqb1tjz-3002.use.devtunnels.ms/api/carreras/listar');
                console.log('Respuesta de la API:', response.data); // Log para verificar los datos
                if (response.data && Array.isArray(response.data.datos)) {
                    setCarreras(response.data.datos);
                    console.log('Carreras cargadas:', response.data.datos); // Log para verificar los datos
                } else {
                    console.error('La respuesta del servidor no es un array:', response.data);
                }
            } catch (error) {
                console.error('Error al cargar las carreras:', error);
            }
        };

        fetchCarreras();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validar que todos los campos obligatorios estén completos
        if (!formData.primerNombre || !formData.primerApellido || !formData.email || !formData.contrasena || !formData.carreraNombre) {
            setError('Por favor, complete todos los campos obligatorios.');
            return;
        }

        // Obtener el carreraId correspondiente al nombre de la carrera seleccionada
        const carreraSeleccionada = carreras.find(carrera => carrera.nombre_carrera === formData.carreraNombre);
        if (!carreraSeleccionada) {
            setError('Carrera no válida.');
            return;
        }

        const formDataConId = {
            ...formData,
            carreraId: carreraSeleccionada.id // Añadir carreraId al formData
        };

        try {
            const response = await axios.post('https://0zqb1tjz-3002.use.devtunnels.ms/api/estudiantes/guardar', formDataConId);
            
            if (response && response.data) {
                setMessage('Estudiante guardado correctamente');
                setError('');
                // Redirigir a otra página si es necesario
                navigate('/dashboard-estudiante');
            } else {
                setError('Error al guardar el estudiante. Por favor, inténtelo de nuevo.');
                console.error('Registro fallido: response data is undefined');
            }
        } catch (error) {
            setError('Error al guardar el estudiante. Por favor, inténtelo de nuevo.');
            console.error('Registro fallido:', error);
        }
    };

    return (
        <div className="registro-estudiante-container" style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
            <div className="registro-estudiante-box">
                <h2>Registro de Estudiante</h2>
                {error && <p className="error-message">{error}</p>}
                {message && <p className="success-message">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Primer Nombre"
                            name="primerNombre"
                            value={formData.primerNombre}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Segundo Nombre"
                            name="segundoNombre"
                            value={formData.segundoNombre}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Primer Apellido"
                            name="primerApellido"
                            value={formData.primerApellido}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Segundo Apellido"
                            name="segundoApellido"
                            value={formData.segundoApellido}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Contraseña"
                            name="contrasena"
                            value={formData.contrasena}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <select
                            className="form-control"
                            name="carreraNombre"
                            value={formData.carreraNombre}
                            onChange={handleChange}
                        >
                            <option value="">Seleccione una carrera</option>
                            {carreras.map(carrera => (
                                <option key={carrera.id} value={carrera.nombre_carrera}>
                                    {carrera.nombre_carrera}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="button-container">
                        <button type="submit">Registrar</button>
                    </div>
                </form>
                <div className="button-container">
                    <div className="or-separator">- OR -</div>
                    <button type="button" onClick={() => navigate('/')}>Volver al Login</button>
                </div>
            </div>
        </div>
    );
};

export default RegistroEstudiante;