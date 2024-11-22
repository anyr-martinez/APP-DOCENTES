import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fondo from "../../../assets/images/fondo.jpg";
import { ListarCarreras, CrearEstudiante } from "../../Configuracion/ApiUrls";
import { AxiosPublico } from "../../Axios/Axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faUniversity,
} from "@fortawesome/free-solid-svg-icons";

const RegistroEstudiante = () => {
  const [formData, setFormData] = useState({
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    email: "",
    contrasena: "",
    carreraNombre: "", // Cambiado a carreraNombre
  });

  const [carreras, setCarreras] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar la lista de carreras desde el servidor
    const fetchCarreras = async () => {
      try {
        const response = await AxiosPublico.get(ListarCarreras);
        console.log("Respuesta de la API:", response.data); // Log para verificar los datos
        if (response.data && Array.isArray(response.data.datos)) {
          setCarreras(response.data.datos);
          console.log("Carreras cargadas:", response.data.datos); // Log para verificar los datos
        } else {
          console.error(
            "La respuesta del servidor no es un array:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error al cargar las carreras:", error);
      }
    };

    fetchCarreras();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar que todos los campos obligatorios estén completos
    if (
      !formData.primerNombre ||
      !formData.primerApellido ||
      !formData.email ||
      !formData.contrasena ||
      !formData.carreraNombre
    ) {
      setError("Por favor, complete todos los campos obligatorios.");
      return;
    }

    // Obtener el carreraId correspondiente al nombre de la carrera seleccionada
    const carreraSeleccionada = carreras.find(
      (carrera) => carrera.nombre_carrera === formData.carreraNombre
    );
    if (!carreraSeleccionada) {
      setError("Carrera no válida.");
      return;
    }

    const formDataConId = {
      ...formData,
      carreraId: carreraSeleccionada.id, // Añadir carreraId al formData
    };

    try {
      const response = await AxiosPublico.post(CrearEstudiante, formDataConId);

      if (response && response.data) {
        setMessage("Estudiante guardado correctamente");
        setError("");
        // Redirigir a otra página si es necesario
        navigate("/dashboard-estudiante");
      } else {
        setError(
          "Error al guardar el estudiante. Por favor, inténtelo de nuevo."
        );
        console.error("Registro fallido: response data is undefined");
      }
    } catch (error) {
      setError(
        "Error al guardar el estudiante. Por favor, inténtelo de nuevo."
      );
      console.error("Registro fallido:", error);
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
          backgroundColor: "rgba(255, 255, 255, 0.75)", // Fondo blanco con opacidad
        }}
      >
        <h2 className="text-center mb-4">Registro de Estudiante</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        {message && <p className="text-success text-center">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Primera columna */}
            <div className="col-md-6">
              <div className="form-group position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Primer Nombre"
                  name="primerNombre"
                  value={formData.primerNombre}
                  onChange={handleChange}
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
              <div className="form-group position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Segundo Nombre"
                  name="segundoNombre"
                  value={formData.segundoNombre}
                  onChange={handleChange}
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
              <div className="form-group position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Primer Apellido"
                  name="primerApellido"
                  value={formData.primerApellido}
                  onChange={handleChange}
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
              <div className="form-group position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Segundo Apellido"
                  name="segundoApellido"
                  value={formData.segundoApellido}
                  onChange={handleChange}
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

            {/* Segunda columna */}
            <div className="col-md-6">
              <div className="form-group position-relative">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <span
                  className="position-absolute"
                  style={{
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                  }}
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
              </div>
              <div className="form-group position-relative">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  name="contrasena"
                  value={formData.contrasena}
                  onChange={handleChange}
                />
                <span
                  className="position-absolute"
                  style={{
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                  }}
                >
                  <FontAwesomeIcon icon={faLock} />
                </span>
              </div>
              <div className="form-group position-relative">
                <select
                  className="form-control"
                  name="carreraNombre"
                  value={formData.carreraNombre}
                  onChange={handleChange}
                >
                  <option value="">Seleccione una carrera</option>
                  {carreras.map((carrera) => (
                    <option key={carrera.id} value={carrera.nombre_carrera}>
                      {carrera.nombre_carrera}
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
          </div>

          {/* Botones */}
          <div className="d-flex flex-column align-items-center">
            <button
              type="submit"
              className="btn btn-primary mb-2"
              style={{ width: "800px" }}
            >
              Registrar
            </button>
            <span className="text-muted mb-2">- OR -</span>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="btn btn-secondary"
              style={{ width: "800px" }}
            >
              Volver al Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistroEstudiante;
