<h1> Mission 5 Part 2 from Team 5 </h1>
<h2> About the project: </h2>
<p>Recreation of z.co.nz/find-a-station with design from the Mission Ready UX team. </p

<h2>Built with:</h2>
<ul>
  <li>Javascript React (Vite)</li>
  <li>Node.js (Express)</li>
  <li>MongoDB</li
</ul>

<h2>Getting started:</h2>
<h3>Prerequisites:</h3>
<ul>
  <li>Node.js version 20+</li>
  <li>MongoDB with mongosh installed</li>
  <li>A google cloud account with Google Maps Platform API key enabled </li>
</ul>
<h3>Installation:</h3>
<ol>
  <li>Clone the repo</li>
  <li>cd ./seed-data</li>
  <li>npm i</li>
  <li>node seedStations.js</li>
  <li>node seedGeocodes.js</li>
  <li>in monogosh</li>
  <li>db m5</li>
  <li>db.createView("stations-geocode", "stations", [
    {
    $lookup: {
      from: "geocodes", // adjust if your collection name is different
      localField: "title",
      foreignField: "key",
      as: "geocodeData"
    }
  },
  {
    $unwind: "$geocodeData" // converts array to object since it's 1:1
  },
  {
    $addFields: {
      location: "$geocodeData.location" // bring location to top level
    }
  },
  {
    $project: {
      geocodeData: 0 // remove the temporary geocodeData field
    }
  }
] )
  </li>
  <li>cd ../backend</li>
  <li>create .env file with GOOGLE_MAPS_API_KEY=YOUR_API_KEY</li>
  <li>cd ../frontend</li>  
  <li>create .env file with VITE_API_KEY=YOUR_GOOGLE_MAPS_API_KEY</li>
  <li>cd ../backend </li>
  <li>npm start</li>
  <li>in new terminal: cd ./frontend</li>
  <li>npm run dev</li>
</ol>

<h2>Acknowledgements</h2>
<ul>
  <li>Dan, Liam, Natalia from Mission Ready</li>
  <li>react-select library</li>
</ul>
