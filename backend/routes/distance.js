var express = require('express');
var router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { origins, destinations } = req.body;
        
        if (!origins || !destinations) {
            return res.status(400).json({ error: 'Origins and destinations are required' });
        }

        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: 'Google Maps API key not configured' });
        }

        // Build the Google Maps Distance Matrix API URL
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origins}&destinations=${destinations}&key=${apiKey}`;
        
        // Make the API call from the backend
        const response = await fetch(url);
        const distanceData = await response.json();
        
        // Return the data to the frontend
        res.json(distanceData);
        
    } catch (error) {
        console.error('Error fetching distance:', error);
        res.status(500).json({ error: 'Failed to fetch distance data' });
    }
});

module.exports = router;