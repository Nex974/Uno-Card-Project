import React, { useState } from 'react';

import NavBar from './mainpage/NavBar';
import CharacterSelect from './mainpage/CharacterSelect';
import StartMenu from './mainpage/StartMenu';
import Footer from './mainpage/Footer';
function App() {
  const [data, setData] = useState('');

  return (
    <div>
      <NavBar />
      <CharacterSelect />
      <StartMenu />
      <Footer />
    </div>
  );
}

export default App;