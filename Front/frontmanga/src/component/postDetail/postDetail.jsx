import { useParams } from "react-router-dom";
import axios from 'axios';
import { useUser } from "../../contexte/UserContext";
import React, { useState, useEffect } from 'react';
import './postDetail.css'
import BurgerMenu from "../navBar/menuBurger"
import { useNavigate } from 'react-router-dom';
import LikeButton from '../post/LikeButton';

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

  const API_URL = 'http://localhost:3006' || 'https://projetmanga-backend.onrender.com';

  const handleToggleActions = () => {
    setShowPostActions(!showPostActions);
  };
  
  const navigate = useNavigate();

  const fetchPostAndComments = async () => {
    try {
      const postResponse = await axios.get(`${API_URL}/api/post/${postId}`);
      if(!postResponse.data){
        navigate('/')
      }
      setPost(postResponse.data.data.shift());
      const commentsResponse = await axios.get(`${API_URL}/api/commentary/comments/post/${postId}`);
      setComments(commentsResponse.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchPostAndComments();
  }, [update]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const handleCommentSubmit = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/commentary/create`, {
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
        await axios.delete(`${API_URL}/api/post/${postId}`);
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
  
  const handleEditCancel = () => {
    setIsPostEditing(false);
  };
  
  const handlePostEdit = () => {
    setIsPostEditing(true);
    setEditedPost({
      title: post.title,
      description: post.description,
    });
  };
  
  const handleEditSave = async () => {
    try {
      await axios.put(`${API_URL}/api/post/${postId}`, editedPost);
      setUpdate(!update);
      setIsPostEditing(false);
    } catch (error) {
      console.error('Erreur lors de la modification du post :', error);
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      await axios.delete(`${API_URL}/api/commentary/${commentId}`);
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
      await axios.put(`${API_URL}/api/commentary/${commentId}`, {
        subject: editedComment.subject,
        datePublication: new Date(), 
        idUser: editedComment.idUser,
        idPost: editedComment.idPost,
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
      idCommentary: '',
      subject: '',
    });
  };

  useEffect(()=>{
  }, [user])
  
  const deleteAdmin = async (id)=>{
    const req = await axios.delete(`${API_URL}/api/admin/${postId}`, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    });
    navigate('/')
  }

  const deleteCommentaryAdmin = async (id)=>{
    const req = await axios.delete(`${API_URL}/api/admin/comment/${id}`, {
      headers:{
        Authorization: `Bearer ${user.token}`
      }
    })
    if(req.data.success){
      fetchPostAndComments();
    }
  }

  return (
    <div className="post-detail-container">
      <BurgerMenu />
      <div className="updatepostBody">
        <div className="post-header">
          <h2 className="new-post-title"> Titre du post : {post.title}</h2>
          <LikeButton postId={postId} size="normal" />
        </div>

        <div className="new-post-details">
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
              <div className="post-actions">
                <button className="button-cancel" onClick={handleEditCancel}>
                Annuler
                </button>
                <button className="button-save" onClick={handleEditSave}>
                Enregistrer
                </button>
              </div> 
              
            </> 
            ) : (
              <>
            <div className="postDetail-card">
              <div className="post-details">
                <div className="post-content">
                  <p className="post-date">Créé le : {formatDate(post.datePublication)} par <a class="post-author" href="#">{post.pseudo}</a></p>
                  <div className="post-description" style={{ whiteSpace: 'pre-line' }}>
                    <p>{post.description}</p>
                  </div>
                </div>
              </div>
                {user && (user.pseudo === post.pseudo && user.role != "admin" ) && (
                  <>
                  <div className="post-actions">
                    <button className="button-edit" onClick={handlePostEdit}>
                      Modifier
                    </button>
                    <button className="button-delete" onClick={handlePostDelete}>
                      Supprimer
                    </button>
                  </div>
                </>
              )}
          </div>
            </>
          )}
                {user.role === "admin" && (
                                <div className="dropdown">
                                <div className="post-actions">
                                <button className="button-delete" onClick={()=>{deleteAdmin(post.idPost)}
                  }>
                    supprimer
                    </button>
                                </div>
                                </div>
                )}
        </div>
        <div className="comment-form-list">
          <ul className="comment-list">
            {comments && comments?.map((comment) => (
            <li key={comment.idCommentary}>
              <p className="comment-author">{comment.pseudo} <a className="comment-date"> - {formatDate(comment.datePublication)}</a></p>
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
                  <div className="post-actions">
                    <button className="button-delete" onClick={handleCommentCancelEdit}>
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
                    {user && (user.pseudo === comment.pseudo || user.role === "admin") && (
                      <div className="comment-actions">
                        <button className="comment-button-delete" onClick={() => handleCommentDelete(comment.idCommentary)}>
                          Supprimer
                        </button>
                        <button className="comment-button-edit" onClick={() => handleCommentEdit(comment)}>
                          Modifier
                        </button>
                      </div>
                    )}
                  </>
                )}
            </li>
              ))}
          </ul>
          
        </div>
      </div>
      {user && (
        <div className="comment-form">
          <textarea
            placeholder="Ajouter un commentaire ..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button className="new-comment" onClick={handleCommentSubmit}>Poster un commentaire</button>
        </div>
      )}
      <span className="deletePost">{deleteMessage}</span>
    </div>
  );
};

export default PostDetail;