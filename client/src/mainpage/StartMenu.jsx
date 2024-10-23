import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CharacterSelect from './CharacterSelect';

function StartMenu() {
  const [playerName, setPlayerName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleInputChange(event) {
    setPlayerName(event.target.value);
  }

  function createGame(event) {
    event.preventDefault();
    navigate('/create-game')
  }
  function joinGame(event) {
    event.preventDefault();
    navigate('/join-game')
  }
  function homeScreen(event) {
    event.preventDefault();
    navigate('/')
  }

  return (
    <div className="grid place-items-center min-h-screen" style={{ marginTop: '-40px' }}>
      <div className="flex font-sans">
        <div className="flex-none w-80" style={{ marginTop: '-70px' }}>
          <CharacterSelect />
        </div>
        <form className="flex-auto px-9">
          <div className="flex flex-wrap">
            <div onClick={homeScreen} className="w-full flex-none mt-2 mb-6 order-1 text-5xl font-bold text-violet-600">
              edno
            </div>
          </div>
          <div className="mt-5 mb-1 pb-6">
            <input
              type="text"
              id="playerName"
              name="playerName"
              className="mt-1 block w-full px-3 py-2 text-violet-600 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
              placeholder="Your username"
              value={playerName}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex space-x-4 mb-5 text-sm font-medium">
            <div className="flex-auto flex space-x-4">
              <button
                className="flex items-center h-10 px-6 font-semibold rounded-full bg-violet-600 text-white"
                type="submit"
                onClick={joinGame}
              >
                Join Game
              </button>
              <button
                className="bg-sky-400 flex items-center h-10 px-6 font-semibold rounded-full border border-slate-200 text-slate-900"
                type="button"
                onClick={createGame}
              >
                Create Game
              </button>
            </div>
          </div>
          <p className="text-sm text-slate-500">
            Game is still in development!
          </p>
        </form>
      </div>
    </div>
  );
}

export default StartMenu;
