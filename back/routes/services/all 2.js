const fctDataBase = require("../../tools/fctDBRequest");
const fctToken = require("../../tools/fctToken");

async function getLinkService(req, res) {
    let dataToken = fctToken.getTokenData(req);

    try {

        let data = await fctDataBase.request('SELECT * FROM link_service WHERE id_user=$1;', [parseInt(dataToken.id)]);

        res.locals.services.forEach(elem => {
            let target = data.rows.find(item => {
                return parseInt(item.id_service) === parseInt(elem.id)
            });

            if (!!target) {
                elem.isActive = true
            }
        })

        res.status(200).send(res.locals.services);
    } catch (err) {
        res.status(500).send({
            message: 'BDD error',
        });
    }

}

async function getServiceDataAll(req, res, next) {

    try {

        let data = await fctDataBase.request('SELECT * FROM services;', []);
        let response = []

        data.rows.forEach(item => response.push({
            id: item.id,
            name: item.name,
            color: item.color,
            isActive: false
        }))

        res.locals.services = response;
        next();
    } catch (err) {
        res.status(500).send({
            message: 'BDD error',
        });
    }
}

module.exports = {
    getLinkService,
    getServiceDataAll
}