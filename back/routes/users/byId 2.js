const fctDataBase = require("../../tools/fctDBRequest");

async function getUserDataById(req, res) {
    try {
        let data = await fctDataBase.request('SELECT * FROM clients WHERE id=$1;', [parseInt(req.params.id)]);

        if (data.rowCount === 0) {
            res.status(403).send({
                message: "This user doesn't exist"
            });
        } else {
            res.status(200).send({
                id: data.rows[0].id,
                username: data.rows[0].username,
                email: data.rows[0].email,
                avatar: data.rows[0].avatar
            })
        }
    } catch (err) {
        res.status(500).send({
            message: 'BDD error',
        });
    }
}

module.exports = {
    getUserDataById
}