import { useState } from "react";
import "./stylesheets/App.css";
import Map from "./components/Map";
import MessagesContainer from "./components/MessagesContainer";
import ForumContainer from "./components/ForumContainer";

function App() {
  const [showMessages, setShowMessages] = useState(true);
  const [showForum, setShowForum] = useState(true);

  return (
    <>
      {showMessages && (
        <MessagesContainer onClose={() => setShowMessages(false)} />
      )}
      <Map />
      {showForum && <ForumContainer onClose={() => setShowForum(false)} />}
    </>
  );
}

export default App;
