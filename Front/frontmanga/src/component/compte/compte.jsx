import React, { useState, useEffect } from 'react';
import { useUser } from '../../contexte/UserContext';
import { useNavigate } from 'react-router-dom';
import Header from '../navBar/menuBurger.jsx';
import axios from 'axios';
import './compte.css';

function Compte() {
  const { user, updateUser, logOut } = useUser();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]); 
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPosts, setShowPosts] = useState(false);
  const [showLikedPosts, setShowLikedPosts] = useState(false);
  const [formData, setFormData] = useState({
    pseudo: user?.pseudo || '',
    email: user?.email || '',
  });

  const API_URL = import.meta.env.VITE_API_URL || 'https://projetmanga-backend.onrender.com';

  if (!user || !user.pseudo) {
    navigate('/connexion');
    return null;
  }

  const fetchUserPosts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/post`);
      const allPosts = response.data.data;
      const filteredPosts = allPosts.filter(post => post.pseudo === user.pseudo);
      setUserPosts(filteredPosts);
    } catch (error) {
      console.error('Erreur lors du chargement des posts:', error);
    }
  };

  const fetchLikedPosts = async () => {
    try {
      const likedResponse = await axios.get(`${API_URL}/api/likes/user/${user.userId}`);
      const likedPostIds = likedResponse.data.data.map(like => like.postId);
      
      if (likedPostIds.length === 0) {
        setLikedPosts([]);
        return;
      }

      const postsResponse = await axios.get(`${API_URL}/api/post`);
      const allPosts = postsResponse.data.data;
      
      const filteredLikedPosts = allPosts.filter(post => 
        likedPostIds.includes(post.idPost.toString())
      );
      
      setLikedPosts(filteredLikedPosts);
    } catch (error) {
      console.error('Erreur lors du chargement des posts likés:', error);
      setLikedPosts([]);
    }
  };

  useEffect(() => {
    if (showPosts) {
      fetchUserPosts();
    }
  }, [showPosts, user.pseudo]);

  useEffect(() => {
    if (showLikedPosts) {
      fetchLikedPosts();
    }
  }, [showLikedPosts, user.userId]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      updateUser({ ...user, ...formData });
      setIsEditing(false);
      console.log('Profil mis à jour avec succès');
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`${API_URL}/api/users/${user.userId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      
      logOut();
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la suppression du compte:', error);
    }
  };

  const togglePosts = () => {
    setShowPosts(!showPosts);
    if (!showPosts && showLikedPosts) {
      setShowLikedPosts(false);
    }
  };

  const toggleLikedPosts = () => {
    setShowLikedPosts(!showLikedPosts);
    if (!showLikedPosts && showPosts) {
      setShowPosts(false);
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

          <div className="account-actions">
            <h3>Actions du compte</h3>
            <div className="actions-list">
              <button className="action-btn">
                Changer le mot de passe
              </button>
              <button className="action-btn" onClick={togglePosts}>
                {showPosts ? 'Masquer mes publications' : 'Mes publications'}
              </button>
              <button className="action-btn" onClick={toggleLikedPosts}>
                {showLikedPosts ? 'Masquer mes likes' : 'Posts que j\'ai likés'}
              </button>
              <button 
                className="action-btn danger" 
                onClick={() => setShowDeleteConfirm(true)}
              >
                Supprimer le compte
              </button>
            </div>
          </div>

          {showDeleteConfirm && (
            <div className="delete-confirm-modal">
              <div className="delete-confirm-content">
                <h3>⚠️ Supprimer le compte</h3>
                <p>Êtes-vous sûr de vouloir supprimer définitivement votre compte ?</p>
                <p><strong>Cette action est irréversible !</strong></p>
                <div className="delete-confirm-buttons">
                  <button 
                    className="confirm-delete-btn" 
                    onClick={handleDeleteAccount}
                  >
                    Oui, supprimer
                  </button>
                  <button 
                    className="cancel-delete-btn" 
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          )}

          {showPosts && (
            <div className="user-posts">
              <h3>Mes publications ({userPosts.length})</h3>
              {userPosts.length === 0 ? (
                <p className="no-posts">Vous n'avez encore écrit aucune publication.</p>
              ) : (
                <div className="posts-list">
                  {userPosts.map((post) => (
                    <div key={post.idPost} className="post-item">
                      <h4>{post.title}</h4>
                      <p className="post-excerpt">{post.description.substring(0, 150)}...</p>
                      <div className="post-meta">
                        <span>Publié le : {new Date(post.datePublication).toLocaleDateString('fr-FR')}</span>
                        <button 
                          className="view-post-btn"
                          onClick={() => navigate(`/post-detail/${post.idPost}`)}
                        >
                          Voir le post
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {showLikedPosts && (
            <div className="user-posts">
              <h3>Posts que j'ai likés ({likedPosts.length})</h3>
              {likedPosts.length === 0 ? (
                <p className="no-posts">Vous n'avez encore liké aucune publication.</p>
              ) : (
                <div className="posts-list">
                  {likedPosts.map((post) => (
                    <div key={`liked-${post.idPost}`} className="post-item liked-post">
                      <div className="post-item-header">
                        <h4>{post.title}</h4>
                        <span className="liked-indicator">❤️</span>
                      </div>
                      <p className="post-excerpt">{post.description.substring(0, 150)}...</p>
                      <div className="post-meta">
                        <span>Par {post.pseudo} • {new Date(post.datePublication).toLocaleDateString('fr-FR')}</span>
                        <button 
                          className="view-post-btn"
                          onClick={() => navigate(`/post-detail/${post.idPost}`)}
                        >
                          Voir le post
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Compte;