import { use, useEffect, useState, lazy, Suspense } from 'react'
import '../styles/StationList.css'
import MapComponent from './MapComponent.jsx'

const Distance = lazy(() => import('./Distance.jsx'));

function StationList(props) {
  const [stations, setStations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationBoolean, setLocationBoolean] = useState(false);
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    if (locationBoolean) return;
    setLocationBoolean(true);
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentLocation([position.coords.latitude, position.coords.longitude]);
            console.log('Current location StationList:', currentLocation);
          },
          (error) => {
            console.error('Error getting location:', error);
            alert('Unable to get your location. Please enable location services.');
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          }
        );
      }
      else {
      alert("Geolocation is not supported by this browser.");
    }

  }, [locationBoolean]);

  async function directions(currStation) {
    if (navigator.geolocation) {
      const response = await fetch('http://localhost:3001/geocodes', {
        method: 'POST',
        body: JSON.stringify([currStation]),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (typeof data[0].location !== 'undefined') {
        setDestination([data[0].location.lat, data[0].location.lng]);
        console.log('Destination StationList:', destination);
      }
      else {
        alert('Unable to get destination location for the selected station.');
      }

    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  const dateTime = new Date();
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (
          (JSON.stringify(props.state) === JSON.stringify({stationType: 'no station', fuelType: 'no fuel', sortBy: 'no sort' , location: 'no location'})) || 
          (props.state.stationType === 'no station' && 
          props.state.fuelType === 'no fuel' && 
          props.state.services === '' &&
          props.state.sortBy === 'no sort' &&
          props.state.location === 'no location')
        ) {
            const response = await fetch("http://localhost:3001/stations", {
            method: 'GET',
            headers: {
              "Content-Type": "application/json"
            }
          });
          const data = await response.json();
          setStations(data);
          props.setStations(data);
        }
        else { 
          const formJson = props.state;
          formJson['currentLocation'] = currentLocation;
          console.log('Form JSON being sent to backend:', formJson);
          const response = await fetch("http://localhost:3001/stations/filter", {
            method: 'POST',
            body: JSON.stringify(formJson),
            headers: {
              "Content-Type": "application/json"
            }
          });
          const data = await response.json();
          setStations(data);
          props.setStations(data);
          console.log('Fetched filtered stations from StationList:', data);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [props.state]);

  function handleArrow(index) {
    const toHide = document.getElementById(`${index}`);
    const toHideArrow = document.getElementById(`chevron-down-icon${index}`);
    const toShow = document.getElementById(`opening-hours${index}`);
    const toShowTable = document.getElementById(`hours-list${index}`);
    if (toShow) {
      toShow.style.display = 'flex';
      toShow.style.marginLeft = '8px';
    }
    if (toShowTable) {
      toShowTable.style.display = 'block';
    }
    if (toHide) {
      toHide.style.display = 'none';
    }
    if (toHideArrow) {
      toHideArrow.style.display = 'none';
    }
  }

  function handleSeeMore(index) {
    const toHide = document.getElementById(`see-more-button${index}`);
    const toShowMaps = document.getElementById(`maps-button${index}`);
    const toShowFuelTypes = document.getElementById(`fuel-types${index}`);
    const toShowServices = document.getElementById(`services${index}`);
    if (toShowServices) {
      toShowServices.style.display = 'flex';
      toShowServices.style.marginTop = '0px';
      toShowServices.style.marginBottom = '0px';
    }
    if (toShowFuelTypes) {
      toShowFuelTypes.style.display = 'flex';
      toShowFuelTypes.style.marginTop = '0px';
      toShowFuelTypes.style.marginBottom = '2px';
    }
    if (toHide) {
      toHide.style.display = 'none';
    }
    if (toShowMaps) {
      toShowMaps.style.display = 'flex';
    }
  }

  return (
    <div className="list-map-container">
      <div className='spacer'></div>
      <div className="station-container">
        {isLoading ? (
          <p>Loading stations...</p>
        ) : (
          <div className='station-list'>
            <p className="station-count">{stations.length} Stations found</p>
            <ul>
              {stations.map((station, index) => (
                <li key={station._id} className="station-card">
                  <h2>{station.title}</h2>
                  <p className='station-address'>{station.address}</p>
                  {/* <Distance station={station} currentLocation={currentLocation} /> */}
                  {station.hours.hours['Monday'] === 'Open 24 hours' ? (
                    <p id='open-24'>Open 24 hours</p>
                  ) : (
                    (() => {
                      // Helper function to check if current time is within the opening hours
                      function isWithinTimeRange(date, range) {
                        // Example range: "5am - 10pm"
                        const [startStr, endStr] = range.split("-").map(s => s.trim().toLowerCase());

                        // Helper to parse "5am"/"10pm" into minutes since midnight
                        function parseTime(str) {
                          const match = str.match(/(\d+)(?::(\d+))?\s*(am|pm)?/);
                          if (!match) throw new Error("Invalid time string: " + str);

                          let hours = parseInt(match[1], 10);
                          const minutes = parseInt(match[2] || "0", 10);
                          const meridian = match[3];

                          if (meridian === "pm" && hours !== 12) hours += 12;
                          if (meridian === "am" && hours === 12) hours = 0;

                          return hours * 60 + minutes; // total minutes from midnight
                        }

                        const startMinutes = parseTime(startStr);
                        const endMinutes = parseTime(endStr);

                        // Current time in minutes
                        const currentMinutes = date.getHours() * 60 + date.getMinutes();

                        // Handles ranges that don’t cross midnight (e.g., 5am - 10pm)
                        if (startMinutes <= endMinutes) {
                          return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
                        }

                        // Handles ranges that cross midnight (e.g., 10pm - 5am)
                        return currentMinutes >= startMinutes || currentMinutes <= endMinutes;
                      }

                      // Get today's opening hours string
                      const todayIndex = dateTime.getDay() - 1 < 0 ? 6 : dateTime.getDay() - 1; // Sunday=0, so wrap to 6
                      const todayEntry = Object.entries(station.hours.hours)[todayIndex];
                      const todayHours = todayEntry ? todayEntry[1] : "";

                      const testHours = "5am - 2pm"; // Example hours for testing

                      let isOpen = false;
                      if (typeof todayHours === "string" && todayHours.toLowerCase() !== "closed") {
                        try {
                          isOpen = isWithinTimeRange(dateTime, todayHours);
                        } catch (e) {
                          isOpen = false;
                        }
                      }

                      return (
                        <div className='hours-div'>
                          <div className='opening-hours-button'>
                            <p id={isOpen ? "open" : "closed"}>{isOpen ? "Open now" : "Closed"}</p>
                            <h3 id={`opening-hours${index}`}>Opening hours:</h3>
                            <p className='opening-hours-black' id={`${index}`}>Opening hours</p>
                            <img src='chevron-down.svg' alt='chevron down icon' id={`chevron-down-icon${index}`}
                              onClick={() => handleArrow(index)} className='chevron-icon' />
                          </div>
                          <ul className='hours-list' id={`hours-list${index}`}>
                            {Object.entries(station.hours.hours).map(([day, time], index) => (
                              <div className='times' key={index}>
                                <li key={day} className='day'>{day} </li>
                                <li key={time} className='time'>{time}</li>
                              </div>
                            ))}
                          </ul>
                        </div>
                      );
                    })()
                  )}
                  {station.phone === "N/A" ? (<p></p>) : (
                    <div className='phone-div'>
                      <img src='phone.svg' alt='phone icon' className='phone-icon'/>
                      <p id='phone'>Call us {station.phone}</p>
                    </div>
                  )}
                  <h3 id={`fuel-types${index}`}>Fuel Types:</h3>
                  <div className="fuel-types">
                    {station.fuelTypes.map((fuelType, index) => (
                      <div key={index} className="fuel-item">
                        <span className={fuelType.fuel}></span>
                        {
                          fuelType.fuel === 'Z91 Unleaded'
                            ? <img src='91.svg' alt='z91 icon' className='fuel-icon'/>
                            : fuelType.fuel === 'ZX Premium'
                            ? <img src='95.svg' alt='z95 icon' className='fuel-icon'/>
                            : <img src='diesel.svg' alt='diesel icon' className='fuel-icon'/>
                        }
                        <span className="fuel-price">{fuelType.price}</span>
                      </div>
                    ))}
                  </div>
                  <h3 id={`services${index}`}>Services:</h3>
                  <p style={{marginTop: '2px'}}>{station.services.join(", ")}</p>
                  <div className='button-container'>
                    <button className='see-more-button' onClick={() => handleSeeMore(index)}
                      id={`see-more-button${index}`}>See more</button>
                    <a 
                      className='maps-button'
                      id={`maps-button${index}`}
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(station.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Google Maps
                    </a>
                    <button 
                      className='directions-button'
                      onClick={() => directions(station)}
                    >
                      Directions
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {!isLoading && <MapComponent stations={stations} setStations={setStations} currentLocation={currentLocation} destination={destination} />}
    </div>
  )
}

export default StationList