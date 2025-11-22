import { useState, useEffect } from 'react';
import { Post } from '../types';
import { initializeData, savePosts } from '../utils/storage';
import PostCard from './PostCard';
import './Timeline.css';

interface TimelineProps {
  onPostsChange?: (posts: Post[]) => void;
}

const Timeline = ({ onPostsChange }: TimelineProps) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadedPosts = initializeData();
    const sortedPosts = [...loadedPosts].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setPosts(sortedPosts);
  }, []);

  const handleReaction = (postId: number, reactionEmoji: string) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const updatedReactions = post.reactions.map((reaction) => {
          if (reaction.emoji === reactionEmoji) {
            return { ...reaction, count: reaction.count + 1 };
          }
          return reaction;
        });
        return { ...post, reactions: updatedReactions };
      }
      return post;
    });
    setPosts(updatedPosts);
    savePosts(updatedPosts);
    if (onPostsChange) {
      onPostsChange(updatedPosts);
    }
  };

  if (posts.length === 0) {
    return (
      <div className="timeline-empty">
        <p>まだ投稿がありません 🎉</p>
        <p>最初の投稿をしてみよう！</p>
      </div>
    );
  }

  return (
    <div className="timeline">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onReaction={handleReaction} />
      ))}
    </div>
  );
};

export default Timeline;
