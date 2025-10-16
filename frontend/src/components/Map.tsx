import { MapContainer, TileLayer } from "react-leaflet";
import type { LatLngTuple } from "leaflet";
import "../stylesheets/Map.css";
import { useLocation } from "../context/LocationContext";
// const Guwahati: LatLngTuple = [26.16, 91.7486];
const London: LatLngTuple = [51.5072, 0.1276];

export default function Map() {
  const { location } = useLocation();
  return (
    <div className="map-container">
      <MapContainer
        center={location ? location : London}
        zoom={12}
        scrollWheelZoom={true}
        className="leaflet-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}
