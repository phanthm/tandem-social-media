import "../stylesheets/MessagesContainer.css";

export default function MessagesContainer() {
  return (
    <div className="messages-container">
      <div className="messages"></div>
      <button
        className="messages-close-button"
        onClick={() => {
          const container = document.querySelector(".messages-container");
          if (container) {
            container.classList.toggle("is-open");
          }
        }}
        aria-label="Close messages"
      >
        ×
      </button>
    </div>
  );
}
