import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useUser } from '../../contexte/UserContext';
import './post.css';

const LatestPosts = () => {
  const { user } = useUser();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dreamanga.alwaysdata.net/api/post');
        const sortedPosts = response.data.data.sort((a, b) => new Date(b.datePublication) - new Date(a.datePublication));
        setPosts(sortedPosts || []);
      } catch (error) {
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
    const mots50 = mots.slice(0, 30);
    const resultat = mots50.join(' ');
    return resultat;
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="latest-posts">
      {user && (
        <div className="create-post_div">
          <Link to="/create-post">
            <button className="create-post-btn">Créer un post</button>
          </Link>
        </div>
      )}
      <div className='posts-container-title'>
        <h2>Nouveautés sur Dreamangaa</h2>
      </div>
      <div className="posts-container">
        <ul>
          {currentPosts.map((post, index) => (
            <React.Fragment key={post.id}>
              {index !== 0}
              {
                <div className="post">
                  <div className="post-content">
                    <p className="post-date">Créé le : {formatDate(post.datePublication)} par <a class="post-author" href="#">{post.pseudo}</a></p>
                    <h2 className="post-title">{post.title}</h2>
                    <div className="post-excerpt">
                      <p>{reduce(post.description)}</p>
                    </div>
                    <Link className="post-link" to={`/post-detail/${post.idPost}`}>Voir plus
                    </Link>
                  </div>
                </div>
              }
            </React.Fragment>
          ))}
        </ul>
      </div>
      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Précédent</button>
        <p>Page {currentPage} sur {totalPages}</p>
        <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastPost >= posts.length}>Suivant</button>
      </div>
    </section>
  );
};

export default LatestPosts;
