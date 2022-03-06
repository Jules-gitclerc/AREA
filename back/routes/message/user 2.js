const fctDataBase = require("../../tools/fctDBRequest");
const fctToken = require("../../tools/fctToken");

async function getUser(req, res) {
    let dataToken = fctToken.getTokenData(req);

    try {
        let data = await fctDataBase.request('SELECT id, username, first_name, last_name, avatar FROM clients WHERE id!=$1;', [parseInt(dataToken.id)]);

        res.status(200).send(data.rows);
    } catch (err) {
        res.status(500).send({
            message: 'err bdd'
        })
    }
}

module.exports = {
    getUser
}