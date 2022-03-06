const express = require('express');
const router = express.Router();
const fctToken = require('../../tools/fctToken');

const fctNewWeather = require('./newWeatherSettings')
const fctData = require('./allData')
const fctDeleteWeather = require('./deleteWeather')

router.post('/', fctToken.auth, fctNewWeather.newWeatherSettings)

router.get('/', fctToken.auth, fctData.getAllDataWeather)

router.delete('/:id', fctToken.auth, fctDeleteWeather.deleteWeatherById)

module.exports = router;