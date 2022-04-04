import React, { useEffect, useState } from "react";

import { Form, Button, Container, Row, Col, Stack, Card } from "react-bootstrap";

const URL = window.location.origin.replace(/^http/, 'ws');
const LOCAL_URL = "ws://127.0.0.1:4001";

function Message(_type, _data, _broadcast = true) {
	this.type = _type;
	this.data = _data;
	this.broadcast = _broadcast;
}

function ChatMessage(props) {
	let classString = "message-block";
	if (props.isYou) {
		classString = "message-block is-user";
	}

	return (
		<div className="message-row">
			<div className="message-block">
				<Card className={props.isYou ? "chat-message rounded is-user" : "chat-message rounded"}>
					{!props.repeatSender && !props.isYou && <Card.Title className="sender-text">{props.sender}</Card.Title>}
					<Card.Text>{props.text}</Card.Text>
				</Card>
			</div>
		</div>
		// <Stack direction="horizontal" gap={2} className="chat-message">
		// 	<div className="sender-text">{props.sender}: </div>
		// 	<div className="message-text">{props.text}</div>
		// </Stack>
	);
}

function ChatFeed(props) {
	return (
		<div className="chat-feed">
			<div className="chat-container">
				{props.messages.map((msg, i) => <ChatMessage key={i} sender={msg.sender} text={msg.text} isYou={props.username === msg.sender} repeatSender={i > 0 && msg.sender === props.messages[i - 1].sender} />)}
			</div>
		</div>
	);
}

function ChatInput(props) {
	return (
		<Form>
			<Form.Group controlId="formUsername">
				<Form.Label>Username </Form.Label>
				<Form.Control
					defaultValue={props.username}
					onChange={props.handleChangeUsername}
					autoComplete="off"
					type="text" />
			</Form.Group>
			<Form.Group controlId="formMessage">
				<Form.Label>Message </Form.Label>
				<Form.Control onKeyDown={props.handleMessageKeyDown} autoComplete="off" type="text" />
			</Form.Group>
		</Form>
	);
}

function Chat(props) {
	const [ws, setWs] = useState(new WebSocket(URL));
	const [messages, setMessages] = useState([]);
	const [username, setUsername] = useState('');

	function sendMessage(msg) {
		const message = new Message('chat-message', {
			sender: username,
			text: msg
		});
		ws.send(JSON.stringify(message));
	}

	function handleChangeUsername(event) {
		console.log(event.target.value);
		const message = new Message('set-username', {
			oldName: username,
			newName: event.target.value
		});
		setUsername(event.target.value);
		ws.send(JSON.stringify(message));
	}

	function handleMessageKeyDown(event) {
		if (event.key === 'Enter') {
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
			else if(message.type === 'set-username') {
				setUsername(message.data);
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
			<h1>Coffee Chat</h1>
			<ChatInput
				handleChangeUsername={handleChangeUsername}
				handleMessageKeyDown={handleMessageKeyDown}
				username={username}
			/>
			<hr />
			<ChatFeed messages={messages} username={username} />
		</div>
	);
}

export default Chat;