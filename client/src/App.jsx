import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from './mainpage/NavBar';
import StartMenu from './mainpage/StartMenu';
import Game from './mainpage/Game';
import Shop from './mainpage/Shop';
import Footer from './mainpage/Footer';

function App() {
  const inGame = useSelector((state) => state.inGame);
  const openShop = useSelector((state) => state.openShop);
  const dispatch = useDispatch();

  return (
    <div>
      <NavBar />
      {inGame ? <Game /> : <StartMenu />}
      {openShop ? <Shop /> : null}
      <Footer />
    </div>
  );
}

export default App;