import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './inscription.css';

const CreateAccount = () => {
  const [pseudo, setPseudo] = useState('');
  const [birthday, setBirthday] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isUserCreated, setIsUserCreated] = useState('');

  const handleCreateAccount = async () => {
    try {
      if (!isValidDate(birthday)) {
        setError('Veuillez entrer une date de naissance valide.');
        return;
      }

      const response = await axios.post('http://localhost:3006/api/users/create', {
        pseudo,
        birthday,
        email,
        password,
      });

      console.log(response.data);

      setIsUserCreated(true)
      setPseudo('');
      setBirthday('');
      setEmail('');
      setPassword('');
      setError('');
    } catch (error) {
      console.error('Erreur lors de la création du compte :', error);
      
      if (error.response.status === 400) {
        setError(error.response.data.message);
      } else {
        setError('Une erreur s\'est produite lors de la création du compte.');
      }
    }
  };

  const isValidDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return dateString.match(regex) !== null;
  };

  return (
    <div>
      <h2>Créer un compte</h2>
      <form>
        <label>Pseudo :</label>
        <input type="text" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />

        <label>Date de naissance :</label>
        <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />

        <label>Email :</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Mot de passe :</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        
        {error && <p className="erreur">{error}</p>}  

        <button type="button" onClick={handleCreateAccount}>
          Créer le compte
        </button>
      </form>
      {isUserCreated && (
        <div>
          <p>Votre compte a été créé avec succès !</p>
          <Link to="/connexion" className="active">Connectez vous ici </Link>
        </div>
      )}
    </div>
  );
};

export default CreateAccount;
