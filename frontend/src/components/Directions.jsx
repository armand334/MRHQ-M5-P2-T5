import {
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';

import React, { use, useEffect, useState } from 'react';

function Directions(props) {
    const map = useMap();
    const routesLibrary = useMapsLibrary('routes');
    const [directionsService, setDirectionsService] = useState(null);
    const [directionsRenderer, setDirectionsRenderer] = useState(null);
    const [currLocation, setCurrentLocation] = useState(null);
    const [currDestination, setDestination] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (props.currentLocation) {
            setCurrentLocation(props.currentLocation);
            console.log('Current location Directions:', props.currentLocation);
        }
        if (props.destination) {
            setDestination(props.destination);
            console.log('Destination Directions:', props.destination);
        }
        if (props.currentLocation && props.destination) {
            setReady(true);
        }
    }, [props.currentLocation, props.destination]);

    useEffect(() => {
        if (!map || !routesLibrary) return;
        setDirectionsService(new routesLibrary.DirectionsService());
        setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
    }, [map, routesLibrary]);

    useEffect(() => {
        if (!directionsService || !directionsRenderer) return;
        if (!ready) return;
        setReady(false);

        directionsService.route(
            {
                origin: { lat: currLocation[0], lng: currLocation[1] }, // Current Location
                destination: { lat: currDestination[0], lng: currDestination[1] }, // Destination
                travelMode: 'DRIVING',
            }).then((response) => {
                directionsRenderer.setDirections(response);
            }).catch((e) => window.alert('Directions request failed due to ' + e));

    }, [directionsService, directionsRenderer, ready]);

    return (
        null
    );
}

export default Directions;