const fctDataBase = require("../../tools/fctDBRequest");
const fctToken = require("../../tools/fctToken");

async function getUserDataAll(req, res) {
    let dataToken = fctToken.getTokenData(req);

    try {

        let data = await fctDataBase.request('SELECT * FROM clients WHERE id!=$1;', [dataToken.id]);
        let response = []

        data.rows.forEach(item => response.push({
            id: item.id,
            username: item.username,
            email: item.email,
            avatar: item.avatar
        }))

        res.status(200).send(response)
    } catch (err) {
        res.status(500).send({
            message: 'BDD error',
        });
    }
}

module.exports = {
    getUserDataAll
}