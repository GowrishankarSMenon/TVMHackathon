"use client";

import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issue in Leaflet
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
  iconUrl: markerIconPng.src,
  shadowUrl: markerShadowPng.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapProps {
  onSelectLocation: (lat: number, lng: number) => void;
}

const LocationMarker = ({ onSelectLocation }: { onSelectLocation: (lat: number, lng: number) => void }) => {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onSelectLocation(e.latlng.lat, e.latlng.lng);
    },
  });

  return position ? <Marker position={position} icon={customIcon} /> : null;
};

const Map: React.FC<MapProps> = ({ onSelectLocation }) => {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} className="h-[300px] w-full rounded-md">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker onSelectLocation={onSelectLocation} />
    </MapContainer>
  );
};

export default Map;
