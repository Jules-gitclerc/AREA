let tabSocket = []

function newSocketConnected(socket, idUser) {
    let target = tabSocket.find(elem => elem.idUser === idUser);

    if (target) {
        target.socket = socket;
    } else {
        tabSocket.push({socket: socket, idUser: idUser});
    }
}

function socketDisconnected(idSocket) {
    let index = tabSocket.findIndex(elem => elem.socket.id === idSocket);

    if (index >= 0) {
        tabSocket.splice(index, 1);
    }
}

module.exports = function (io) {
    io.on('connection', (socket) => {
        newSocketConnected(socket, socket.handshake.query.idUser);
        console.log('a user connected');
        socket.on("disconnect", () => {
            socketDisconnected(socket.id);
            console.log(socket.id, 'disconnect'); // undefined
        });
    });
}


