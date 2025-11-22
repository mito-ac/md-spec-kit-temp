import './Header.css';

interface HeaderProps {
  onPostClick: () => void;
}

const Header = ({ onPostClick }: HeaderProps) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">EmojiLink 🌐</h1>
        <div className="header-actions">
          <button className="header-button post-button" onClick={onPostClick} title="新しい投稿">
            ＋
          </button>
          <button className="header-button profile-button" title="プロフィール">
            👤
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
