import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function StartMenu() {
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
    <div>
      <h1>Start Menu</h1>
      <button onClick={startGame}>{inGame ? 'Leave Game' : 'Start Game'}</button>
      <button onClick={toggleShop}>{openShop ? 'Close Shop' : 'Open Shop'}</button>
    </div>
  );
};

export default StartMenu;