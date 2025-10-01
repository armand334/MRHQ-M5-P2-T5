import '../styles/SearchBar.css'

function SearchBar(props) {

  const handleSubmit = (event) => {
    event.preventDefault();
    const locationInput = document.getElementById("location-input");
    // Build formJson manually
    const formJson = {};
    formJson['services'] = props.state.services
    formJson['stationType'] = props.state.stationType 
    formJson['fuelType'] = props.state.fuelType 
    formJson['sortBy'] = props.state.sortBy 
    formJson['location'] = locationInput.value;

    props.setState(formJson);
  };

  return (
    <div style={{ height: '241px', backgroundColor: 'yellow', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
      <form className="search-bar-form" onSubmit={handleSubmit}>
        <div className='divider'>
          <input type="text" id="location-input" />
        </div>
        <div className='divider'>
          <button type="submit" className='search-button' id='search-button'>
            <p>Submit</p>
          </button>
        </div>
      </form>
    </div>
  )
}

export default SearchBar