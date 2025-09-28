import '../styles/Filter.css'
import { useState } from 'react'
import Select from 'react-select'

function Filter(props) {
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedStationType, setSelectedStationType] = useState("no station");
  const [selectedFuelType, setSelectedFuelType] = useState("no fuel");
  const [selectedSortBy, setSelectedSortBy] = useState("no sort");
  const [location, setLocation] = useState(props.state.location || "no location");

  const servicesOptions = [
    { value: "EV Charging - Fast", label: "EV Charging - Fast" },
    { value: "EV Charging - Ultra-Fast", label: "EV Charging - Ultra-Fast" },
    { value: "EV Charging - Fast &/or Ultra-Fast", label: "EV Charging - Fast &/or Ultra-Fast" },
    { value: "EV Charging - Coming Soon", label: "EV Charging - Coming Soon" },
    { value: "f'real", label: "f'real" },
    { value: "Pre-order Coffee", label: "Pre-order Coffee" },
    { value: "Pay in app", label: "Pay in app" },
    { value: "Z Espress Coffee & Fresh Food", label: "Z Espress Coffee & Fresh Food" },
    { value: "Z2O carwash", label: "Z2O carwash" },
    { value: "Trailer hire", label: "Trailer hire" },
    { value: "LPG SWAP'n'GO", label: "LPG SWAP'n'GO" },
    { value: "24/7 Pay at pump", label: "24/7 Pay at pump" },
    { value: "Super long hoses", label: "Super long hoses" },
    { value: "Bathrooms", label: "Bathrooms" },
    { value: "A-Z Screen", label: "A-Z Screen" },
    { value: "Pay by plate", label: "Pay by plate" },
    { value: "Compostable Cups", label: "Compostable Cups" },
    { value: "AdBlue Diesel Exhaust Fluid", label: "AdBlue Diesel Exhaust Fluid" },
    { value: "Fast fill Diesel lane", label: "Fast fill Diesel lane" },
    { value: "ATM", label: "ATM" }
  ]

  const stationTypeOptions = [
    { value: "no station", label: "Select Station Type" },
    { value: "Truck Stop", label: "Truck Stop" },
    { value: "Service Station", label: "Service Station" }
  ]

  const fuelTypeOptions = [
    { value: "no fuel", label: "Select Fuel Type" },
    { value: "Diesel with Techron D", label: "Diesel with Techron D" },
    { value: "ZX Premium", label: "ZX Premium" },
    { value: "Z91 Unleaded", label: "Z91 Unleaded" },
    { value: "Z Diesel", label: "Z Diesel" },
    { value: "Z DEC", label: "Z DEC" }
  ]

  const sortByOptions = [
    { value: "no sort", label: "Sort By" },
    { value: "Price", label: "Price" },
    { value: "Distance", label: "Distance" }
  ]

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    // Build formJson manually
    const formJson = {};
    for (const [key, value] of formData.entries()) {
      formJson[key] = value;
    }
    
    // Add all react-select values manually since they don't appear in FormData
    if (selectedServices.length > 0) {
      formJson['services'] = selectedServices.map(service => service.value);
    }
    
    // Add other react-select values
    if (selectedStationType && selectedStationType !== "no station") {
      formJson['stationType'] = selectedStationType.value;
    }
    
    if (selectedFuelType && selectedFuelType !== "no fuel") {
      formJson['fuelType'] = selectedFuelType.value;
    }
    
    if (selectedSortBy && selectedSortBy !== "no sort") {
      formJson['sortBy'] = selectedSortBy.value;
    }
    
    formJson['location'] = location.value;
    
    console.log(JSON.stringify(formJson));
    props.setState(formJson);
  }

  return (
    <div className='filter-container'>
      <form method="post" onSubmit={handleSubmit}>
        <div className='dividerServices'>
          <label htmlFor="services-select">Services</label>
          <Select 
            id="services-select" 
            name='services' 
            options={servicesOptions} 
            isMulti={true}
            value={selectedServices}
            onChange={setSelectedServices}
            className="react-select-container"
            classNamePrefix="react-select"
            placeholder="Select Services"
          />
        </div>
        <div className='divider'>
          <label htmlFor="station-type-select">Station Type</label>
          <Select 
            id="station-type-select" 
            name="stationType"
            options={stationTypeOptions}
            value={selectedStationType}
            onChange={setSelectedStationType}
            className='react-select-container'
            classNamePrefix="react-select"
            placeholder="Select Station Type"
          />
        </div>
        <div className='divider'>
          <label htmlFor="fuel-type-select">Fuel Type</label>
          <Select
            id="fuel-type-select"
            name="fuelType"
            options={fuelTypeOptions}
            value={selectedFuelType}
            onChange={setSelectedFuelType}
            className='react-select-container'
            classNamePrefix="react-select"
            placeholder="Select Fuel Type"
          />
        </div>
        <div className='divider'>
          <label htmlFor="sort-by-select">Sort By</label>
          <Select
            id="sort-by-select"
            name="sortBy"
            options={sortByOptions}
            value={selectedSortBy}
            onChange={setSelectedSortBy}
            className='react-select-container'
            classNamePrefix="react-select"
            placeholder="Sort By"
          />
        </div>
        <div className='divider'>
          <label htmlFor="apply-filters-button" id='apply-filters-button-label'>Apply Filters</label>
          <button type="submit" className='filter-button' id='apply-filters-button'>
            <p>Apply Filters</p>
          </button>
        </div>
      </form>
    </div>
  )
}

export default Filter
