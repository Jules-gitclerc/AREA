const express = require('express');
const router = express.Router();
const fctToken = require('../../../tools/fctToken');

const fctOpenWeatherApi = require('./openWeatherApi')
const fctUnits = require('./units')

/* GET current weather data */
router.get('/currentWeather', fctToken.auth, fctOpenWeatherApi.currentWeatherData);

/* GET units */
router.get('/units', fctToken.auth, fctUnits.unitsData);

module.exports = router;