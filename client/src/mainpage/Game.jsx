import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import carImage from '../styles/car.jpg'

function Game() {
    const dispatch = useDispatch();
    const inGame = useSelector((state) => state.inGame);
    const openShop = useSelector((state) => state.openShop);

  const startGame = () => {
    dispatch({ type: 'TOGGLE_GAME' });
  };
  const toggleShop = () => {
    dispatch({ type: 'TOGGLE_SHOP' });
  };

    return (
<div className="grid place-items-center min-h-screen">
  <div className="flex font-sans">
  <div class="flex-none w-56 relative">
    <img src={carImage} alt="" class="absolute inset-0 w-full h-full object-cover rounded-lg" loading="lazy" />
  </div>
    <form className="flex-auto p-6">
      <div className="flex flex-wrap">
        <div className="w-full flex-none mt-2 order-1 text-5xl font-bold text-violet-600">
          edno
        </div>
      </div>
      <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
        <div className="space-x-2 flex text-sm font-bold"></div>
      </div>
      <div className="flex space-x-4 mb-5 text-sm font-medium">
        <div className="flex-auto flex space-x-4">
          <button className="h-10 px-6 font-semibold rounded-full bg-violet-600 text-white" type="submit">
            Join Game
          </button>
          <button className="h-10 px-6 font-semibold rounded-full border border-slate-200 text-slate-900" type="button">
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
)}
export default Game;

//<button onClick={startGame}>Leave Game</button>
//<button onClick={toggleShop}>{openShop ? 'Close Shop' : 'Open Shop'}</button>