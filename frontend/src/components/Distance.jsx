
import { useEffect, useState } from 'react';
import '../styles/Distance.css';

const Distance = (props) => {
    const [dist, setDist] = useState(null);
    const [returnedDist, setReturnedDist] = useState(null);
    const [returnedTime, setReturnedTime] = useState(null);

    useEffect(() => {
        if (!props.station || !props.currentLocation) return;

        async function fetchGeocode() {
            try {
                const response = await fetch('http://localhost:3001/geocodes', {
                    method: 'POST',
                    body: JSON.stringify([props.station]),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                setDist([data[0].location.lat, data[0].location.lng]);
            } catch (error) {
                console.error('Error fetching geocode:', error);
            }
        }

        fetchGeocode();
    }, [props.station, props.currentLocation]);

    // Separate useEffect for distance calculation when dist is available
    useEffect(() => {
        if (!dist || !props.currentLocation) return;

        async function fetchDistance() {
            try {
                const response = await fetch('http://localhost:3001/distance', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        origins: `${props.currentLocation[0]},${props.currentLocation[1]}`,
                        destinations: `${dist[0]},${dist[1]}`
                    })
                });
                const distanceData = await response.json();
                
                if (distanceData.rows[0]?.elements[0]?.distance?.text) {
                    setReturnedDist(distanceData.rows[0].elements[0].distance.text);
                } else {
                    console.error('Invalid distance data:', distanceData);
                    setReturnedDist('Distance unavailable');
                }
                if (distanceData.rows[0]?.elements[0]?.duration?.text) {
                    setReturnedTime(distanceData.rows[0].elements[0].duration.text);
                } else {
                    console.error('Invalid duration data:', distanceData);
                    setReturnedTime('Time unavailable');
                }
            } catch (error) {
                console.error('Error fetching distance:', error);
                setReturnedDist('Distance unavailable');
            }
        }

        fetchDistance();
    }, [dist, props.currentLocation]);

    return (
        <div className='distance-container'>
            <img src='/dist.svg' alt='Distance Icon'/>
            <span style={{marginRight: '20px'}}>{returnedDist ? `${returnedDist} away` : 'Loading...'}</span>
            <img src='/car.svg' alt='Travel Time Icon'/>
            <span>{returnedTime ? `${returnedTime}` : 'Loading...'}</span>
        </div>
    );
};

export default Distance;