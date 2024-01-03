import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './inscription.css';

const CreateAccount = () => {
  const [pseudo, setPseudo] = useState('');
  const [birthday, setBirthday] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    pseudo: '',
    birthday: '',
    email: '',
    password: '',
  });
  const [isUserCreated, setIsUserCreated] = useState(false);

  const handleCreateAccount = async () => {
    const newErrors = {};

    if (pseudo.trim() === '') {
      newErrors.pseudo = 'Le pseudo est requis.';
    }

    if (birthday.trim() === '' || !isValidDate(birthday)) {
      newErrors.birthday = 'Veuillez entrer une date de naissance valide.';
    }

    if (email.trim() === '') {
      newErrors.email = 'L\'email est requis.';
    }

    if (password.trim() === '') {
      
      newErrors.password = 'Le mot de passe est requis.';
    } else if (password.trim().length < 8) {
      newErrors.password = 'Le mot de passe doit avoir au moins 8 caractères.';
    }

    if (Object.values(newErrors).some((error) => error !== '')) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post('https://projet-manga.vercel.app/api/users/create', {
        pseudo,
        birthday,
        email,
        password,
      });

      setIsUserCreated(true);
      setPseudo('');
      setBirthday('');
      setEmail('');
      setPassword('');
      setErrors({});
    } catch (error) {
      if (error.response.status === 400) {
        setErrors({ email: error.response.data.message });
      } else {
        setErrors({ email: 'Une erreur s\'est produite lors de la création du compte.' });
      }
    }
  };

  const isValidDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return dateString.match(regex) !== null;
  };

  return (
    <div className='signUp-container'>
      <div className="inscription-card-title">
        <h2>Créer un compte</h2>
      </div>
      <div className='signUp'>
        <div className="inscription-card-img">
          <img src='../img/inscription.png' alt='logo' />
        </div>
        <div className="inscription-card">
          <form>
            <input
              type="text"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              placeholder="Pseudo"
              required
            />
            {errors.pseudo && <p className="erreur">{errors.pseudo}</p>}
            <input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              placeholder="Date de naissance jj/mm/aaaa"
              required
            />
            {errors.birthday && <p className="erreur">{errors.birthday}</p>}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            {errors.email && <p className="erreur">{errors.email}</p>}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              required
            />
            {errors.password && <p className="erreur">{errors.password}</p>}

            <button type="button" onClick={handleCreateAccount}>
              Créer le compte
            </button>
          </form>
          <div className="connexion-link">
            <p>
              Vous avez déjà un compte ? <Link to="/connexion">Connectez-vous</Link>{' '}
            </p>
          </div>
        </div>
        {isUserCreated && (
          <div>
            <p>Votre compte a été créé avec succès !</p>
            <Link to="/connexion" className="active">
              Connectez vous ici
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateAccount;
