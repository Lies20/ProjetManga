import { useParams } from "react-router-dom";
import axios from 'axios';
import { useUser } from "../../contexte/UserContext";
import React, { useState, useEffect } from 'react';


const PostDetail = () => {
    const { postId } = useParams();
    const { user } = useUser();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
  
    useEffect(() => {
      // console.log(postId);
      const fetchPostAndComments = async () => {
        try {
          const postResponse = await axios.get(`http://localhost:3006/api/post/${postId}`);
          // console.log(postResponse);
          setPost(postResponse.data.data.shift());
  


          const commentsResponse = await axios.get(`http://localhost:3006/api/commentary/comments/post/${postId}`);
          setComments(commentsResponse.data.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchPostAndComments();
    }, []);
  
    const handleCommentSubmit = async () => {
      try {
        await axios.post(`http://localhost:3006/api/commentary/create`, {
          subject: newComment,
          // datePublication: new Date(),
          idUser: user.userId,
          idPost: postId,
          // isConnected: user.isConnected ? 1 : 0,
        });
  
        const updatedCommentsResponse = await axios.get(`http://localhost:3006/api/post/${postId}/comments`);
        setComments(updatedCommentsResponse.data);
        setNewComment(''); 
      } catch (error) {
        console.error('Erreur lors du post du commentaire :', error);
      }
    };
  
    return (
      <div>
        {user && (
          <div>
            <h2>User id : {user.userId}</h2>
            <h2>Title : {post.title}</h2>
            <p>Content : {post.description}</p>
          </div>
        )}
        {user && (
          <ul>
            {comments.map((comment) => (
              <li key={comment.idCommentary}>
                <p>{comment.subject}</p>
                <p>Par : {comment.idUser}</p>
              </li>
            ))}
          </ul>
        )}
          {user && (
          <div>
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
  