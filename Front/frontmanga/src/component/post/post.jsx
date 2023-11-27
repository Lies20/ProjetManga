import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useUser } from '../../contexte/UserContext';  // Ajout de l'import du contexte utilisateur
import './post.css';

const LatestPosts = () => {
  const { user } = useUser();  // Utilisation du contexte utilisateur
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3006/api/post');
        const sortedPosts = response.data.data.sort((a, b) => new Date(b.datePublication) - new Date(a.datePublication));
        setPosts(sortedPosts || []);
        console.log('reponse Api', response.data);
        setPosts(response.data.data || []);
      } catch (error) {
        console.error(error);
        console.log("Error details", error.response);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <section className="latest-posts">
      <div className="container">
        {user && user.pseudo && (
          <Link to="/create-post" className="create-post-btn">Créer un post</Link>
        )}
        <h2>Les Mangas Existants</h2>
        <ul>
          {posts.map((post, index) => (
            <React.Fragment key={post.id}>
              {index !== 0 && <hr />}
              <li>
                <Link to={`/posts/${post.id}`}>
                  <div>
                    <h3>{post.title}</h3>
                    <p>{post.description}</p>
                    <p>Date de publication:{formatDate(post.datePublication)}</p>
                    <p>Auteur: {post.pseudo}</p>
                  </div>
                </Link>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default LatestPosts;
