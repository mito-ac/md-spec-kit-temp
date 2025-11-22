import { Post } from '../types';
import ReactionButton from './ReactionButton';
import './PostCard.css';

interface PostCardProps {
  post: Post;
  onReaction: (postId: number, reactionEmoji: string) => void;
}

const PostCard = ({ post, onReaction }: PostCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}分前`;
    if (hours < 24) return `${hours}時間前`;
    return `${days}日前`;
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <span className="user-icon">{post.userIcon}</span>
        <div className="user-info">
          <span className="user-name">{post.userName}</span>
          <span className="post-time">{formatDate(post.createdAt)}</span>
        </div>
      </div>
      <div className="post-emojis">
        {post.emojis.map((emoji, index) => (
          <span key={index} className="emoji">
            {emoji}
          </span>
        ))}
      </div>
      <div className="reactions-area">
        {post.reactions.map((reaction) => (
          <ReactionButton
            key={reaction.emoji}
            emoji={reaction.emoji}
            count={reaction.count}
            onClick={() => onReaction(post.id, reaction.emoji)}
          />
        ))}
      </div>
    </div>
  );
};

export default PostCard;
