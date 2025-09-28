const fs = require('fs');
const mongoose = require('mongoose');

// Map global promise
mongoose.Promise = global.Promise;
// Connect to db
const db = mongoose.connect('mongodb://localhost:27017/m5');

const Station = require('./models/station');
const { get } = require('http');

function getRandomFloat(min, max, decimals = 2) {
  min = min * 100;
  max = max * 100;
  const randomFloat = Math.random() * (max - min) + min;
  return (Math.round(randomFloat * Math.pow(10, decimals)) / Math.pow(10, decimals));
}

// Seed db
const seed = async () => {
  try {
    await Station.deleteMany({});

    fs.readFileSync('detailedStations.json', 'utf-8');
    const stations = JSON.parse(fs.readFileSync('detailedStations.json', 'utf-8'));
    for (const station of stations) {
        const title = station.name;
        const address = station.address;
        const hours = station.hours;
        const phone = station.phone;
        const services = station.services;

        const fuelTypesIterable = station.fuelTypes;
        
        const fuelTypes = Array.from(fuelTypesIterable).map(fuelType => ({
          fuel: fuelType,
          price: getRandomFloat(2.5, 3.5)
        }));

        if (fuelTypes[0].fuel === 'ZX Premium') {
          const temp = fuelTypes[0];
          fuelTypes[0] = fuelTypes[1];
          fuelTypes[1] = temp;
        }

        const fuelTypesArray = fuelTypes;

        const fuelTypesJson = fuelTypes.reduce((obj, fuelType) => {
          obj[fuelType.fuel] = fuelType.price;
          return obj;
        }, {});

        const avgPrice = parseFloat((fuelTypes.reduce((sum, ft) => sum + ft.price, 0) / fuelTypes.length).toFixed(2));

        let stationType;
        if (title.toLowerCase().includes('truck')) {
          stationType = 'truck stop';
        }
        else{ 
          stationType = 'service station';
        }

        await Station.create({ title, address, hours, phone, services, fuelTypesArray, fuelTypesJson, avgPrice, stationType });
    }
    
    console.info("DB Seeded");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
};

seed();