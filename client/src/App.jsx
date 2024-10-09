import React, { useState } from 'react';
import NavBar from './mainpage/NavBar';
import StartMenu from './mainpage/StartMenu';
import Footer from './mainpage/Footer';
import Shop from './mainpage/Shop'
function App() {
  const [inGame, setInGame] = useState(false);
  const [openShop, toggleShop] = useState(true);

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