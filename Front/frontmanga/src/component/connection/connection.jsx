import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../../contexte/UserContext.jsx';
import './connection.css';
import { useNavigate, Link } from 'react-router-dom';

function Connection() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreurEmail, setErreurEmail] = useState('');
  const [erreurMotDePasse, setErreurMotDePasse] = useState('');
  const { updateUser } = useUser();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'https://projetmanga-backend.onrender.com';

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErreurEmail('');
  };

  const handleMotDePasseChange = (e) => {
    setMotDePasse(e.target.value);
    setErreurMotDePasse('');
  };

  function isEmailValid(email) {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (motDePasse.length < 7 || !isEmailValid(email)) {
      if (motDePasse.length < 7) {
        setErreurMotDePasse('Mot de passe invalide');
      }
      if (!isEmailValid(email)) {
        setErreurEmail("L'adresse e-mail n'est pas valide.");
      }
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/users/login`, {
        email: email,
        password: motDePasse,
      });

      const { userData } = response.data;
      localStorage.setItem('token', userData.token);
      updateUser(userData);
      navigate('/');
    } catch (error) {
      setErreurMotDePasse('Mot de passe invalide');
    }
  };

  return (
    <div className='login-container'>
      <div className="connexion-card-title">
        <h2>Se connecter</h2>
      </div>
      <div className="login">
        <div className="connexion-card-img">
          <img src='../img/login.png' alt='logo' />
        </div>
        <div className="connexion-card">
          <form onSubmit={handleSubmit}>
            <p>Veuillez vous connecter à votre compte</p>
            <div>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Votre adresse mail"
              />
              {erreurEmail && <p className="erreur">{erreurEmail}</p>}
            </div>
            <div>
              <input
                type="password"
                value={motDePasse}
                onChange={handleMotDePasseChange}
                placeholder="Votre mot de passe"
              />
              {erreurMotDePasse && <p className="erreur">{erreurMotDePasse}</p>}
            </div>
            <button type="submit" className='btn-connexion'>Connexion</button>
          </form>
          <div className="inscription-link">
            <p>
              Vous n'avez pas de compte ? <Link to="/inscription">Inscrivez-vous</Link>
              <span className="separator"> | </span>
              <Link to="/mot-de-passe-oublie">Mot de passe oublié ?</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Connection;
