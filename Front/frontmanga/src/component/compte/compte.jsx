import React, { useState } from 'react';
import { useUser } from '../../contexte/UserContext';
import { useNavigate } from 'react-router-dom';
import Header from '../navBar/menuBurger.jsx';
import './compte.css';

function Compte() {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    pseudo: user?.pseudo || '',
    email: user?.email || '',
    // Ajoute d'autres champs selon tes besoins
  });

  // Redirection si pas connecté
  if (!user || !user.pseudo) {
    navigate('/connexion');
    return null;
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Ici tu peux ajouter ta logique pour sauvegarder les modifications
      // Par exemple, appel API pour modifier les données utilisateur
      
      // Mise à jour du contexte utilisateur
      updateUser({ ...user, ...formData });
      setIsEditing(false);
      
      console.log('Profil mis à jour avec succès');
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  const cancelEdit = () => {
    setFormData({
      pseudo: user?.pseudo || '',
      email: user?.email || '',
    });
    setIsEditing(false);
  };

  return (
    <>
      <Header />
      <div className="compte-container">
        <div className="compte-content">
          <h1>Mon Compte</h1>
          
          <div className="user-info">
            <div className="info-header">
              <h2>Informations personnelles</h2>
              {!isEditing && (
                <button 
                  className="edit-btn" 
                  onClick={() => setIsEditing(true)}
                >
                  Modifier
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="edit-form">
                <div className="form-group">
                  <label htmlFor="pseudo">Pseudo :</label>
                  <input
                    type="text"
                    id="pseudo"
                    name="pseudo"
                    value={formData.pseudo}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email :</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-buttons">
                  <button type="submit" className="save-btn">
                    Sauvegarder
                  </button>
                  <button 
                    type="button" 
                    className="cancel-btn"
                    onClick={cancelEdit}
                  >
                    Annuler
                  </button>
                </div>
              </form>
            ) : (
              <div className="info-display">
                <div className="info-item">
                  <strong>Pseudo :</strong> {user.pseudo}
                </div>
                <div className="info-item">
                  <strong>Email :</strong> {user.email || 'Non renseigné'}
                </div>
                <div className="info-item">
                  <strong>Rôle :</strong> {user.role || 'Utilisateur'}
                </div>
              </div>
            )}
          </div>

          {/* Section pour d'autres fonctionnalités */}
          <div className="account-actions">
            <h3>Actions du compte</h3>
            <div className="actions-list">
              <button className="action-btn">
                Changer le mot de passe
              </button>
              <button className="action-btn">
                Mes publications
              </button>
              <button className="action-btn danger">
                Supprimer le compte
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Compte;