const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

//Station Schema
const stationGeocodeSchema = new Schema({
    title: { 
        type: String, 
        required: true, 
    },

    address: { 
        type: String,
        required: true, 
    },

    hours: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },

    phone: {
        type: String
    },

    services: {
        type: [String],
    },

    fuelTypesArray: {
        type: mongoose.Schema.Types.Mixed,
    },

    fuelTypesJson: {
        type: mongoose.Schema.Types.Mixed,
    },

    avgPrice: {
        type: Number,
    },

    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },

    stationType: {
        type: String,
    },

}, {
    collection: 'stations-geocode' 
});

stationGeocodeSchema.index({ title: 'text' });

// Define and export
module.exports = mongoose.model('Station-Geocode', stationGeocodeSchema);