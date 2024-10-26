import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLobbyExists } from '../store';

function GameLobby() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lobbyExists = useSelector((state) => state.menu.lobbyExists);
  const isConnected = useSelector((state) => state.menu.webSocket);
  const openLobbies = useSelector((state) => state.menu.openLobbies);

  useEffect(() => {
  }, [gameId]);

  // If the lobby does not exist, navigate to a "Not Found" page or show an error; TODO: SPLIT INTO ERROR COMPONENT!
  if (!lobbyExists) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold">Lobby not found or closed.</h1>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Go back to Lobby List
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center">Game ID: {gameId}</h1>
      {/* Game logic and UI go here */}
    </div>
  );
}

export default GameLobby;
