const fctDataBase = require("../../tools/fctDBRequest");
const fctToken = require("../../tools/fctToken");

async function deleteWeatherById(req, res) {
    let dataToken = fctToken.getTokenData(req);
    try {
        await fctDataBase.request('DELETE FROM weather WHERE id=$1 AND id_user=$2;', [parseInt(req.params.id), parseInt(dataToken.id)]);
        res.status(200).send({message: 'Done!'})
    } catch (err) {
        res.status(500).send({
            message: 'BDD error',
        });
    }
}

module.exports = {
    deleteWeatherById
}