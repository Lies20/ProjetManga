import React, { useState } from 'react';
import './connection.css'

function Connection() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreurMotDePasse, setErreurMotDePasse] = ('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handleMotDePasseChange = (e) => {
    setMotDePasse(e.target.value);
  }
  
  function isEmailValid(email) {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (motDePasse.length < 7 || !isEmailValid(email)) {
      if (motDePasse.length < 7) {
        setErreurMotDePasse('mot de passe invalide');
      }
      if (!isEmailValid(email)) {
        setErreurEmail('L\'adresse e-mail n\'est pas valide.');
      }
      return;
    }
  }
 
  return (
    <div>
      <h2>Connexion</h2>
      <form>
        <div>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={motDePasse}
            onChange={handleMotDePasseChange}
          />
          {erreurMotDePasse && <p className="erreur">{erreurMotDePasse}</p>}
        </div>
        <div>
          <button onSubmit={handleSubmit} type="submit">Se connecter</button>

        </div>
      </form>
    </div>
  );
}

export default Connection;
