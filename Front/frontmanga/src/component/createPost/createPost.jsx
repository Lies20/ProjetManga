import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './createPost.css';
import { useUser } from '../../contexte/UserContext';


const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPostCreated, setIsPostCreated] = useState('');
  const { user, updateUser } = useUser();

  const [uploadedImages, setUploadedImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleCreatePost = async () => {
    try {
      await axios.post('http://localhost:3006/api/post/createPost', {
        title,
        description,
        idUser: user.userId,
        uploadedImages,
      });

      setIsPostCreated(true);
      setTitle('');
      setDescription('');
      setUploadedImages([]);
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
              <br/>
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
              <br/>
              <textarea
                maxLength="1000"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
          </div>
          <br />
          <button className='create-post-button' type="button" onClick={handleCreatePost}>
            Créer le post
          </button>
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
