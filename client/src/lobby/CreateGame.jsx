import React, { useEffect, useState } from 'react';

function CreateGame() {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:3001');

    newSocket.onopen = () => {
      console.log('WebSocket connection established');
      setIsConnected(true);
    };

    newSocket.onmessage = (event) => {
      console.log('Message from server:', event.data);
    };

    newSocket.onerror = (error) => {
      console.error('WebSocket error:', error);
      setError('WebSocket connection error. Please try again.');
    };

    newSocket.onclose = () => {
      console.log('WebSocket connection closed');
      setIsConnected(false);
      setError('WebSocket connection closed.');
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (socket && isConnected) {
      const lobbyData = {
        lobbyName: event.target.lobbyName.value,
        turnTime: event.target.turnTime.value,
        maxPlayers: event.target.maxPlayers.value,
      };

      if (lobbyData.lobbyName.trim() === '') {
        setError('Lobby name cannot be empty.');
        return;
      }

      socket.send(JSON.stringify(lobbyData));
      event.target.reset();
      setError(null);
    } else {
      console.error('WebSocket is not open yet.');
      setError('WebSocket is not open yet.');
    }
  };  

  return (
    <div className="max-w-md mx-auto bg-gray-200 p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Game Setup</h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>} {/* Error message display */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Lobby Name */}
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

        {/* Round Time */}
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

        {/* Max Players */}
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

        {/* Submit Button */}
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
