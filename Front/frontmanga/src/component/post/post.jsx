import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './post.css';

const LatestPosts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error(error.response);
        setError('Une erreur s\'est produite lors du chargement des derniers posts.');
      }
    };

    fetchData();
  }, []); // Le tableau vide signifie que cela ne dépend d'aucune dépendance et ne doit être exécuté qu'une seule fois

  return (
    <section className="latest-posts">
      <div className="container">
        <h2>Les derniers posts</h2>
        {error && <p>{error}</p>}
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <div>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <span className="date">{post.date}</span>
                <span className="author">Posté par {post.pseudo}</span>
                <span className="rubrique">Rubrique : {post.rubrique}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default LatestPosts;
