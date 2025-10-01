import '../styles/MapPage.css'

import { useState } from 'react'

import Nav from '../components/Nav.jsx'
import SearchBar from '../components/SearchBar.jsx'
import Filter from '../components/Filter.jsx'
import StationList from '../components/StationList.jsx'
import Footer from '../components/Footer.jsx'
import MapComponent from '../components/MapComponent.jsx'

function MapPage() {
  const [state, setState] = useState({ stationType: 'no station', fuelType: 'no fuel', sortBy: 'no sort', location:'no location'});
  const [stations, setStations] = useState([]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Nav />
      <SearchBar state={state} setState={setState} />
      <Filter state={state} setState={setState} />
      <StationList state={state} setState={setState} stations={stations} setStations={setStations} />
      <Footer />
    </div>
  )
}

export default MapPage
