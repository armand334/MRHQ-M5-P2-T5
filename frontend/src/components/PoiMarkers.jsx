import {
  AdvancedMarker,
  Pin,
  useMap
} from '@vis.gl/react-google-maps';

import {MarkerClusterer} from '@googlemaps/markerclusterer';

import React, {useEffect, useRef, useState} from 'react';

const PoiMarkers = (props) => {
  const map = useMap();
  const [markers, setMarkers] = useState({});
  const clusterer = useRef(null);

  // Create the pin image element
  const createPinElement = () => {
    const img = document.createElement('img');
    img.src = '/pin.svg';
    img.alt = 'POI Pin';
    img.style.width = '40px';
    img.style.height = '40px';
    return img;
  };

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
    let renderer = {
      render({ count, position }) {
        const svg = window.btoa(`
          <svg fill="#ED560E" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
            <circle cx="120" cy="120" opacity=".6" r="70" /></svg>`);
        return new google.maps.Marker({
          position,
          label: {
            text: `${count}`,
            color: "#fff",
            fontSize: "12px",
          },
          icon: {
            url: `data:image/svg+xml;base64,${svg}`,
            scaledSize: new google.maps.Size(45, 45),
          },
          title: `Cluster of ${count} markers`,
          zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
        });
      }};
      clusterer.current = new MarkerClusterer({map, renderer});
    }
  }, [map]);

  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = (marker, key) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers(prev => {
      if (marker) {
        return {...prev, [key]: marker};
      } else {
        const newMarkers = {...prev};
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  if (!props.pois || props.pois.length === 0) {
    return null; // Return nothing if no POIs
  }

  return (
    <>
      {props.pois.map( (poi) => (
        <AdvancedMarker
          key={poi.key}
          position={{ lat: poi.location.lat, lng: poi.location.lng }}
          ref={marker => setMarkerRef(marker, poi.key)}
          >
            <Pin glyph={createPinElement()} scale={0}/>
        </AdvancedMarker>
      ))}
    </>
  );
}

export default PoiMarkers;