const WebSocket = require('ws');

function Message(_type, _data) {
  this.type = _type;
  this.data = _data;
}

const PORT = process.env.PORT || 3001;
const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    const message = JSON.parse(data);
    if (message.type === "1") {
      //data is a new fault
      //message.data.id = currentID++;
      //currentFaults.push(message.data);
    }
    else if (message.type === "2") {
      //data is id of fault to be removed
      //const arrayCopy = currentFaults.filter((row) => row.id !== message.data);
      //currentFaults.faults = arrayCopy;
    }
    //broadcast update to clients
    if(message.broadcast === true) {
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(new Message("", null)));
        }
      });
    }
  });
  //ws.send(JSON.stringify(new Message("current-faults", currentFaults)));
  //ws.send(JSON.stringify(new Message("available-faults", { All : availableFaults })));
});