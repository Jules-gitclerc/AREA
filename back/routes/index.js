const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send("Welcome to Area API! " + req.socket.remoteAddress + '---' + req.headers["user-agent"]);
});

module.exports = router;
