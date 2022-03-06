const express = require('express');
const router = express.Router();
const fctToken = require('../../../tools/fctToken');

const fctAuth = require('./auth');

/* POST get bearer token */
router.post('/auth', fctToken.auth, fctAuth.authSpotify);


module.exports = router;