import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './styles/global.css';
import NavBar from './mainpage/NavBar';
import StartMenu from './mainpage/StartMenu';
import Game from './mainpage/Game';
import Shop from './mainpage/Shop';
import Footer from './mainpage/Footer';
import CreateGame from './mainpage/CreateGame';
import GameLobby from './mainpage/GameLobby';
import JoinLobby from './mainpage/JoinLobby';
import ErrorBoundary from './ErrorBoundary.jsx';

function App() {
  const openShop = useSelector((state) => state.openShop);

  return (
    <ErrorBoundary>
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

          {openShop ? <Shop /> : null}

          <Footer />

        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
