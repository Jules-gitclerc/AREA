const fctDataBase = require("../../tools/fctDBRequest");
const fctToken = require("../../tools/fctToken");

async function deleteAccount(req, res) {
    let dataToken = fctToken.getTokenData(req);

    try {
        await fctDataBase.request('DELETE FROM clients WHERE id=$1;', [dataToken.id]);
        res.status(200).send({message: 'done'});
    } catch (err) {
        res.status(500).send({
            message: 'BDD error',
        });
    }
}

module.exports = {
    deleteAccount
}