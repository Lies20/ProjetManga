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

  const API_URL = import.meta.env.VITE_API_URL || 'https://projetmanga-backend.onrender.com';

  const handleCreateAccount = async () => {
    const newErrors = {};

    if (pseudo.trim() === '') newErrors.pseudo = 'Le pseudo est requis.';
    if (birthday.trim() === '' || !isValidDate(birthday)) newErrors.birthday = 'Veuillez entrer une date de naissance valide.';
    if (email.trim() === '') newErrors.email = 'L\'email est requis.';

    if (password.trim() === '') {
      newErrors.password = 'Le mot de passe est requis.';
    } else if (!isStrongPassword(password)) {
      newErrors.password = 'Minimum 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial.';
    }

    if (Object.values(newErrors).some((err) => err !== '')) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/users/create`, {
        pseudo, birthday, email, password,
      });

      setIsUserCreated(true);
      setPseudo(''); setBirthday(''); setEmail(''); setPassword('');
      setErrors({});
    } catch (error) {
      if (error.response?.status === 400) {
        setErrors({ email: error.response.data.message });
      } else {
        setErrors({ email: 'Erreur lors de la création du compte.' });
      }
    }
  };

  const isValidDate = (dateString) => {
    return /^\d{4}-\d{2}-\d{2}$/.test(dateString);
  };

  const isStrongPassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,;:+\-_])[A-Za-z\d@$!%*?&.,;:+\-_]{8,}$/.test(password);
  };

  const getPasswordStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[@$!%*?&.,;:+\-_]/.test(pwd)) score++;
    return score;
  };

  const strength = getPasswordStrength(password);
  const strengthColor = ['#ccc', 'red', 'orange', 'gold', 'lightgreen', 'green'][strength];
  const strengthLabel = ['Très faible', 'Faible', 'Moyen', 'Bon', 'Très bon', 'Excellent'][strength];

  return (
    <div className='signUp-container'>
      <div className="inscription-card-title"><h2>Créer un compte</h2></div>
      <div className='signUp'>
        <div className="inscription-card-img">
          <img src='../img/inscription.png' alt='logo' />
        </div>
        <div className="inscription-card">
          <form>
            <input type="text" value={pseudo} onChange={(e) => setPseudo(e.target.value)} placeholder="Pseudo" required />
            {errors.pseudo && <p className="erreur">{errors.pseudo}</p>}

            <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} required />
            {errors.birthday && <p className="erreur">{errors.birthday}</p>}

            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            {errors.email && <p className="erreur">{errors.email}</p>}

            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" required />
            {errors.password && <p className="erreur">{errors.password}</p>}

            <div style={{ height: '8px', backgroundColor: strengthColor, width: `${(strength / 5) * 100}%`, transition: '0.3s', marginBottom: '4px' }} />
            <p style={{ fontSize: '0.8em' }}>{password && `Sécurité du mot de passe : ${strengthLabel}`}</p>

            <button type="button" onClick={handleCreateAccount}>Créer le compte</button>
          </form>

          <div className="connexion-link">
            <p>Vous avez déjà un compte ? <Link to="/connexion">Connectez-vous</Link></p>
          </div>

          {isUserCreated && (
            <div className='succes-msg'>
              <p>Votre compte a été créé avec succès !</p>
              <Link to="/connexion" className="active">Connectez vous ici</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
