import { useParams } from "react-router-dom";
import axios from 'axios';
import { useUser } from "../../contexte/UserContext";
import React, { useState, useEffect } from 'react';
import './PostDetail.css'
import BurgerMenu from "../navBar/menuBurger"
import { useNavigate } from 'react-router-dom';




const PostDetail = () => {
  const { postId } = useParams();
  const { user } = useUser();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [update, setUpdate] = useState(true);
  const [deleteMessage, setDeleteMessage] = useState('')
  const [isPostEditing, setIsPostEditing] = useState(false);
  const [editedPost, setEditedPost] = useState({
    title: '',
    description: '',
  });
  const [isCommentEditing, setIsCommentEditing] = useState(false)
  const [editedComment, setEditedComment] = useState({
    idCommentary: null,
    subject: '',
  });
  const navigate = useNavigate();


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
  }, [update]);

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
      setUpdate(!update);
    } catch (error) {
      console.error('Erreur lors du post du commentaire :', error);
    }
  };
  const handlePostDelete = async () => {
    try {
      if (user && user.pseudo === post.pseudo) {
        await axios.delete(`http://localhost:3006/api/post/${postId}`);
        setDeleteMessage('Le post a été supprimé avec succès.'); 
        setTimeout(() => {
          setDeleteMessage(''); 
          navigate('/'); // Redirige vers la page d'accueil
        }, 3000); // Affiche le message pendant 3 secondes (ajuste si nécessaire)
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du post :', error);
    }
  };
  
  const handlePostEdit = () => {
    setIsPostEditing(true);
    setEditedPost({
      title: post.title,
      description: post.description,
    });
  };
  
  const handleEditCancel = () => {
    setIsPostEditing(false);
  };

  const handleEditSave = async () => {
    try {
      await axios.put(`http://localhost:3006/api/post/${postId}`, editedPost);
      setUpdate(!update);
      setIsPostEditing(false);
    } catch (error) {
      console.error('Erreur lors de la modification du post :', error);
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      await axios.delete(`http://localhost:3006/api/commentary/${commentId}`);
      setDeleteMessage('Le commentaire a été supprimé avec succès.'); 
        setDeleteMessage(''); 
        setUpdate(!update); 
    } catch (error) {
      console.error('Erreur lors de la suppression du commentaire :', error);
    }
  };
  const handleCommentEdit = (comment) => {
    setEditedComment({
      idCommentary: comment.idCommentary,
      subject: comment.subject,
      idPost : postId,
    });
    setIsCommentEditing(true);
  };
  
  const handleCommentSaveEdit = async (commentId) => {
    try {
      await axios.put(`http://localhost:3006/api/commentary/${commentId}`, {
        subject: editedComment.subject,
      });
  
      setUpdate(!update);
      setIsCommentEditing(false);
    } catch (error) {
      console.error('Erreur lors de la modification du commentaire :', error);
    }
  };
  
  const handleCommentCancelEdit = () => {
    setIsCommentEditing(false);
    setEditedComment({
      idCommentary: null,
      subject: '',
    });
  };

  return (
    <div className="post-detail-container">
      <BurgerMenu />
      {user && (
        <div className="post-detail">
          <h2> Par : {user.pseudo}</h2>
          {isPostEditing ? (
              <>
              <label htmlFor="editedTitle">Nouveau titre :</label>
                <input
                type="text"
                id="editedTitle"
                value={editedPost.title}
                onChange={(e) =>
                  setEditedPost({ ...editedPost, title: e.target.value })
                }
                />
              <label htmlFor="editedDescription">Nouveau contenu :</label>
              <textarea
                id="editedDescription"
                value={editedPost.description}
                onChange={(e) =>
                  setEditedPost({ ...editedPost, description: e.target.value })
                }
              />
              <button onClick={handleEditSave}>Enregistrer les modifications</button>
              <button onClick={handleEditCancel}>Annuler</button>
            </> 
          ) : (
            <>
              <h2>Title : {post.title}</h2>
              <p> Contenu du post: {post.description}</p>
              {user.pseudo === post.pseudo && (
                <button className="edit-post-btn" onClick={handlePostEdit}>
                  Modifier le post
                </button>
              )}
            </>
          )}
        </div>
      )}
      {user && (
        <ul className="comment-list">
          {comments.map((comment) => (
  <li key={comment.idCommentary}>
    <p>Publié le : {formatDate(comment.datePublication)}</p>
    <p>Par : {comment.pseudo}</p>
    {isCommentEditing && editedComment.idCommentary === comment.idCommentary ? (
      <>
        <label htmlFor="editedComment">Modifier le commentaire :</label>
        <textarea
          id="editedComment"
          value={editedComment.subject}
          onChange={(e) =>
            setEditedComment({
              ...editedComment,
              subject: e.target.value,
            })
          }
        />
        <button onClick={() => handleCommentSaveEdit(comment.idCommentary)}>
          Enregistrer les modifications
        </button>
        <button onClick={handleCommentCancelEdit}>Annuler</button>
      </>
    ) : (
      <>
        <p>{comment.subject}</p>
        {user && user.pseudo === comment.pseudo && (
          <>
            <button onClick={() => handleCommentEdit(comment)}>
              Modifier le commentaire
            </button>
            <button onClick={() => handleCommentDelete(comment.idCommentary)}>
              Supprimer le commentaire
            </button>
          </>
        )}
      </>
    )}
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
      <div className="post-actions">
        {user.pseudo === post.pseudo && (
          <button className="delete-post-btn" onClick={handlePostDelete}>
            Supprimer le post
          </button>
        )}
      </div>
      <span className="deletePost">{deleteMessage}</span>
    </div>
  );
};

export default PostDetail;

