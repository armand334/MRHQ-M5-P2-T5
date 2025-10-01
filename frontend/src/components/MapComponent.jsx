import '../styles/MapComponent.css'
import {APIProvider, Map} from '@vis.gl/react-google-maps';
import PoiMarkers from './PoiMarkers';
import { useEffect, useState } from 'react';
import Directions from './Directions';

function MapComponent(props) {
  const [pins, setPins] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (props.stations.length === 227) {
        const response = await fetch('http://localhost:3001/geocodes', {
          method: 'GET'
        });
        const data = await response.json();
        setPins(data);
      }
      else {
        console.log('Fetching filtered geocodes from MapComponent with stations:', props.stations);
        const response = await fetch('http://localhost:3001/geocodes', {
          method: 'POST',
          body: JSON.stringify(props.stations),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setPins(data);
      }
    };
    fetchData();
  }, [props.stations]);
  
  
  return (
    <div className='map-container' >
      <APIProvider apiKey={import.meta.env.VITE_API_KEY} onLoad={() => console.log('Maps API has loaded.')}>
        <Map
          defaultZoom={5}
          defaultCenter={ { lat: -40.9006, lng: 174.8860 } }
          mapId='62bed989cefe108d5df871ad'
          fullscreenControl={false}
        >
          <PoiMarkers pois={pins} />
          <Directions currentLocation={props.currentLocation} destination={props.destination}/>
        </Map>
      </APIProvider>
    </div>
  );
  
}

export default MapComponent;