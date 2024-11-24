import React, { useState, useEffect } from 'react';
import fondo from "../../../assets/images/fondo.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUniversity, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AxiosPublico } from '../../Axios/Axios';
import { ListarAsignaturas, ListarPeriodos, CrearMatricula } from "../../Configuracion/ApiUrls";
import { useLocation, useNavigate } from 'react-router-dom';
import {
    mostraAlerta,
    mostraAlertaOK,
    mostraAlertaError,
} from "../../SweetAlert/SweetAlert";

const RegistroMatricula = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const estudianteId = location.state?.estudianteId; // Recibe el ID del estudiante desde el estado de la navegación

    const [formData, setFormData] = useState({
        estudianteId: estudianteId, // Usa el ID recibido
        periodoId: '',
        asignaturas: []
    });
    const [periodos, setPeriodos] = useState([]);
    const [asignaturas, setAsignaturas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [selectedAsignatura, setSelectedAsignatura] = useState('');

    useEffect(() => {
        const fetchPeriodos = async () => {
            try {
                const response = await AxiosPublico.get(ListarPeriodos);
                setPeriodos(Array.isArray(response.data.datos) ? response.data.datos : []);
            } catch (err) {
                console.error('Error fetching periodos:', err);
                setError('Error al cargar los periodos. Por favor, inténtelo de nuevo más tarde.');
            }
        };
        fetchPeriodos();
        
    }, []);

    useEffect(() => {
        const fetchAsignaturas = async () => {
            try {
                const response = await AxiosPublico.get(ListarAsignaturas);
                setAsignaturas(Array.isArray(response.data.datos) ? response.data.datos : []);
            } catch (err) {
                console.error('Error fetching asignaturas:', err);
                mostraAlerta(
                    "Error al cargar las asignaturas. Por favor, inténtelo de nuevo más tarde.",
                    "warning"
                );
            }
        };
        fetchAsignaturas();
    },[]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleAsignaturaChange = (e) => {
        setSelectedAsignatura(e.target.value);
    };

    const addAsignatura = () => {
        if (!selectedAsignatura) return; // Si no hay una asignatura seleccionada, no hace nada
    
        if (formData.asignaturas.includes(selectedAsignatura)) {
            // Si ya está seleccionada, muestra una alerta y no la agrega
            mostraAlerta(
                "Esta asignatura ya ha sido seleccionada.",
                "warning"
            );
            return;
        }
    
        setFormData(prevState => ({
            ...prevState,
            asignaturas: [...prevState.asignaturas, selectedAsignatura]
        }));
        setSelectedAsignatura(''); // Resetea el valor del selector
    };

    const removeAsignatura = (asignatura) => {
        setFormData(prevState => ({
            ...prevState,
            asignaturas: prevState.asignaturas.filter(a => a !== asignatura)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        // Verifica que al menos una asignatura haya sido seleccionada
        if (formData.asignaturas.length === 0) {
            mostraAlerta(
                "Debe añadir al menos una asignatura.",
                "warning"
              );
            setLoading(false);
            return;
        }

        try {
            console.log('Datos enviados:', formData);
            const response = await AxiosPublico.post(CrearMatricula, {
                estudianteId: formData.estudianteId,
                periodoId: formData.periodoId,
                asignaturas: formData.asignaturas.map(Number)  // Asegurarse de enviar los IDs como números
            });

            if (response.status === 201 || response.status === 200) {
                mostraAlertaOK("Matrícula guardada correctamente.", "success");
                setFormData({
                    estudianteId: '',
                    periodoId: '',
                    asignaturas: []
                });
                navigate("/");
            } else {
                console.error('Error al guardar la matrícula:', response);
                mostraAlertaError(
                    "Error al guardar la matrícula. Por favor, inténtelo de nuevo.",
                    "error"
                );
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.errors) {
                setError(err.response.data.errors.map(error => error.msg).join(', '));
            } else {
                setError('Error en el servidor al guardar la matrícula.');
                console.error('Error del servidor:', err);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="registro-estudiante-container d-flex align-items-center justify-content-center"
            style={{
                backgroundImage: `url(${fondo})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
            }}
        >
            <div
                className="registro-estudiante-box p-4 rounded shadow"
                style={{
                    maxWidth: "900px",
                    width: "100%",
                    backgroundColor: "rgba(255, 255, 255, 0.75)",
                }}
            >
                <h2 className="text-center mb-4">Registro de Matrícula</h2>
                {error && <p className="text-danger text-center">{error}</p>}
                {message && <p className="text-success text-center">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group position-relative">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="ID del Estudiante"
                                    name="estudianteId"
                                    value={formData.estudianteId} // Muestra el ID recibido
                                    onChange={handleChange}
                                    disabled // El ID está deshabilitado para que no lo modifique el usuario
                                />
                                <span
                                    className="position-absolute"
                                    style={{
                                        top: "50%",
                                        right: "10px",
                                        transform: "translateY(-50%)",
                                    }}
                                >
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group position-relative">
                                <select
                                    className="form-control"
                                    name="periodoId"
                                    value={formData.periodoId}
                                    onChange={handleChange}
                                >
                                    <option value="">Seleccione un periodo</option>
                                    {periodos.map(periodo => (
                                        <option key={periodo.id} value={periodo.id}>
                                            {periodo.nombre_periodo}
                                        </option>
                                    ))}
                                </select>
                                <span
                                    className="position-absolute"
                                    style={{
                                        top: "50%",
                                        right: "10px",
                                        transform: "translateY(-50%)",
                                    }}
                                >
                                    <FontAwesomeIcon icon={faUniversity} />
                                </span>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group position-relative d-flex">
                                <select
                                    className="form-control"
                                    value={selectedAsignatura}
                                    onChange={handleAsignaturaChange}
                                >
                                    <option value="">Seleccione una asignatura</option>
                                    {asignaturas.map(asignatura => (
                                        <option key={asignatura.id} value={asignatura.id}>
                                            {asignatura.nombre_asignatura}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    className="btn btn-primary ml-2"
                                    onClick={addAsignatura}
                                    disabled={!selectedAsignatura}
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </div>
                        </div>
                        <div className="col-md-12">
                            {formData.asignaturas.length > 0 && (
                                <div className="form-group">
                                    <label>Asignaturas seleccionadas:</label>
                                    <ul className="list-group">
                                        {formData.asignaturas.map(asignaturaId => {
                                            const asignatura = asignaturas.find(a => a.id === Number(asignaturaId));
                                            return asignatura ? (
                                                <li key={asignaturaId} className="list-group-item d-flex justify-content-between align-items-center">
                                                    {asignatura.nombre_asignatura}
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => removeAsignatura(asignaturaId)}
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                </li>
                                            ) : null;
                                        })}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                        <button
                            type="submit"
                            className="btn btn-primary mb-2"
                            style={{ width: "800px" }}
                            disabled={loading}
                        >
                            {loading ? "Guardando..." : "Registrar Matrícula"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistroMatricula;


