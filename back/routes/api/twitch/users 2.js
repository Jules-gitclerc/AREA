const axios = require("axios");
const twitchConfig = require('../../../config/api.json').twitch

async function getUsersBySearchKey(req, res, next) {
    try {
        const response = await axios.get(`https://api.twitch.tv/kraken/users?login=${req.query.name}`, {
            'headers': {
                'Accept': 'application/vnd.twitchtv.v5+json',
                'Client-ID': twitchConfig.clientId
            }
        });

        res.status(200).send(response.data);
    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: 'Err twitch API',
            err: err
        })
    }
}

module.exports = {
    getUsersBySearchKey
}