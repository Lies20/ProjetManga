import { useState, useEffect } from 'react';
import axios from 'axios';

export const useLikes = (postId, user) => {
  const [likeStats, setLikeStats] = useState({
    count: 0,
    hasLiked: false
  });
  const [loading, setLoading] = useState(false);
  
  const API_URL = import.meta.env.VITE_API_URL || 'https://projetmanga-backend.onrender.com';

  useEffect(() => {
    if (postId) {
      loadLikeStats();
    }
  }, [postId, user]);

  const loadLikeStats = async () => {
    try {
      const userId = user?.userId || null;
      const response = await axios.get(`${API_URL}/api/likes/${postId}/stats${userId ? `?userId=${userId}` : ''}`);
      setLikeStats(response.data.data);
    } catch (error) {
      console.error('Erreur lors du chargement des likes:', error);
    }
  };

  const toggleLike = async () => {
    if (loading || !user) return;
    
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/likes/${postId}/toggle`, {
        userId: user.userId
      });
      
      if (response.data.state === 'success') {
        setLikeStats(response.data.data.stats);
      }
    } catch (error) {
      console.error('Erreur lors du toggle like:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    likeStats,
    toggleLike,
    loading
  };
};