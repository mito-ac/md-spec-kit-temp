import { useState } from 'react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import './PostModal.css';

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPost: (emojis: string[]) => void;
}

const PostModal = ({ isOpen, onClose, onPost }: PostModalProps) => {
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([]);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    if (selectedEmojis.length < 3) {
      setSelectedEmojis([...selectedEmojis, emojiData.emoji]);
    }
  };

  const removeEmoji = (index: number) => {
    setSelectedEmojis(selectedEmojis.filter((_, i) => i !== index));
  };

  const handlePost = () => {
    if (selectedEmojis.length >= 1 && selectedEmojis.length <= 3) {
      onPost(selectedEmojis);
      setSelectedEmojis([]);
      onClose();
    }
  };

  const handleClose = () => {
    setSelectedEmojis([]);
    onClose();
  };

  const isValid = selectedEmojis.length >= 1 && selectedEmojis.length <= 3;

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>絵文字を選んで投稿</h2>
          <button className="close-button" onClick={handleClose}>
            ✕
          </button>
        </div>

        <div className="selected-emojis">
          {selectedEmojis.length > 0 ? (
            <div className="emoji-preview">
              {selectedEmojis.map((emoji, index) => (
                <div key={index} className="emoji-item">
                  <span className="emoji-large">{emoji}</span>
                  <button
                    className="remove-emoji"
                    onClick={() => removeEmoji(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="placeholder">絵文字を1〜3個選んでください</p>
          )}
        </div>

        {!isValid && selectedEmojis.length > 0 && (
          <div className="error-message">絵文字は1〜3個選択してください</div>
        )}

        <div className="emoji-picker-container">
          <EmojiPicker onEmojiClick={handleEmojiClick} width="100%" />
        </div>

        <div className="modal-footer">
          <button
            className="post-button-modal"
            onClick={handlePost}
            disabled={!isValid}
          >
            投稿する 🚀
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
