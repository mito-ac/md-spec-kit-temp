import { Post } from '../types';
import initialPosts from '../data/posts.json';

const STORAGE_KEY = 'emojilink_posts';

export const savePosts = (posts: Post[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch (error) {
    console.error('Failed to save posts to localStorage:', error);
  }
};

export const loadPosts = (): Post[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return [];
  } catch (error) {
    console.error('Failed to load posts from localStorage:', error);
    return [];
  }
};

export const initializeData = (): Post[] => {
  const existingPosts = loadPosts();
  if (existingPosts.length === 0) {
    const posts = initialPosts as Post[];
    savePosts(posts);
    return posts;
  }
  return existingPosts;
};
