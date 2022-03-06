const fctToken = require('../../tools/fctToken');
const fctDataBase = require("../../tools/fctDBRequest");

async function editTutorialMode(req, res) {
    let dataToken = fctToken.getTokenData(req);

    try {
        await fctDataBase.request('UPDATE clients SET is_tutorial_mode=$1 WHERE id=$2;', [req.body.isTutorialMode, parseInt(dataToken.id)]);
        res.status(200).send({message: 'Done!'})
    } catch (err) {
        res.status(500).send({
            message: 'BDD error',
        });
    }
}

module.exports = {
    editTutorialMode
}