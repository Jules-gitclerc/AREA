const fctToken = require('../../tools/fctToken');
const fctDataBase = require("../../tools/fctDBRequest");
const dataCountry = require("../api/location/data/country.json").country

async function getAllDataWeather(req, res) {
    let dataToken = fctToken.getTokenData(req);

    try {
        const target = await fctDataBase.request('SELECT * FROM weather WHERE id_user=$1;', [parseInt(dataToken.id)]);
        let response = []
        target.rows.forEach(elem => response.push({
            id: elem.id,
            countryCode: elem.countrycode,
            country: dataCountry.find(item => item.iso2 === elem.countrycode).country,
            city: elem.city,
        }))

        res.status(200).send(response)
    } catch (err) {
        res.status(500).send({
            message: 'BDD error',
        });
    }
}

module.exports = {
    getAllDataWeather
}