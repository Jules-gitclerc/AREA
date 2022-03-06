const fctDataBase = require("../../tools/fctDBRequest");

async function identification(req, res) {
    try {
        await fctDataBase.request('UPDATE clients SET is_identified=true WHERE id=$1;', [req.params.id]);
        res.status(200).send({message: 'Done!'})
    } catch (err) {
        res.status(500).send({
            message: 'BDD error',
        });
    }
}

module.exports = {
    identification
}
