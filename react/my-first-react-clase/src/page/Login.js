import React from "react";
import "../style/login.css"; 

export default function Login() {
  return (
    <div className="form-container">
      <h2>Login</h2>

      <div className="form-content">
        <label htmlFor="username">Email</label>
        <input type="text" id="username" placeholder="enter your email" />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="enter your password" />
      </div>

      <button type="submit">Login</button>
    </div>
  );
}
