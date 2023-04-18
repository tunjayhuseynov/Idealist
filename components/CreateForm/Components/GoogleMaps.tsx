import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker,  } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

function GoogleMapsSelectLocation({selectMarkerCordinates, lat, lng}: {selectMarkerCordinates: (e: google.maps.MapMouseEvent) => void, lat: number, lng: number}) {
  
  const center = {
    lat,
    lng
  }

  const onDragMarker = (e: google.maps.MapMouseEvent) => {
    console.log(e.latLng?.lat())
    console.log(e.latLng?.lng())
    // setLat(e.latLng?.lat() ?? 0)
    // setLng(e.latLng?.lng() ?? 0)
}

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBxBdPJUrxdl4rJ1_56OlAt91Fv2qJtxGc"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={10}
        center={center}
     >
        <Marker
            onDragEnd={(e) => selectMarkerCordinates(e)} 
            draggable={true} position={center}/>
      </GoogleMap>
    </LoadScript>
  );
}

export default GoogleMapsSelectLocation;