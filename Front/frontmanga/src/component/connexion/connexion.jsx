import React, { useState } from 'react';
import './connexion.css'

function Connection() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handleMotDePasseChange = (e) => {
    setMotDePasse(e.target.value);
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
        </div>
        <div>
          <button type="submit">Se connecter</button>
        </div>
      </form>
    </div>
  );
}

export default Connection;
