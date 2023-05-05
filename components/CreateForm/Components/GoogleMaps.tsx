import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, MarkerF } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "30rem",
};

const center = {
  lat: 40.409264,
  lng: 49.867092,
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
  const position = {
    lat,
    lng,
  };

  return (
    <LoadScript googleMapsApiKey="">
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={15}
        center={center}
        mapContainerClassName="map-container"
      >
        <MarkerF
          onDragEnd={(e) => selectMarkerCordinates(e)}
          draggable={true}
          position={(position.lat && position.lng) == 0 ? center : position}
        />
      </GoogleMap>
    </LoadScript>
  );
}

export default GoogleMapsSelectLocation;
