const WebSocket = require('ws');
const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 3001;

function Message(_type, _data) {
    this.type = _type;
    this.data = _data;
}

let chat = {
    messages: [],
    clients: []
};

const server = express()
    .use(express.static(path.resolve(__dirname, '../client/build')))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));


const wss = new WebSocket.Server({ server });

function broadcast(data) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(data) {
        const message = JSON.parse(data);
        if (message.type === "chat-message") {
            chat.messages.push(message.data);
            broadcast(new Message('chat-update', chat.messages));
            console.log(new Message('chat-update', chat.messages))
        }
    });
54
});