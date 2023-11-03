import React, { useState } from 'react';
import './inscription.css'

function Formulaire() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const [erreurMotDePasse, setErreurMotDePasse] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handleMotDePasseChange = (e) => {
    setMotDePasse(e.target.value);
    if (e.target.value.length < 7) {
      setErreurMotDePasse('Le mot de passe doit avoir au moins 7 caractères.');
    } else {
      setErreurMotDePasse('');
    }
  }

  const handleDateNaissanceChange = (e) => {
    setDateNaissance(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (motDePasse.length < 7) {
      setErreurMotDePasse('Le mot de passe doit avoir au moins 7 caractères.');
      return;
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
          <label>Date de naissance :</label>
          <input
            type="date"
            value={dateNaissance}
            onChange={handleDateNaissanceChange}
          />
        </div>
        <div>
          <button type="submit">Soumettre le formulaire</button>
        </div>
      </form>
    </div>
  );
}

export default Formulaire;
