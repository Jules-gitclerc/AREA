const fctDataBase = require("../../tools/fctDBRequest");
const fctToken = require("../../tools/fctToken");

async function newWidgetByUser(req, res) {
    let dataToken = fctToken.getTokenData(req);

    try {
        let value = '';

        req.body.widget.forEach((item, index) => {
            if (index + 1 === req.body.widget.length) {
                value += `(${dataToken.id}, ${item.id})`
            } else {
                value += `(${dataToken.id}, ${item.id}), `
            }
        })
        await fctDataBase.request('INSERT INTO widget(id_user, id_widget) VALUES ' + value + ';', []);
        res.status(200).send({
            message: 'done!',
        });
    } catch (err) {
        res.status(500).send({
            message: 'BDD error',
        });
    }
}

async function deleteWidget(req, res) {
    try {
        await fctDataBase.request('DELETE FROM widget WHERE id=$1;', [parseInt(req.params.id)]);
        res.status(200).send({
            message: 'done!',
        });
    } catch (err) {
        res.status(500).send({
            message: 'BDD error',
        });
    }
}

async function getWidget(req, res) {
    let dataToken = fctToken.getTokenData(req);

    try {
        const response = await fctDataBase.request('SELECT * FROM widget WHERE id_user=$1;', [parseInt(dataToken.id)]);

        let target = []
        response.rows.forEach(elem => target.push({
            id: elem.id,
            idWidget: elem.id_widget
        }))
        res.status(200).send(target);
    } catch (err) {
        res.status(500).send({
            message: 'BDD error',
        });
    }
}

module.exports = {
    newWidgetByUser,
    deleteWidget,
    getWidget
}