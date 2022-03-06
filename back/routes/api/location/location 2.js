const express = require('express');
const router = express.Router();
const fctToken = require('../../../tools/fctToken');

const fctCountry = require("./country");
const fctCity = require("./city");

/* GET country data */
router.get('/country', fctToken.auth, fctCountry.getDataCountry);

/* GET city data by iso*/
router.get('/cities', fctToken.auth, fctCity.getDataCityByISO);

module.exports = router;