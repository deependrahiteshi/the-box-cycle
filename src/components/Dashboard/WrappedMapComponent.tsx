// components/GoogleMap.tsx
"use client";
import React, { useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const mapContainerStyle = {
  height: "40vh",
  width: "60vw",
};

const center = {
  lat: -33.92,
  lng: 151.25,
};

const locations = [
  { name: "Bondi Beach", lat: -33.890542, lng: 151.274856 },
  { name: "Coogee Beach", lat: -33.923036, lng: 151.259052 },
  { name: "Cronulla Beach", lat: -34.028249, lng: 151.157507 },
  { name: "Manly Beach", lat: -33.80010128657071, lng: 151.28747820854187 },
  { name: "Maroubra Beach", lat: -33.950198, lng: 151.259302 },
];

const WrappedMapComponent: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = React.useState<{
    lat: number;
    lng: number;
    name: string;
  } | null>(null);

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
      >
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={{ lat: location.lat, lng: location.lng }}
            onClick={() => {
              setSelectedLocation(location);
            }}
          />
        ))}

        {selectedLocation && (
          <InfoWindow
            position={{
              lat: selectedLocation.lat,
              lng: selectedLocation.lng,
            }}
            onCloseClick={() => {
              setSelectedLocation(null);
            }}
          >
            <div>
              <h2>{selectedLocation.name}</h2>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default WrappedMapComponent;
