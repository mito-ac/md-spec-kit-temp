import { useState } from 'react';
import Header from './components/Header';
import Timeline from './components/Timeline';
import PostModal from './components/PostModal';
import Toast from './components/Toast';
import { savePosts, loadPosts } from './utils/storage';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  const handlePostClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handlePost = (emojis) => {
    const newPost = {
      id: Date.now(),
      emojis: emojis,
      userId: 'currentUser',
      userName: 'あなた',
      userIcon: '😊',
      reactions: [
        { emoji: '👍', count: 0 },
        { emoji: '❤️', count: 0 },
        { emoji: '😂', count: 0 },
        { emoji: '😮', count: 0 },
        { emoji: '🎉', count: 0 },
      ],
      createdAt: new Date().toISOString(),
    };

    const currentPosts = loadPosts();
    const updatedPosts = [newPost, ...currentPosts];
    savePosts(updatedPosts);

    setToastMessage('投稿しました！✨');
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2000);

    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="app">
      <Header onPostClick={handlePostClick} />
      <Timeline key={refreshKey} />
      <PostModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onPost={handlePost}
      />
      <Toast message={toastMessage} isVisible={toastVisible} />
    </div>
  );
}

export default App;
