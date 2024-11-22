import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import fondo from "../../../assets/images/fondo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import {
  UsuarioActualizarContrasena,
  UsuarioRecuperarContrasena,
} from "../../Configuracion/ApiUrls";
import { AxiosPublico } from "../../Axios/Axios";

const RecuperarContrasena = () => {
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [pin, setPin] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1); // 1: Recuperar PIN, 2: Actualizar Contraseña
  const navigate = useNavigate();

  const handleRecuperarContrasena = async (event) => {
    event.preventDefault();

    if (!recoveryEmail) {
      setError("Por favor, ingrese su correo electrónico.");
      return;
    }

    try {
      const response = await AxiosPublico.post(UsuarioRecuperarContrasena, {
        email: recoveryEmail,
      });

      setMessage("Se ha enviado un correo de recuperación.");
      setError("");
      setStep(2); // Avanza al siguiente paso
      console.log("Recovery email sent:", response.data);
    } catch (error) {
      if (error.response) {
        setError(
          error.response.data.error ||
            "Error al enviar el correo de recuperación. Por favor, inténtelo de nuevo."
        );
        console.error("Recovery email failed:", error.response.data);
      } else if (error.request) {
        setError(
          "No se recibió respuesta del servidor. Por favor, inténtelo de nuevo."
        );
        console.error("No response received:", error.request);
      } else {
        setError(
          "Error al enviar la solicitud. Por favor, inténtelo de nuevo."
        );
        console.error("Error in request setup:", error.message);
      }
      setMessage("");
    }
  };

  const handleActualizarContrasena = async (event) => {
    event.preventDefault();

    if (!recoveryEmail || !pin || !newPassword) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    try {
      const response = await AxiosPublico.post(UsuarioActualizarContrasena, {
        email: recoveryEmail,
        contrasena: newPassword,
        pin,
      });

      setMessage("Contraseña actualizada correctamente.");
      setError("");
      console.log("Password updated:", response.data);
    } catch (error) {
      if (error.response) {
        setError(
          error.response.data.error ||
            "Error al actualizar la contraseña. Por favor, inténtelo de nuevo."
        );
        console.error("Password update failed:", error.response.data);
      } else if (error.request) {
        setError(
          "No se recibió respuesta del servidor. Por favor, inténtelo de nuevo."
        );
        console.error("No response received:", error.request);
      } else {
        setError(
          "Error al enviar la solicitud. Por favor, inténtelo de nuevo."
        );
        console.error("Error in request setup:", error.message);
      }
      setMessage("");
    }
  };

  return (
<div
  className="recuperar-contrasena-container d-flex align-items-center justify-content-center"
  style={{
    backgroundImage: `url(${fondo})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
  }}
>
  <div
    className="recuperar-contrasena-box p-4 rounded shadow"
    style={{
      maxWidth: "400px",
      width: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.75)", // Fondo blanco con opacidad
    }}
  >
    <h2 className="text-center mb-4">
      {step === 1 ? "Recuperar Contraseña" : "Actualizar Contraseña"}
    </h2>
    {error && <p className="text-danger text-center">{error}</p>}
    {message && <p className="text-success text-center">{message}</p>}

    {step === 1 ? (
      <form onSubmit={handleRecuperarContrasena}>
        <div className="form-group position-relative">
          <input
            type="email"
            className="form-control"
            placeholder="Correo Electrónico"
            value={recoveryEmail}
            onChange={(e) => setRecoveryEmail(e.target.value)}
            autoComplete="email"
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
        <div className="text-center">
          <button type="submit" className="btn btn-primary mb-2" style={{ width: "300px" }}>
            Enviar
          </button>
        </div>
      </form>
    ) : (
      <form onSubmit={handleActualizarContrasena}>
        <div className="form-group position-relative">
          <input
            type="text"
            className="form-control"
            placeholder="PIN de Recuperación"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />
          <span
            className="position-absolute"
            style={{
              top: "50%",
              right: "10px",
              transform: "translateY(-50%)",
            }}
          >
            <FontAwesomeIcon icon={faKey} />
          </span>
        </div>

        <div className="form-group position-relative">
          <input
            type="password"
            className="form-control"
            placeholder="Nueva Contraseña"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
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

        <div className="text-center">
          <button type="submit" className="btn btn-primary mb-2" style={{ width: "300px" }}>
            Actualizar Contraseña
          </button>
        </div>
      </form>
    )}

    <div className="text-center my-3">
      <span className="text-muted">- OR -</span>
    </div>
    <div className="text-center">
      <button onClick={() => navigate("/")} className="btn btn-secondary" style={{ width: "300px" }}>
        Volver al Login
      </button>
    </div>
  </div>
</div>

  );
};

export default RecuperarContrasena;
