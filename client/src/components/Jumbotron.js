import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import JumbotronImage from "../img/coffee-logo.png";

function Jumbotron() {
	return (
		<Container className="mb-1 pt-4">
			<Row className="justify-content-center">
				<Col md={3} lg={2} className="header-image-container mb-3 text-center">
					<Image className="header-image" src={JumbotronImage} roundedCircle fluid />
				</Col>
				<Col>
					<h1 className="header">Coffee Time</h1>
					<h3 className="header">George Meisinger</h3>
				</Col>
			</Row>
		</Container>
	);
}

export default Jumbotron;