const express = require('express');
const path = require("path");
const router = express.Router();

/* GET home page. */
router.get('/:id', function(req, res, next) {
    console.log(`../../images/${req.params.id}`)
    console.log(path.resolve(`../../images/${req.params.id}`), { root: __dirname })
    res.status(200).sendFile(path.resolve(`../../images/${req.params.id}`), { root: __dirname });
});

module.exports = router;