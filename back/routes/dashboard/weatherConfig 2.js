const fctDataBase = require("../../tools/fctDBRequest");
const fctToken = require("../../tools/fctToken");

async function newWidgetWeatherConfig(req, res) {
    let dataToken = fctToken.getTokenData(req);

    try {
        await fctDataBase.request('INSERT INTO widget_config_weather(id_user, id_widget, id_weather_config) VALUES ($1, $2, $3);', [parseInt(dataToken.id), req.body.idWidget, req.body.idConfig]);
        res.status(200).send({
            message: 'done!',
        });
    } catch (err) {
        res.status(500).send({
            message: 'BDD error',
        });
    }
}

async function updateWidgetWeatherConfig(req, res) {
    try {
        await fctDataBase.request('UPDATE widget_config_weather SET id_weather_config=$1 WHERE id=$2;', [req.body.idConfig, parseInt(req.params.id)]);
        res.status(200).send({
            message: 'done!',
        });
    } catch (err) {
        res.status(500).send({
            message: 'BDD error',
        });
    }
}

async function getWidgetWeatherConfig(req, res) {
    let dataToken = fctToken.getTokenData(req);

    try {
        const response = await fctDataBase.request('SELECT id_weather_config, id FROM widget_config_weather WHERE id_widget=$1 AND id_user=$2;', [parseInt(req.params.idWidget), parseInt(dataToken.id)]);

        if (response.rows.length === 0) {
            res.status(200).send({
                idWeatherConfig: 0,
                id: -1,
            });
        } else {
            res.status(200).send({
                id: response.rows[0].id,
                idWeatherConfig: response.rows[0].id_weather_config,
            });
        }
    } catch (err) {
        res.status(500).send({
            message: 'BDD error',
        });
    }
}

async function getSpecificWeatherSettings(req, res) {
    try {
        const response = await fctDataBase.request('SELECT * FROM weather WHERE id=$1;', [parseInt(res.locals.idWeatherConfig)]);

        if (response.rows.length === 0) {
            res.status(404).send({
                message: 'config not found'
            });
        } else {
            res.status(200).send({
                city: response.rows[0].city,
                countryCode: response.rows[0].countrycode,
            });
        }
    } catch (err) {
        res.status(500).send({
            message: 'BDD error',
        });
    }
}

async function getSpecificWeatherConfig(req, res, next) {
    let dataToken = fctToken.getTokenData(req);

    try {
        const response = await fctDataBase.request('SELECT id_weather_config FROM widget_config_weather WHERE id_widget=$1 AND id_user=$2;', [parseInt(req.params.idWidget), parseInt(dataToken.id)]);

        if (response.rows.length === 0) {
            res.status(404).send({
                message: 'config not found'
            });
        } else {
            res.locals.idWeatherConfig = response.rows[0].id_weather_config;
            next()
        }
    } catch (err) {
        res.status(500).send({
            message: 'BDD error',
        });
    }
}

module.exports = {
    newWidgetWeatherConfig,
    updateWidgetWeatherConfig,
    getWidgetWeatherConfig,
    getSpecificWeatherConfig,
    getSpecificWeatherSettings,
}