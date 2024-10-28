import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import WrongLobby from './WrongLobby.jsx'

function GameLobby() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const lobbyExists = useSelector((state) => state.menu.lobbyExists);

  if (!lobbyExists) { 
    return <WrongLobby />;
  }
  return (
    <div>
      <h1 className="text-3xl font-bold text-center">Game ID: {gameId}</h1>
      {/* Game logic and UI go here */}
    </div>
  );
}

export default GameLobby;
