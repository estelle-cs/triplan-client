import React, { useState } from "react";
import "../login/login.css";
import axios from "axios";
import { Link } from "react-router-dom";

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else delete axios.defaults.headers.common["Authorization"];
};

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors({ ...errors, email: "" });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors({ ...errors, password: "" });
  };

  const handlePasswordChange2 = (e) => {
    setPassword2(e.target.value);
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
    if (password !== password2) {
      setErrors({
        ...errors,
        password: "Les mots de passe ne correspondent pas",
      });
      return;
    }
    const loginInfo = { email: email, password: password };
    axios
      .post("http://localhost:3000/auth/register", loginInfo)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          const token = response.data.access_token;
          localStorage.setItem("token", token);
          setAuthToken(token);
          window.location.href = "/";
        }
      })
      .catch((err) => console.log(err));

    setEmail("");
    setPassword("");
    setPassword2("");
    setErrors({ email: "", password: "" });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <body className="body-login">
      <div className="login-container">
        <h2 className="title-m h2-login">Inscription</h2>
        <form className="form-login" onSubmit={handleSubmit}>
          <div className="label-input-div">
            <label className="label-login body-m" htmlFor="email">
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
            <label className="label-login body-m" htmlFor="password">
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
          <div className="label-input-div">
            <label htmlFor="label-login password">
              Confirmez votre mot de passe:
            </label>
            <input
              type="password"
              id="password2"
              className="body-s input-login"
              placeholder="Entrez votre mot de passe"
              value={password2}
              onChange={handlePasswordChange2}
              required
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>
          <button className="button-submit" type="submit">
            S'inscrire
          </button>
        </form>
        <div className="register-link">
          <p>
            Déja un compte ? <Link to="/login">Connectez-vous</Link>
          </p>
        </div>
      </div>
    </body>
  );
};

export default Register;
