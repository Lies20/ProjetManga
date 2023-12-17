import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './createPost.css';
import { useUser } from '../../contexte/UserContext';
import UploadImage from '../upload/upload.jsx'

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

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div>
      <h2>Créer un nouveau post</h2>
      <form>
        <label>
          Titre :
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Description :
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
          <UploadImage/>
        <br />
        <button type="button" onClick={handleCreatePost}>
          Créer le post
        </button>
      </form>
      {isPostCreated && (
        <div>
          <p>Le post a été créé avec succès !</p>
          <Link to="/" className="active">
            Toutes les publications
          </Link>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
