import "../style/login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUserChange = (e) => {
    setUser(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Usuario ingresado:", user);
    console.log("Contraseña ingresada:", password);

    const data = {
      username: user,
      password: password,
      expiresInMins: 60
    };

    console.log("Datos enviados al fetch:", data);

    await fetchLogin(data, navigate);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h3>Iniciar Sesión</h3>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Usuario"
              value={user}
              onChange={handleUserChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit" className="login-button">Acceder</button>
        </form>
      </div>
    </div>
  );
}

async function fetchLogin(data, navigate) {
  try {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Respuesta de la API:", result);

    if (!result.accessToken) {
      alert("Usuario o contraseña incorrectos");
    } else {
      alert("¡Bienvenido!");

      localStorage.setItem("token", result.accessToken);
      console.log("Token guardado en localStorage:", localStorage.getItem("token"));

      navigate("/products");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error al conectar con el servidor");
    navigate("/");
  }
}
