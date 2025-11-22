import './ReactionButton.css';

interface ReactionButtonProps {
  emoji: string;
  count: number;
  onClick: () => void;
}

const ReactionButton = ({ emoji, count, onClick }: ReactionButtonProps) => {
  return (
    <button className="reaction-button" onClick={onClick}>
      <span className="reaction-emoji">{emoji}</span>
      <span className="reaction-count">{count}</span>
    </button>
  );
};

export default ReactionButton;
