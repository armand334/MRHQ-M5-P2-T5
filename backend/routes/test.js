var express = require('express');
const stationGeocodeModel = require("../models/station-geocode");
var router = express.Router();



router.get('/', async (request, response) => {
    const stations = await stationGeocodeModel.find({});

    const stationsReturn = await stationsToJson(stations);

    try {
    response.send(stationsReturn);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = router;