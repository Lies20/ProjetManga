import { useParams } from "react-router-dom";
import axios from 'axios';
import { useUser } from "../../contexte/UserContext";
import React, { useState, useEffect } from 'react';
import './PostDetail.css'
import BurgerMenu from "../navBar/menuBurger"



const PostDetail = () => {
    const { postId } = useParams();
    const { user } = useUser();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
  
    useEffect(() => {
      const fetchPostAndComments = async () => {
        try {
          const postResponse = await axios.get(`http://localhost:3006/api/post/${postId}`);
          setPost(postResponse.data.data.shift());
  
          const commentsResponse = await axios.get(`http://localhost:3006/api/commentary/comments/post/${postId}`);
          setComments(commentsResponse.data.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchPostAndComments();
    }, [comments]);

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('fr-FR', options);
    };
  
    const handleCommentSubmit = async () => {
      try {
        const response = await axios.post(`http://localhost:3006/api/commentary/create`, {
          subject: newComment,
          idUser: user.userId,
          idPost: postId,
        });
    
        const newCommentData = response.data.data;
    
        setComments([...comments, newCommentData]);
    
        setNewComment('');
      } catch (error) {
        console.error('Erreur lors du post du commentaire :', error);
      }
    };
  
    return (
      <div className="post-detail-container">
        <BurgerMenu/>
        {user && (
          <div className="post-detail">
            <h2> Par : {user.pseudo}</h2>
            <h2>Title : {post.title}</h2>
            <p> Contenue du post: {post.description}</p>
          </div>
        )}
        {user && (
          <ul className="comment-list">
            {comments.map((comment) => (
              <li key={comment.idCommentary}>
                <p>Publié le :{formatDate(comment.datePublication)}</p>
                <p>Par : {user.pseudo}</p>
                <p>{comment.subject}</p>
              </li>
            ))}
          </ul>
        )}
          {user && (
          <div className="comment-form">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={handleCommentSubmit}>Poster un commentaire</button>
          </div>
        )}
      </div>
    );
  };
  
  export default PostDetail;
  