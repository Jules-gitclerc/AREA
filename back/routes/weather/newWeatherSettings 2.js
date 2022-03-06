const fctToken = require('../../tools/fctToken');
const fctDataBase = require("../../tools/fctDBRequest");

async function newWeatherSettings(req, res) {
    let dataToken = fctToken.getTokenData(req);

    try {
        await fctDataBase.request('INSERT INTO weather(id_user, countrycode, city) VALUES ($1, $2, $3);', [parseInt(dataToken.id), req.body.countryCode, req.body.city]);
        res.status(200).send({message: 'Done!'})
    } catch (err) {
        res.status(500).send({
            message: 'BDD error',
        });
    }
}

module.exports = {
    newWeatherSettings
}