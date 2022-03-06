const fctDataBase = require("../../tools/fctDBRequest");
const fctToken = require("../../tools/fctToken");
const moment = require("moment");

async function newConversation(req, res) {
    let dataToken = fctToken.getTokenData(req);

    try {
        let users = [dataToken.id]
        let name = ""
        req.body.forEach(elem => {
            users.push(elem.id);
            name += `${elem.username},`
        })
        await fctDataBase.request('INSERT INTO conversation(name, users) VALUES ($1, $2);', [name, users]);

        res.status(200).send({
            message: 'Done!'
        });
    } catch (err) {
        res.status(500).send({
            message: 'err bdd'
        })
    }
}

async function checkConversation(req, res, next) {
    let dataToken = fctToken.getTokenData(req);
    try {
        let users = [dataToken.id]
        let id = -1

        req.body.forEach(elem => users.push(elem.id))
        let data = await fctDataBase.request('SELECT * FROM conversation;', []);

        data.rows.forEach(elem => {
            if (elem.users.length === users.length) {
                let target = []
                let allUserIs = []

                elem.users.forEach(item => target.push(parseInt(item)))

                target.forEach((e) => {
                    if (users.find(p => p === e))
                        allUserIs.push(true)
                })
                if (allUserIs.length === users.length) {
                    id = parseInt(elem.id)
                }
            }
        })
        if (id >= 0)
            res.status(200).send({id: id})
        else
            next()
    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: 'err bdd'
        })
    }
}

async function getUserInfoConversation(req, res, next) {
    let dataToken = fctToken.getTokenData(req);
    try {
        let data = await fctDataBase.request('SELECT id, username, first_name, last_name, avatar FROM clients;', []);

        res.locals.conversation.forEach((item) => {
            let target = []

            item.users.forEach(elem => {
                if (parseInt(elem) !== dataToken.id)
                    target.push(data.rows.find(e => e.id === parseInt(elem)))
            })
            item.users = target;
        })
        next()
    } catch (err) {
        res.status(500).send({
            message: 'err bdd'
        })
    }
}

async function getConversation(req, res, next) {
    let dataToken = fctToken.getTokenData(req);
    try {
        let target = []
        let data = await fctDataBase.request('SELECT * FROM conversation;', []);

        data.rows.forEach((item) => {
            if (!!item.users.find(elem => parseInt(elem) === dataToken.id))
                target.push(item)
        })
        res.locals.conversation = target
        next()
    } catch (err) {
        res.status(500).send({
            message: 'err bdd'
        })
    }
}

async function getConversationByID(req, res, next) {
    try {
        let data = await fctDataBase.request('SELECT * FROM conversation WHERE id=$1;', [parseInt(req.params.id)]);

        res.locals.conversation = data.rows
        next()
    } catch (err) {
        res.status(500).send({
            message: 'err bdd'
        })
    }
}

async function linkUserWithMsgConv(req, res, next) {
    try {
        let data = await fctDataBase.request('SELECT id, username, first_name, last_name, avatar FROM clients;', []);

        res.locals.msg.forEach((item) => {
            let target = data.rows.find(e => e.id === parseInt(item.id_sender))

            item.sender = target;
        })
        res.status(200).send({
            conversation: res.locals.conversation[0],
            msg: res.locals.msg,
        })
    } catch (err) {
        res.status(500).send({
            message: 'err bdd'
        })
    }
}

async function getMsgByConv(req, res, next) {
    try {
        let data = await fctDataBase.request('SELECT * FROM messages WHERE id_conv=$1;', [parseInt(req.params.id)]);

        res.locals.msg = data.rows;
        next()
    } catch (err) {
        res.status(500).send({
            message: 'err bdd'
        })
    }
}

async function newMsgByConv(req, res, next) {
    let dataToken = fctToken.getTokenData(req);
    try {
        await fctDataBase.request('INSERT INTO messages(id_conv, id_sender, msg, date) VALUES ($1, $2, $3, $4);', [parseInt(req.params.id), dataToken.id, req.body.msg, `${moment().format('YYYY-MM-DDTHH:mm:ss')}`]);

        res.status(200).send({
            message: 'done!'
        })
        next()
    } catch (err) {
        res.status(500).send({
            message: 'err bdd'
        })
    }
}

module.exports = {
    newConversation,
    checkConversation,
    getConversation,
    getUserInfoConversation,
    getConversationByID,
    getMsgByConv,
    newMsgByConv,
    linkUserWithMsgConv
}