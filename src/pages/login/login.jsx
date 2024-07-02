import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
 
export const setAuthToken = token => {
   if (token) {
       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
   }
   else
       delete axios.defaults.headers.common["Authorization"];
}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors({ ...errors, email: '' });
    };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors({ ...errors, password: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setErrors({ ...errors, email: 'Veuillez entrer une adresse email valide' });
      return;
    }
    if (!password) {
      setErrors({ ...errors, password: 'Veuillez entrer votre mot de passe' });
      return;
    }
    const loginInfo = {email: email, password: password};
    axios.post('http://localhost:3000/auth/login', loginInfo).then(response => {
      const token  =  response.data.access_token;
      localStorage.setItem("token", token);
      setAuthToken(token);
      //window.location.href = '/'
    })
    .catch(err => console.log(err));

    setEmail('');
    setPassword('');
    setErrors({ email: '', password: '' });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="login-container">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Adresse Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="password">Mot de passe:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  )
};

export default Login;
