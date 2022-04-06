import logo from './logo.svg';
import './App.scss';

import React, { useState } from "react";
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './components/globalStyles';
import { lightTheme, darkTheme } from './components/Theme';

import Chat from "./components/Chat";
import Jumbotron from './components/Jumbotron';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';

function App() {

  const [theme, setTheme] = useState('light');

  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <div className="App">
        <GlobalStyles />
        <Navbar className='color-nav' variant={theme} sticky='top' expand="md">
          <Container>
            {/* <Navbar.Brand href="#home">GM</Navbar.Brand> */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#projects">Home</Nav.Link>
                <Nav.Link href="#about">Chat</Nav.Link>
              </Nav>
              <Navbar.Text>
                <Button onClick={themeToggler}>THEME</Button>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container>
          <Jumbotron />
          <Chat />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App
