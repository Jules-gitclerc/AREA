const fctToken = require('../../tools/fctToken');
const fctDataBase = require("../../tools/fctDBRequest");

async function getTheme(req, res) {
    let dataToken = fctToken.getTokenData(req);

    try {
        let data = await fctDataBase.request('SELECT * FROM clients WHERE id=$1;', [parseInt(dataToken.id)]);

        if (data.rowCount === 0) {
            res.status(403).send({
                message: "This user doesn't exist"
            });
        } else {
            res.status(200).send({
                idTheme: data.rows[0].id_theme,
            })
        }
    } catch (err) {
        res.status(500).send({
            message: 'BDD error',
        });
    }
}

async function editTheme(req, res) {
    let dataToken = fctToken.getTokenData(req);

    try {
        await fctDataBase.request('UPDATE clients SET id_theme=$1 WHERE id=$2;', [req.body.idTheme, parseInt(dataToken.id)]);
        res.status(200).send({message: 'Done!'})
    } catch (err) {
        res.status(500).send({
            message: 'BDD error',
        });
    }
}

module.exports = {
    getTheme,
    editTheme
}