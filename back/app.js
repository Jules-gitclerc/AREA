const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const http = require("http");
const Server = require("socket.io");
require('dotenv').config()
const {Telegraf} = require("telegraf");
const token = '5160965468:AAHAcyYNrKYWrRCR_9eOfYl94Z6DIWSk7KM';

const indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about/about');
const authRouter = require('./routes/auth/auth');
const usersRoute = require('./routes/users/users');
const servicesRouter = require('./routes/services/services');
const apiWeatherRouter = require('./routes/api/weather/weather');
const apiLocationRouter = require('./routes/api/location/location');
const weatherRouter = require('./routes/weather/weather');
const dashboardRouter = require('./routes/dashboard/dashboard');
const downloadRouter = require('./routes/download/download');
const ARRouter = require('./routes/actionReaction/actionReaction');
const apiTwitchRouter = require('./routes/api/twitch/twitch');
const apiTwitterRouter = require('./routes/api/twitter/twitter');
const apiSpotifyRouter = require('./routes/api/spotify/spotify');

const messageRouter = require('./routes/message/message');

const apiRedditRouter = require('./routes/api/reddit/reddit');

const app = express();
const server = http.createServer(app);
const io = Server(server, {origins: '*:*'});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', aboutRouter);
app.use('/auth', authRouter);
app.use('/users', usersRoute);
app.use('/services', servicesRouter);
app.use('/api/weather', apiWeatherRouter);
app.use('/api/location', apiLocationRouter);
app.use('/weather', weatherRouter);
app.use('/dashboard', dashboardRouter);
app.use('/download', downloadRouter);
app.use('/AR', ARRouter);
app.use('/twitter', apiTwitterRouter);
app.use('/spotify', apiSpotifyRouter);
app.use('/msg', messageRouter);

app.use('/reddit', apiRedditRouter);

let myUser = []
let myGroup = []

const bot = new Telegraf(token)
bot.command('start', (ctx) => {
    ctx.reply('Initialize')
    if (ctx.chat.username)
        myUser.push(ctx.chat)
    if (ctx.chat.title)
        myGroup.push(ctx.chat)
    ctx.reply('User Save !')
})
//bot.launch()

require('./bot_discord/app');
require('./bot_telegram/app')
//require('./socket/socket')(io);


function loopAR(i) {
    setTimeout(async () => {
        await require('./twitch/twitch').reloadStreamsManagement();
        await require('./twitter/twitter').reloadTweetsManagement();
        await require('./spotify/spotify').reloadSpotifyManagement();
        await require('./clashRoyale/clashRoyale').reloadCRManagement();
        loopAR(++i);
    }, 10000)
}

loopAR(0);

server.listen(8080, () => {
    console.log('listening on *:8080');
});

module.exports = {
    myGroup,
    myUser
};
