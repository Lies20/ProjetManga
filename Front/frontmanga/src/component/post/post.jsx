import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useUser } from '../../contexte/UserContext';
import './post.css';

const LatestPosts = () => {
  const { user } = useUser(); 
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3006/api/post');
        const sortedPosts = response.data.data.sort((a, b) => new Date(b.datePublication) - new Date(a.datePublication));
        setPosts(sortedPosts || []);
        setPosts(response.data.data || []);
      } catch (error) {
        console.log("Error details", error.response);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  function reduce(paragraphe) {
    const mots = paragraphe.split(/\s+/);

    const mots50 = mots.slice(0, 50);

    const resultat = mots50.join(' ');

    return resultat;
}
  return (
    <section className="latest-posts">
        <Link to="/create-post">
          <button  className="create-post-btn" >Créer un post</button>
        </Link>
      <div className='posts-container-title'>
          <h2>Nouveautés sur Dreamanga</h2>
      </div>
      <div className="posts-container">
          <ul>
            {posts.map((post, index) => (
              <React.Fragment key={post.id}>
                {index !== 0 && <hr />}
                <li>
                  <Link to={`/post-detail/${post.idPost}`}>
                    <div className='posts'>
                      <img src='https://dojotaku.com/cdn/shop/articles/roronoa-zoro-one-piece.webp?v=1686739204'></img>
                      <div className='posts-info'>
                        <h3>{post.title}</h3>
                        <hr/>
                        <p>{reduce(post.description)}</p>
                        <p>Date de publication:{formatDate(post.datePublication)}</p>
                        <p>Auteur: {post.pseudo}</p>
                      </div>
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
