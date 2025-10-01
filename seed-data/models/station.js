const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

//Station Schema
const stationSchema = new Schema({
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

    stationType: {
        type: String,
    },

});

stationSchema.index({ title: 'text' });

// Define and export
module.exports = mongoose.model('Station', stationSchema);