import React from 'react';

function CreateGame() {
    return (
        <div className="max-w-md mx-auto bg-gray-200 p-6 rounded-lg shadow-md mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Game Setup</h2>
          <form className="space-y-4">
            {/* Lobby Name */}
            <div>
              <label htmlFor="lobbyName" className="block text-sm font-medium text-gray-700">
                Lobby Name
              </label>
              <input
                type="text"
                id="lobbyName"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-600"
                placeholder="Enter Lobby Name"
                required
              />
            </div>
    
            {/* Lobby ID */}
            <div>   
              <label htmlFor="lobbyId" className="block text-sm font-medium text-gray-700">
                Lobby ID
              </label>
              <input
                type="text"
                id="lobbyId"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-600"
                placeholder="Enter Lobby ID"
                required
              />
            </div>
    
            {/* Round Time */}
            <div>
              <label htmlFor="roundTime" className="block text-sm font-medium text-gray-700">
                Round Time (in seconds)
              </label>
              <input
                type="number"
                id="roundTime"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-600"
                min="10"
                max="120"
                required
              />
            </div>
    
            {/* Max Players */}
            <div>
              <label htmlFor="maxPlayers" className="block text-sm font-medium text-gray-700">
                Max Players
              </label>
              <input
                type="number"
                id="maxPlayers"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-600"
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
              >
                Create Game
              </button>
            </div>
          </form>
        </div>
      );
}

export default CreateGame;