import React, { useState } from 'react';
import './inscription.css'

function Formulaire() {
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const [erreurMotDePasse, setErreurMotDePasse] = useState('');
  const [erreurEmail, setErreurEmail] = useState('');
  const [erreurDateNaissance, setErreurDateNaissance] = useState('');
  const [erreurPseudo, setErreurPseudo] = useState('');

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

  const handlePseudoChange = (e) => {
    setPseudo(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (motDePasse.length < 7 || !isEmailValid(email)) {
      if (motDePasse.length < 7) {
        setErreurMotDePasse('Le mot de passe doit avoir au moins 7 caractères.');
      }
      if (!isEmailValid(email)) {
        setErreurEmail('L\'adresse e-mail n\'est pas valide.');
      }
      if (!dateNaissance) {
        setErreurDateNaissance('Veuillez renseigner votre date de naissance.');
      }
      if (!pseudo) {
        setErreurPseudo('Veuillez choisir un pseudo.');
      }
      return;
    }
  }

  function isEmailValid(email) {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  }

  return (
      <form onSubmit={handleSubmit} className='form_signup'>
        <div className='input-container'>
          <label>Pseudo :</label>
          <input
            type="text"
            value={pseudo}
            onChange={handlePseudoChange}
          />
          {erreurPseudo && <p className="erreur">{erreurPseudo}</p>}
        </div>
        <div className='input-container'>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
          {erreurEmail && <p className="erreur">{erreurEmail}</p>}
        </div>
        <div className='input-container'>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={motDePasse}
            onChange={handleMotDePasseChange}
          />
          {erreurMotDePasse && <p className="erreur">{erreurMotDePasse}</p>}
        </div>
        <div className='input-container'>
           <label>Date de naissance :</label>
          <input
            type="date"
            value={dateNaissance}
            onChange={handleDateNaissanceChange}
          /> 
          {erreurDateNaissance && <p className="erreur">{erreurDateNaissance}</p>}
        </div>
        <div >
          <button className='submit' type="submit">S'inscrire</button>
        </div>
      </form>
  );
}

export default Formulaire;
