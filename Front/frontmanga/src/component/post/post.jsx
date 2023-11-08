import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './post.css';

const LatestPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('/api/posts')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
        console.log("hihih",posts)
      });
  }, []);

  return (
    <section className="latest-posts">
      <div className="container">
        <h2>Les derniers posts</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <a href="#">
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <span className="date">{post.date}</span>
                <span className="author">Posté par {post.pseudo}</span>
                <span className="rubrique">Rubrique : {post.rubrique}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default LatestPosts;

