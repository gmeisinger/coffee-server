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
                <svg onClick={themeToggler} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={theme === 'light' ? "currentColor" : "yellow"} className="bi bi-moon-fill" viewBox="0 0 16 16">
                  <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
                </svg>
                {/* <Button onClick={themeToggler}>THEME</Button> */}
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Jumbotron />
        <Chat />
      </div>
    </ThemeProvider>
  );
}

export default App
