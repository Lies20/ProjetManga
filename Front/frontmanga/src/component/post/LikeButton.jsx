import { useLikes } from '../../hooks/useLikes';
import { useUser } from '../../contexte/UserContext';
import './LikeButton.css';

const LikeButton = ({ postId, showCount = true, size = 'normal' }) => {
  const { user } = useUser();
  const { likeStats, toggleLike, loading } = useLikes(postId, user);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleLike();
  };

  return (
    <button 
      onClick={handleClick}
      disabled={loading || !user}
      className={`like-button ${size} ${likeStats.hasLiked ? 'liked' : ''} ${loading ? 'loading' : ''} ${!user ? 'disabled' : ''}`}
      title={!user ? 'Connectez-vous pour liker' : likeStats.hasLiked ? 'Retirer le like' : 'Liker ce post'}
    >
      <span className="like-icon">
        {likeStats.hasLiked ? '❤️' : '🤍'}
      </span>
      {showCount && (
        <span className="like-count">{likeStats.count}</span>
      )}
    </button>
  );
};

export default LikeButton;