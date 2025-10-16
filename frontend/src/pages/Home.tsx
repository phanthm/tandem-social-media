import { useEffect } from "react";
import { useLocation } from "../context/LocationContext";
import Map from "../components/Map";
import MessagesContainer from "../components/MessagesContainer";
import ForumContainer from "../components/ForumContainer";
import "../stylesheets/Home.css";

export default function Home() {
  const { location, requestLocation } = useLocation();

  useEffect(() => {
    if (!location) {
      requestLocation();
    }
    console.log(location);
  }, [location]);
  return (
    <div className="home">
      <MessagesContainer />
      <Map />
      <ForumContainer />
    </div>
  );
}
