import { useRef } from "react";

import "../stylesheets/ForumContainer.css";

export default function ForumContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleOpen = () => {
    if (containerRef.current && buttonRef.current) {
      containerRef.current.classList.add("is-open");
      buttonRef.current.classList.add("is-visible");
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (containerRef.current && buttonRef.current) {
      containerRef.current.classList.remove("is-open");
      buttonRef.current.classList.remove("is-visible");
    }
  };

  return (
    <div className="forum-container">
      <button
        className="forum-close-button"
        ref={buttonRef}
        onClick={handleClose}
      >
        &gt;
      </button>
      <div className="forum" ref={containerRef} onClick={handleOpen}></div>
    </div>
  );
}
