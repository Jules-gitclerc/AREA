const fctDataBase = require("../../tools/fctDBRequest");
const fctToken = require("../../tools/fctToken");
const bcrypt = require("bcrypt");

async function updatePassword(req, res) {
    let dataToken = fctToken.getTokenData(req);

    try {
        await bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
            return new Promise(async (resolve, reject) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                try {
                    await fctDataBase.request('UPDATE clients SET password=$1 WHERE id=$2;', [hash, dataToken.id]);
                    res.status(200).send({message: 'Done!'})
                    resolve();
                } catch (err) {
                    res.status(500).send({
                        message: 'BDD error',
                    });
                    reject(err);
                }
            })
        })
    } catch (err) {
        res.status(500).send({
            message: 'BDD error',
        });
    }
}

function hashCheck(password, hash) {
    return new Promise(async (resolve, reject) => {
        try {
            bcrypt.compare(password, hash, function (err, res) {
                resolve(res);
            });
        } catch (err) {
            console.log('err', err)
            reject(err)
        }
    })
}

async function checkPassword(req, res, next) {
    let dataToken = fctToken.getTokenData(req);

    try {
        let data = await fctDataBase.request('SELECT password FROM clients WHERE id=$1;', [dataToken.id]);

        if (data.rowCount === 0) {
            res.status(204).send({
                message: "This user doesn't exist"
            });
        } else {
            let checkPassword = await hashCheck(req.body.lastPassword, data.rows[0].password);

            if (checkPassword) {
                next();
            } else {
                res.status(204).send({
                    message: 'Wrong password, try again.',
                });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'BDD error',
        });
    }
}

module.exports = {
    updatePassword,
    checkPassword
}