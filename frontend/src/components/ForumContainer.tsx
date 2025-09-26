import "../stylesheets/ForumContainer.css";

interface ForumContainerProps {
  onClose: () => void;
}

export default function ForumContainer({ onClose }: ForumContainerProps) {
  return (
    <div className="forum-container">
      <div className="forum-header">
        <h2>Forum</h2>
        <button
          className="close-button"
          onClick={onClose}
          aria-label="Close forum"
        >
          ×
        </button>
      </div>
      <div className="forum-content">
        <p>WIP</p>
      </div>
    </div>
  );
}
