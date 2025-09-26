import { MapContainer, TileLayer } from "react-leaflet";
import "../stylesheets/Map.css";
const Guwahati = [26.16, 91.7486];

export default function Map() {
  return (
    <div className="map-container">
      <MapContainer center={Guwahati} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}
