import "../stylesheets/MessagesContainer.css";

interface MessagesContainerProps {
  onClose: () => void;
}

export default function MessagesContainer({ onClose }: MessagesContainerProps) {
  return (
    <div className="messages-container">
      <div className="messages-header">
        <h2>Messages</h2>
        <button
          className="close-button"
          onClick={onClose}
          aria-label="Close messages"
        >
          ×
        </button>
      </div>
      <div className="messages-content">
        <p>WIP</p>
      </div>
    </div>
  );
}
