import React from 'react';
import './post.css';

const LatestPosts = () => {
  const posts = [
    {
      id: 1,
      title: 'Titre du premier post',
      description: 'Description du premier post',
      date: '02/05/2023',
    },
    {
      id: 2,
      title: 'Titre du deuxième post',
      description: 'Description du deuxième post',
      date: '01/05/2023',
    },
    {
      id: 3,
      title: 'Titre du troisième post',
      description: 'Description du troisième post',
      date: '30/04/2023',
    },
  ];

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
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default LatestPosts;
