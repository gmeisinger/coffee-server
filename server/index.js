const WebSocket = require('ws');
const path = require('path');
const express = require('express');
const ChatManager = require('./chat-manager');

const PORT = process.env.PORT || 4001;

function Message(_type, _data) {
    this.type = _type;
    this.data = _data;
}

//--------------------------------------------------------------------------

let chat = new ChatManager();

//---------------------------------------------------------------------------

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
            chat.addMessage(message.data);
            broadcast(new Message('chat-update', chat.messages));
            console.log(new Message('chat-update', chat.messages))
        }
    });
    ws.send(JSON.stringify(new Message('chat-update', chat.messages)));

    // add new client
    let newClient = { name: chat.generateUsername() };
    ws.send(JSON.stringify(new Message('set-username', newClient.name)));
    chat.clients.push(newClient);
});