import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "30rem",
};

function GoogleMapsSelectLocation({
  selectMarkerCordinates,
  lat,
  lng,
}: {
  selectMarkerCordinates: (e: google.maps.MapMouseEvent) => void;
  lat: number;
  lng: number;
}) {
  const center = {
    lat: 40.409264,
    lng: 49.867092,
  };

  const position = {
    lat,
    lng,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBxBdPJUrxdl4rJ1_56OlAt91Fv2qJtxGc">
      <GoogleMap mapContainerStyle={containerStyle} zoom={15} center={center} > 
        <Marker
          onDragEnd={(e) => selectMarkerCordinates(e)}
          draggable={true}
          position={position}
        />
      </GoogleMap>
    </LoadScript>
  );
}

export default GoogleMapsSelectLocation;
