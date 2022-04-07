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
					<Card.Text className="message-text">{props.text}</Card.Text>
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
			{props.messages.map((msg, i) => <ChatMessage key={i} sender={msg.sender} text={msg.text} isYou={props.username === msg.sender} repeatSender={i > 0 && msg.sender === props.messages[i - 1].sender} />)}
		</div>
	);
}

function ChatInput(props) {
	return (
		<div className="chat-input-container">
			<Form>
				<Form.Group controlId="formMessage">
					{/* <Form.Label>Message </Form.Label> */}
					<Stack direction="horizontal" gap={3}>
						<Form.Control as="textarea" rows="2" style={{ resize: "none" }} className="chat-input" onKeyDown={props.handleMessageKeyDown} autoComplete="off" type="text" />
						<Button className="send-button">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
								<path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
							</svg>
						</Button>
					</Stack>
				</Form.Group>
			</Form>
		</div>
	);
}

function Chat(props) {
	const [ws, setWs] = useState(new WebSocket(LOCAL_URL));
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
			else if (message.type === 'set-username') {
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
		<div className="chat">
			{/* <h1>Coffee Chat</h1> */}
			<ChatFeed messages={messages} username={username} />
			<ChatInput
				handleChangeUsername={handleChangeUsername}
				handleMessageKeyDown={handleMessageKeyDown}
				username={username}
			/>
		</div>
	);
}

export default Chat;