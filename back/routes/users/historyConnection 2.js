const fctDataBase = require("../../tools/fctDBRequest");
const fctToken = require("../../tools/fctToken");

async function getHistoryConnection(req, res) {
    let dataToken = fctToken.getTokenData(req);

    try {
        let response = [];
        let data = await fctDataBase.request('SELECT * FROM connexion_history WHERE id_user=$1;', [parseInt(dataToken.id)]);

        data.rows.forEach((elem) => response.push({
            ip: elem.ip,
            date: elem.date
        }))

        res.status(200).send(response);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'BDD error',
        });
    }
}

module.exports = {
    getHistoryConnection
}