import React, { useEffect, useState } from "react";

import { Form, Button } from "react-bootstrap";

const URL = window.location.origin.replace(/^http/, 'ws');
const LOCAL_URL = "ws://127.0.0.1:3001";

function Message(_type, _data, _broadcast = true) {
	this.type = _type;
	this.data = _data;
	this.broadcast = _broadcast;
}

function ChatMessage(props) {
	return (
		<div>
			<span className="sender-text">{props.sender}: </span>
			<span className="message-text">{props.text}</span>
		</div>
	);
}

function ChatHistory(props) {
	return (
		<div>
			{props.messages.map((msg, i) => <ChatMessage key={i} sender={msg.sender} text={msg.text} />)}
		</div>
	);
}

function ChatInput(props) {
	return (
		<Form>
			<Form.Group className="mb-3" controlId="formUsername">
				<Form.Label>Username </Form.Label>
				<Form.Control
					defaultValue={props.username}
					onChange={props.handleChangeUsername}
					autoComplete="off"
					type="text" />
			</Form.Group>
			<Form.Group className="mb-3" controlId="formMessage">
				<Form.Label>Message </Form.Label>
				<Form.Control onKeyDown={props.handleMessageKeyDown} autoComplete="off" type="text" />
			</Form.Group>
		</Form>
	);
}

function Chat(props) {
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

	function handleChangeUsername(event) {
		console.log(event.target.value);
		setUsername(event.target.value);
	}

	function handleMessageKeyDown(event) {
		if(event.key === 'Enter') {
			sendMessage(event.target.value);
			event.target.value = '';
		}
	}

	useEffect(() => {
		ws.onopen = () => {
			console.log('WebSocket Connected.');
		}

		ws.onmessage = (e) => {
			const message = JSON.parse(e.data);
			if (message.type === "chat-update") {
				console.log("Message Type: chat-update");
				setMessages(message.data);
				console.log(message.data);
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
		<div>
			<h1>Message On The Wall</h1>
			<ChatInput
				handleChangeUsername={handleChangeUsername}
				handleMessageKeyDown={handleMessageKeyDown}
				username={username}
			/>
			<ChatHistory messages={messages} />
		</div>
	);
}

export default Chat;