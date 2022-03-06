const express = require('express');
const router = express.Router();
const fctToken = require("../../tools/fctToken");

const fctAll = require("./all");
const fctSubscribe = require("./subscribe")

router.get('/', fctToken.auth, fctAll.getServiceDataAll, fctAll.getLinkService);

router.post('/subscribe', fctToken.auth, fctSubscribe.subServices);

module.exports = router;