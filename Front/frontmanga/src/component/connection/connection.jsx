import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../contexte/UserContext.jsx';
import './connection.css';
import { useNavigate } from 'react-router-dom';

function Connection() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreurEmail, setErreurEmail] = useState('');
  const [erreurMotDePasse, setErreurMotDePasse] = useState('');


  const { user, updateUser } = useUser();
  const navigate = useNavigate();

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
    if (motDePasse.length < 7 ) {
      if (motDePasse.length < 7) {
        setErreurMotDePasse('Mot de passe invalide');
      }
      if (!isEmailValid(email)) {
        setErreurEmail("L'adresse e-mail n'est pas valide.");
      }
      return;
    }
try {
      const response = await axios.post('http://localhost:3006/api/users/login', {
        email: email,
        password: motDePasse,
      });

  const {userData } = response.data;
  updateUser(userData);
  
  navigate('/');

} catch (error) {
  console.log('Erreur lors de la connexion :', error);
  setErreurMotDePasse('Mot de passe invalide');

}
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email :</label>
          <input type="email" value={email} onChange={handleEmailChange} />
          {erreurEmail && <p className="erreur">{erreurEmail}</p>}
        </div>
        <div>
          <label>Mot de passe :</label>
          <input type="password" value={motDePasse} onChange={handleMotDePasseChange} />
          {erreurMotDePasse && <p className="erreur">{erreurMotDePasse}</p>}
        </div>
        <div>
          <button type="submit">Se connecter</button>
        </div>
      </form>
    </div>
  );
}

export default Connection;
