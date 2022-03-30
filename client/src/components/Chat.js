import React, { useEffect, useState } from "react";

const URL = window.location.origin.replace(/^http/, 'ws');

function Message(_type, _data, _broadcast = true) {
    this.type = _type;
    this.data = _data;
    this.broadcast = _broadcast;
}

function Chat(props) {
    //const [url, setUrl] = useState(location.origin.replace(/^http/, 'ws'));
    const [ws, setWs] = useState(new WebSocket(URL));
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('Bob');

    function sendMessage(msg) {
        const message = new Message('chat-message', {
            sender: username,
            text: msg
        });
        ws.send(JSON.stringify(message));
    }

    useEffect(() => {
        ws.onopen = () => {
            console.log('WebSocket Connected.');
            sendMessage("This is the first test.");
            sendMessage("This is the second test.");
        }

        ws.onmessage = (e) => {
            const message = JSON.parse(e.data);
            console.log(message);
            if (message.type === "chat-update") {
                console.log("Message Type: chat-update");
                setMessages(message.data);
            }
        }

        return () => {
            ws.onclose = () => {
                console.log('WebSocket Disconnected');
                setWs(new WebSocket(URL));
            }
        }
    }, [ws.onmessage, ws.onopen, ws.onclose]);

    useEffect(() => {
        if (ws.readyState === WebSocket.OPEN) {
            console.log("websocket is OPEN");
            sendMessage("This is the first test.");
            sendMessage("This is the second test.");
        }
    }, [ws.readyState])

    return (
        <div>
            <h1>Message On The Wall</h1>
            <ul>
                {messages.map((msg, i) => {
                    <li>{msg.text}</li>
                })}
            </ul>
        </div>
    );
}

export default Chat;