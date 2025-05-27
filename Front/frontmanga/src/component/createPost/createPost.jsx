import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './createPost.css';
import { useUser } from '../../contexte/UserContext';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPostCreated, setIsPostCreated] = useState(false);
  const [error, setError] = useState('');
  const { user, updateUser } = useUser();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'https://projetmanga-backend.onrender.com';

  const handleCreatePost = async () => {
    if (!title || !description) {
      setError('Les champs "Titre" et "Description" sont obligatoires.');
      return;
    }
    try {
      await axios.post(`${API_URL}/api/post/createPost`, {
        title,
        description,
        idUser: user.userId,
      });
      setIsPostCreated(true);
      setTitle('');
      setDescription('');
      setError('');
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la création du post :', error);
    }
  };

  return (
    <div className='create-post-container'>
      <div className='create-post-title-container'>
        <h2>Créer un nouveau post</h2>
      </div>
      <div className='create-post'>
        <form>
          <div className='createpost-title'>
            <label>
              Titre :
              <br />
              <input
                maxLength="50"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
          </div>
          <div className='createpost-description'>
            <label>
              Description :
              <br />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
          </div>
          <br />
          <button className='create-post-button' type="button" onClick={handleCreatePost}>
            Créer le post
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
      {isPostCreated && (
        <div>
          <p>Le post a été créé avec succès !</p>
          <Link to="/" className="show-all-post">
            Toutes les publications
          </Link>
        </div>
      )}
    </div>
  );
};

export default CreatePost;