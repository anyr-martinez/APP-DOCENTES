import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import fondo from "../../../assets/images/fondo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import {
  UsuarioActualizarContrasena,
  UsuarioRecuperarContrasena,
} from "../../Configuracion/ApiUrls";
import { AxiosPublico } from "../../Axios/Axios";
import {
  mostraAlertaOK,
  mostraAlertaError,
} from "../../SweetAlert/SweetAlert";
import zxcvbn from "zxcvbn";

const RecuperarContrasena = () => {
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pin, setPin] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1); // 1: Recuperar PIN, 2: Actualizar Contraseña
  const navigate = useNavigate();
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const handleRecuperarContrasena = async (event) => {
    event.preventDefault();

    if (!recoveryEmail) {
      setError("Por favor, ingrese su correo electrónico.");
      mostraAlertaError(
        "Ingrese el correo electronico. Por favor, inténtelo de nuevo.",
        "error"
      );
      return;
    }

    try {
      const response = await AxiosPublico.post(UsuarioRecuperarContrasena, {
        email: recoveryEmail,
      });

      mostraAlertaOK("Se ha enviado el correo de recuperacion", "success");

      setError("");
      setStep(2); // Avanza al siguiente paso
      console.log("Recovery email sent:", response.data);
    } catch (error) {
      if (error.response) {
        setError(
          error.response.data.error ||
          mostraAlertaError(
            "Error al enviar el correo electronico. Por favor, inténtelo de nuevo.",
            "error"
          )
        );
        
        console.error("Recovery email failed:", error.response.data);
      } else if (error.request) {
        mostraAlertaError(
          "No se recibio respuesta del servidor. Por favor, inténtelo de nuevo.",
          "error"
        );
        console.error("No response received:", error.request);
      } else {
        mostraAlertaError(
          "Error al enviar la solicitud. Por favor, inténtelo de nuevo.",
          "error"
        );
        console.error("Error in request setup:", error.message);
      }
      setMessage("");
    }
  };

  const handleActualizarContrasena = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      mostraAlertaError(
        "Las contraseñas no coinciden. Por favor, inténtelo de nuevo.",
        "error"
      );
      return;
    }

    if (!recoveryEmail || !pin || !newPassword) {
      mostraAlertaError(
        "Por favor complete todos los campos, inténtelo de nuevo.",
        "error"
      );
      return;
    }

    try {
      const response = await AxiosPublico.post(UsuarioActualizarContrasena, {
        email: recoveryEmail,
        contrasena: newPassword,
        pin,
      });

      mostraAlertaOK("Contraseña actualizada correctamente.", "success");
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

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setNewPassword(password);
    const strength = zxcvbn(password).score;
    setPasswordStrength(strength);
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
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Nueva Contraseña"
                value={newPassword}
                onChange={handlePasswordChange}
                autoComplete="new-password"
              />
              <span
                className="position-absolute"
                style={{
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>

            {newPassword && (
              <div className="form-group">
                <div className="progress">
                  <div
                    className={`progress-bar ${
                      passwordStrength < 2 ? "bg-danger" : passwordStrength < 4 ? "bg-warning" : "bg-success"
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
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Confirmar Contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
              />
              <span
                className="position-absolute"
                style={{
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary mb-2" style={{ width: "300px" }}>
                Actualizar Contraseña
              </button>
            </div>
          </form>
        )}

        <div className="text-center mt-2">
          <button
            className="btn btn-secondary mt-2"
            style={{ width: "300px" }}
            onClick={() => navigate("/")}
          >
            Regresar al Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecuperarContrasena;
