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
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import {
  mostraAlerta,
  mostraAlertaOK,
  mostraAlertaError,
} from "../../SweetAlert/SweetAlert";
import zxcvbn from "zxcvbn";

const RegistroEstudiante = () => {
  const [formData, setFormData] = useState({
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    email: "",
    contrasena: "",
    confirmarContrasena: "",
    carreraNombre: "",
  });
  const [carreras, setCarreras] = useState([]);
  const [message] = useState("");
  const [estudianteId] = useState(null); // Estado para el ID
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarreras = async () => {
      try {
        const response = await AxiosPublico.get(ListarCarreras);
        if (response.data && Array.isArray(response.data.datos)) {
          setCarreras(response.data.datos);
        }
      } catch (error) {
        console.error("Error al cargar las carreras:", error);
      }
    };
    fetchCarreras();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

      // Validaciones para nombres y apellidos
  if (
    ["primerNombre", "segundoNombre", "primerApellido", "segundoApellido"].includes(name)
  ) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/; // Solo letras y espacios
    if (!regex.test(value)) {
      mostraAlerta("Solo se permiten letras y espacios en este campo.", "warning");
      return;
    }
  }
    setFormData({ ...formData, [name]: value });
    if (name === "contrasena") evaluatePasswordStrength(value);
  };

  

  const evaluatePasswordStrength = (password) => {
    const strength = zxcvbn(password).score;
    setPasswordStrength(strength);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.primerNombre ||
      !formData.primerApellido ||
      !formData.email ||
      !formData.contrasena ||
      !formData.carreraNombre
    ) {
      mostraAlerta(
        "Por favor, complete todos los campos obligatorios.",
        "warning"
      );
      return;
    }

      // Validar contraseña
  if (formData.contrasena.length < 6) {
    mostraAlerta("La contraseña debe tener al menos 6 caracteres.", "warning");
    return;
  }
  
    if (formData.contrasena !== formData.confirmarContrasena) {
      mostraAlerta(
        "Las contraseñas no coinciden. Por favor, inténtelo de nuevo.",
        "warning"
      );
      return;
    }



    const carreraSeleccionada = carreras.find(
      (carrera) => carrera.nombre_carrera === formData.carreraNombre
    );
    if (!carreraSeleccionada) {
      mostraAlertaError(
        "Carrera no válida. Por favor, inténtelo de nuevo.",
        "error"
      );
      return;
    }

    const formDataConId = {
      primerNombre: formData.primerNombre,
      segundoNombre: formData.segundoNombre,
      primerApellido: formData.primerApellido,
      segundoApellido: formData.segundoApellido,
      email: formData.email,
      contrasena: formData.contrasena,
      carreraId: carreraSeleccionada.id,
    };

    setLoading(true);
    try {
      const response = await AxiosPublico.post(CrearEstudiante, formDataConId);
      if (response.data && response.data.id) {
        
        mostraAlertaOK("Estudiante guardado correctamente", "success");
        navigate("/registro-matricula", {state:{ estudianteId: response.data.id }});
      } else {
        setError(
          "Error al guardar el estudiante. Por favor, inténtelo de nuevo."
        );
      }
    } catch (error) {
      console.error("Error al guardar el estudiante:", error);
      setError(
        "Error al guardar el estudiante. Por favor, inténtelo de nuevo."
        
      );
      console.log("Carrera ID: ", carreraSeleccionada.id);
      console.log("Carrera ID: ", carreraSeleccionada.id)

    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

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
      {estudianteId && (
        <div className="alert alert-success text-center">
          Estudiante registrado con ID: {estudianteId}
        </div>
      )}
      <div
        className="registro-estudiante-box p-4 rounded shadow"
        style={{
          maxWidth: "900px",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.75)",
        }}
      >
        <h2 className="text-center mb-4">Registro de Estudiante</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        {message && <p className="text-success text-center">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="row">
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
                  type={showPassword ? "text" : "password"}
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
                    right: "40px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                  onClick={toggleShowPassword}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
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
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Confirmar Contraseña"
                  name="confirmarContrasena"
                  value={formData.confirmarContrasena}
                  onChange={handleChange}
                />
                <span
                  className="position-absolute"
                  style={{
                    top: "50%",
                    right: "40px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                  onClick={toggleShowPassword}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
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
              {formData.contrasena && (
                <div className="form-group">
                  <div className="progress">
                    <div
                      className={`progress-bar ${
                        passwordStrength < 2
                          ? "bg-danger"
                          : passwordStrength < 4
                          ? "bg-warning"
                          : "bg-success"
                      }`}
                      role="progressbar"
                      style={{ width: `${(passwordStrength + 1) * 20}%` }}
                      aria-valuenow={(passwordStrength + 1) * 20}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <small className="form-text text-muted">
                    {passwordStrength < 2
                      ? "Contraseña débil"
                      : passwordStrength < 4
                      ? "Contraseña aceptable"
                      : "Contraseña fuerte"}
                  </small>
                </div>
              )}

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

          <div className="d-flex flex-column align-items-center">
            <button
              type="submit"
              className="btn btn-primary mb-2"
              style={{ width: "800px" }}
              disabled={loading}
            >
              {loading ? "Registrando..." : "Registrar"}
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
