import "./stylesheets/App.css";
import Map from "./components/Map";
import MessagesContainer from "./components/MessagesContainer";
import ForumContainer from "./components/ForumContainer";

function App() {
  return (
    <>
      <MessagesContainer />
      <Map />
      <ForumContainer />
    </>
  );
}

export default App;
