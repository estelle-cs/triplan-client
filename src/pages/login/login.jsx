import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { Link } from "react-router-dom";

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else delete axios.defaults.headers.common["Authorization"];
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors({ ...errors, email: "" });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors({ ...errors, password: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setErrors({
        ...errors,
        email: "Veuillez entrer une adresse email valide",
      });
      return;
    }
    if (!password) {
      setErrors({ ...errors, password: "Veuillez entrer votre mot de passe" });
      return;
    }
    const loginInfo = { email: email, password: password };
    axios
      .post("http://localhost:3000/auth/login", loginInfo)
      .then((response) => {
        const token = response.data.access_token;
        localStorage.setItem("token", token);
        setAuthToken(token);
        window.location.href = "/dashboard";
      })
      .catch((err) => console.error(err));

    setEmail("");
    setPassword("");
    setErrors({ email: "", password: "" });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <body className="body-login">
      <div className="login-container">
        <h2 className="title-m h2-login">Connexion</h2>
        <form className="form-login" onSubmit={handleSubmit}>
          <div className="label-input-div">
            <label className="body-m label-login" htmlFor="email">
              Adresse Email:
            </label>
            <input
              type="email"
              id="email"
              className="body-s input-login"
              placeholder="Entrez votre adresse email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>
          <div className="label-input-div">
            <label className="body-m label-login" htmlFor="password">
              Mot de passe:
            </label>
            <input
              type="password"
              id="password"
              className="body-s input-login"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>
          <button className="button-submit" type="submit">
            Se connecter
          </button>
        </form>
        <div className="register-link">
          <p>
            Pas encore de compte ? <Link to="/register">Inscrivez-vous</Link>
          </p>
        </div>
      </div>
    </body>
  );
};

export default Login;
