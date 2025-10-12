import Map from "../components/Map";
import MessagesContainer from "../components/MessagesContainer";
import ForumContainer from "../components/ForumContainer";
import "../stylesheets/Home.css";

export default function Home() {
  return (
    <div className="home">
      <MessagesContainer />
      <Map />
      <ForumContainer />
    </div>
  );
}
