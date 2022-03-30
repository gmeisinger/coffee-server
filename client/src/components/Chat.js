import React, { useEffect, useState } from "react";

//const URL = location.origin.replace(/^http/, 'ws');

function Message(_type, _data, _broadcast = true) {
    this.type = _type;
    this.data = _data;
    this.broadcast = _broadcast;
}

function Chat(props) {
    const [url, setUrl] = useState(location.origin.replace(/^http/, 'ws'));
    const [ws, setWs] = useState(new WebSocket(url));

    useEffect(() => {
        ws.onopen = () => {
            console.log('WebSocket Connected.');
        }

        ws.onmessage = (e) => {
            const message = JSON.parse(e.data);
            console.log(message);
            if(message.type === "1") {
                console.log("Message Type 1");
            }
            else if (message.type === "2") {
                console.log("Message Type 2");
            }
        }

        return () => {
            ws.onclose = () => {
                console.log('WebSocket Disconnected');
                setWs(new WebSocket(URL));
            }
        }
    }, [ws.onmessage, ws.onopen, ws.onclose]);

    return (
        <h1>Hello from Chat</h1>
    );
}

export default Chat;