
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import icon from "leaflet/dist/images/marker-icon.png";

import "leaflet/dist/leaflet.css";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";


const MapComponent = () => {
  const position = [20.505, -0.09];
  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });
  L.Marker.prototype.options.icon = DefaultIcon;
  
  return (

  
    <section className="container-fluid p-0">
  <MapContainer center={[23.7934, 90.4064]} zoom={2} scrollWheelZoom={false} style={{ height: "400px", width: "100%" }}>
  <TileLayer
  attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
  url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
/>
    <Marker position={[23.7934, 90.4064]}>
      <Popup>My Location</Popup>
    </Marker>
  </MapContainer>
</section>
  );
};

export default MapComponent;

