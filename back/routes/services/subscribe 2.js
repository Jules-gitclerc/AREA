const fctDataBase = require("../../tools/fctDBRequest");
const fctToken = require("../../tools/fctToken");

async function subServices(req, res) {
    let dataToken = fctToken.getTokenData(req);

    try {
        if (req.body.action === "unsub")
            await fctDataBase.request('DELETE FROM link_service WHERE id_user=$1 AND id_service=$2;', [parseInt(dataToken.id), req.body.serviceId]);
        else if (req.body.action === "sub")
            await fctDataBase.request('INSERT INTO link_service(id_user, id_service) VALUES ($1, $2);', [parseInt(dataToken.id), req.body.serviceId]);
        else {
            res.status(413).send({message: 'Error action !'});
            return;
        }
        res.status(200).send({message: 'OK!'});
    } catch (err) {
        res.status(500).send({
            message: 'BDD error',
        });
    }
}

module.exports = {
    subServices,
}