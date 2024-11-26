import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import fondo from "../../assets/images/fondo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { UsuarioIniciarSesion } from "../Configuracion/ApiUrls";
import { AxiosPublico } from "../Axios/Axios";
import {
  mostraAlerta,
  mostraAlertaOK,
  mostraAlertaError,
} from "../SweetAlert/SweetAlert";
import { UsuarioContext } from "../Contexto/usuario/UsuarioContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { setLogin, setCerrarSesion, setNombre } = useContext(UsuarioContext);
  const [nombre_usuario, setNombreUsuario] = useState(null);

  useEffect(() => {
    // Al acceder a la página de inicio de sesión, cerrar sesión y eliminar el token
    setCerrarSesion();
  }, [setCerrarSesion]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      mostraAlerta("Por favor, complete todos los campos.", "warning");
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
        setNombre(Usuario.nombre);

        if (Usuario.tipo === "Estudiante") {
          navigate("/dashboard-estudiante", { state: { nombre: Usuario.nombre}});
        } else if (Usuario.tipo === "Docente") {
          navigate("/dashboard-docente");
        } else {
          navigate("/dashboard");
        }

        console.log("Login successful:", response.data);
        mostraAlertaOK("Inicio de sesión exitoso", "success");
      } else {
        console.error("Login failed: response data is undefined");
        mostraAlertaError(
          "Error en el inicio de sesión. Por favor, inténtelo de nuevo.",
          "error"
        );
      }
    } catch (error) {
      setError("Error en el inicio de sesión. Por favor, inténtelo de nuevo.");
      console.error("Login failed:", error);
      mostraAlertaError(
        "Contraseña o Correo electronico incorrecto. Por favor, inténtelo de nuevo.",
        "error"
      );
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center bg-light"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <div
        className="p-4 rounded shadow"
        style={{
          maxWidth: "400px",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.75)", // Fondo blanco con opacidad
        }}
      >
        <h2 className="text-center mb-4">Inicio de Sesión</h2>

        {error && <p className="text-danger text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="form-group position-relative">
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
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

          {/* Password Input */}
          <div className="form-group position-relative">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
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

          {/* Sign In Button */}
          <button type="submit" className="btn btn-primary btn-block">
            Sign In
          </button>

          {/* Separator */}
          <div className="text-center my-3 position-relative">
            <span className="text-muted">- OR -</span>
            <hr
              className="position-absolute"
              style={{
                top: "50%",
                left: "0",
                width: "40%",
                transform: "translateY(-50%)",
              }}
            />
            <hr
              className="position-absolute"
              style={{
                top: "50%",
                right: "0",
                width: "40%",
                transform: "translateY(-50%)",
              }}
            />
          </div>

          {/* Forgot Password */}
          <Link
            to="/recuperar-contrasena"
            className="btn btn btn-info btn-block mb-2"
          >
            Olvidé la Contraseña
          </Link>

          {/* Create Account */}
          <Link to="/registro-estudiante" className="btn btn-info btn-block">
            Crear Cuenta
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
