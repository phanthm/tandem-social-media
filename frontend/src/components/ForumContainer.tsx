import "../stylesheets/ForumContainer.css";

export default function ForumContainer() {
  return (
    <div className="forum-container">
      <button
        className="forum-close-button"
        onClick={() => {
          const container = document.querySelector(".forum-container");
          if (container) {
            container.classList.toggle("is-open");
          }
        }}
        aria-label="Close forum"
      ></button>
      <div className="forum"></div>
    </div>
  );
}
