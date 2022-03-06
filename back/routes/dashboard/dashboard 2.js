const express = require('express');
const router = express.Router();
const fctToken = require("../../tools/fctToken");

const fctWidget = require('./widget');
const fctWeatherConfig = require('./weatherConfig');

router.get('/widget', fctToken.auth, fctWidget.getWidget);

router.post('/widget', fctToken.auth, fctWidget.newWidgetByUser);

router.delete('/widget/:id', fctToken.auth, fctWidget.deleteWidget);

router.get('/widget/weather/:idWidget', fctToken.auth, fctWeatherConfig.getSpecificWeatherConfig, fctWeatherConfig.getSpecificWeatherSettings)

router.get('/widget/weather/config/:idWidget', fctToken.auth, fctWeatherConfig.getWidgetWeatherConfig)

router.post('/widget/weather/config', fctToken.auth, fctWeatherConfig.newWidgetWeatherConfig)

router.put('/widget/weather/config/:id', fctToken.auth, fctWeatherConfig.updateWidgetWeatherConfig)

module.exports = router;