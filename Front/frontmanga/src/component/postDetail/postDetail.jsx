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
    datePublication: '', 
    idUser: '',
  });
  const [showPostActions, setShowPostActions] = useState(false);

  const handleToggleActions = () => {
    setShowPostActions(!showPostActions);
  };
  
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
          navigate('/'); 
        }, 3000); 
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
      datePublication: comment.datePublication, 
      idUser: comment.idUser,
      idPost: comment.idPost, 
    });
    setIsCommentEditing(true);
  };
  
  
  const handleCommentSaveEdit = async (commentId) => {
    try {
      await axios.put(`http://localhost:3006/api/commentary/${commentId}`, {
        subject: editedComment.subject,
        datePublication: new Date(), 
        idUser: editedComment.idUser,
        idPost: editedComment.idPost,
      });
      
      console.log("datePublication", editedComment.datePublication);
      console.log("idUser", editedComment.idUser);

      setUpdate(!update);
      setIsCommentEditing(false);
    } catch (error) {
      console.error('Erreur lors de la modification du commentaire :', error);
    }
  };
  
  
  
  const handleCommentCancelEdit = () => {
    setIsCommentEditing(false);
    setEditedComment({
      idCommentary: '',
      subject: '',
    });
  };

  return (
    <div className="post-detail-container">
      <BurgerMenu />
      <div className="postBody">
      <h2 className="post-title"> Titre du post : {post.title}</h2>

        <div className="post-detail">
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
              {/* <button onClick={handleEditSave}>Enregistrer les modifications</button>
              <button onClick={handleEditCancel}>Annuler</button> */}
              <div className="dropdown">
              <div className="post-actions">
                <button className="button-edit" onClick={handleEditSave}>
                Enregistrer
                </button>
                <button className="button-delete" onClick={handleEditCancel}>
                Annuler
                </button>
              </div> 
              </div>
              
            </> 
          ) : (
            <>
          <div className="postDetail-card">
            <img src='https://dojotaku.com/cdn/shop/articles/roronoa-zoro-one-piece.webp?v=1686739204'></img>
              <p> Fait par : {post.pseudo}</p>
              <p> Fait le : {formatDate(post.datePublication)}</p>
              <hr></hr>
              <p> Contenu du post: {post.description}</p>
              {user.pseudo === post.pseudo && (
                <>
            <div className="dropdown">
              <div className="post-actions">
                <button className="button-edit" onClick={handlePostEdit}>
                  Modifier
                </button>
                <button className="button-delete" onClick={handlePostDelete}>
                  Supprimer
                </button>
              </div>
            </div>
              </>
              )}
          </div>
            </>
          )}
        </div>
        <div className="commentBody">
        {user && (
          <ul className="comment-list">
            {comments.map((comment) => (
            <li key={comment.idCommentary}>
      <p>Publié le : {formatDate(comment.datePublication)}</p>
      <p>Par : {comment.pseudo}</p>
      <hr/>
      {isCommentEditing && editedComment.idCommentary === comment.idCommentary ? (
        <div className="editing">
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
          <div className="dropdown">
              <button className="button-delete"nClick={handleCommentCancelEdit}>
                Supprimer
              </button>
              <button className="button-edit" onClick={() => handleCommentSaveEdit(comment.idCommentary)}>
                Modifier
              </button>
            </div>
        </div>
      ) : (
        <>
          <p>{comment.subject}</p>
          {user && user.pseudo === comment.pseudo && (
            <div className="dropdown">
              <button className="button-delete" onClick={() => handleCommentDelete(comment.idCommentary)}>
                Supprimer
              </button>
              <button className="button-edit" onClick={() => handleCommentEdit(comment)}>
                Modifier
              </button>
            </div>
          )}
        </>
      )}
            </li>
              ))}
          </ul>
        )}  
      </div>
      </div>
      {user && (
        <div className="comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button className="new-comment" onClick={handleCommentSubmit}>Poster un commentaire</button>
        </div>
      )}
      <div className="post-actions">
        {/* {user.pseudo === post.pseudo && (
          <button className="delete-post-btn" onClick={handlePostDelete}>
            Supprimer le post
          </button>
        )} */}
      </div>
      <span className="deletePost">{deleteMessage}</span>
    </div>
  );
};

export default PostDetail;

