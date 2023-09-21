import React from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { database } from "../component/firebaseconfi.js";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    try {
      await database.sendPasswordResetEmail(email);
      setMessage("Se ha enviado un correo electrónico de restablecimiento de contraseña. Por favor, verifica tu bandeja de entrada.");
    } catch (error) {
      setMessage("Hubo un error al enviar el correo electrónico de restablecimiento de contraseña. Asegúrate de que la dirección de correo electrónico sea válida.");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <p>Ingresa tu dirección de correo electrónico para restablecer tu contraseña.</p>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleResetPassword}>Enviar correo de restablecimiento</button>
      <p>{message}</p>
    </div>
  );
};

export default ForgotPassword;
