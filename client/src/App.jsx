import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './styles/global.css';
import NavBar from './global/NavBar.jsx';
import StartMenu from './mainpage/StartMenu';
import Game from './game/Game.jsx';
import Shop from './shop/Shop.jsx';
import Footer from './global/Footer.jsx';
import CreateGame from './lobby/CreateGame.jsx';
import GameLobby from './lobby/GameLobby.jsx';
import JoinLobby from './lobby/JoinLobby.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';
import WebSocketProvider from './WebSocketProvider.jsx';

function App() {
  const openShop = useSelector((state) => state.menu.openShop);

  return (
    <ErrorBoundary>
      <WebSocketProvider>
        <Router>
          <div>
            <NavBar />

            <Routes>
              <Route path="/" element={<StartMenu />} />
              <Route path="/create-game" element={<CreateGame />} />
              <Route path="/game-lobby/:gameId" element={<GameLobby />} />
              <Route path="/join-game" element={<JoinLobby />} />
              <Route path="/game/:gameId" element={<Game />} />
            </Routes>

            <Footer />

            {openShop ? <Shop /> : null}
          </div>
        </Router>
      </WebSocketProvider>
    </ErrorBoundary>
  );
}

export default App;
