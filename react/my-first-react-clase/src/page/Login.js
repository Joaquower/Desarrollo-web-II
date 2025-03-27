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
    <div>
      <div className="containerLogin">
        <h3>Login</h3>
        <form className="formLogin" onSubmit={handleSubmit}>
          <div className="input-container">
            <p>Name</p>
            <input
              className="login-input"
              type="text"
              placeholder="User"
              name="user"
              value={user}
              onChange={handleUserChange}
            />
          </div>
          <div className="input-container">
            <p>Password</p>
            <input
              className="login-input"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="login-button-container">
            <button className="login-button" type="submit">Login</button>
          </div>
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
      alert("Invalid user or password");
    } else {
      alert("continuar");

      localStorage.setItem("token", result.accessToken);
      console.log("Token guardado en localStorage:", localStorage.getItem("token"));

      navigate("/products");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error connecting to the server");
    navigate("/");
  }
}


