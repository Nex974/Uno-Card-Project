import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useWebSocket } from '../WebSocketProvider';

function CreateGame() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useWebSocket();
  const isConnected = socket && socket.readyState === WebSocket.OPEN;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isConnected) {
      const lobbyData = {
        type: 'CREATE_LOBBY',
        payload: {
          lobbyName: event.target.lobbyName.value,
          turnTime: parseInt(event.target.turnTime.value, 10),
          maxPlayers: parseInt(event.target.maxPlayers.value, 10),
        },
      };
      socket.send(JSON.stringify(lobbyData));
      navigate('/join-game')
      
    } else {
      console.error('WebSocket is not connected');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-200 p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Game Setup</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Lobby Name</label>
          <input
            type="text"
            id="lobbyName"
            className="text-gray-700 mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-600"
            placeholder="Enter Lobby Name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Time per turn (5-15 seconds)</label>
          <input
            type="number"
            id="turnTime"
            className="text-gray-700 mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-600"
            placeholder="Enter seconds"
            min="5"
            max="15"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Max Players</label>
          <input
            type="number"
            id="maxPlayers"
            className="text-gray-700 mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-600"
            placeholder="Enter max players"
            min="2"
            max="4"
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-500 focus:outline-none focus:ring focus:ring-purple-600"
            disabled={!isConnected}
          >
            {isConnected ? "Create Game" : "Loading..."}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateGame;
