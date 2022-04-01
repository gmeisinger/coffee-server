import logo from './logo.svg';
import './App.scss';

import Chat from "./components/Chat";
import Jumbotron from './components/Jumbotron';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Container>
        <Jumbotron />
        <Chat />
      </Container>
    </div>
  );
}

export default App
