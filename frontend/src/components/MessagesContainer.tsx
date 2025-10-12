import { useRef } from "react";
import "../stylesheets/MessagesContainer.css";

export default function MessagesContainer() {
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
    <div className="messages-container">
      <div className="messages" ref={containerRef} onClick={handleOpen}></div>
      <button
        className="messages-close-button"
        ref={buttonRef}
        onClick={handleClose}
      >
        &lt;
      </button>
    </div>
  );
}
