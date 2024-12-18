import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleShop } from '../store';

function NavBar () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const openShop = useSelector((state) => state.menu.openShop);
  const userName = useSelector((state) => state.menu.playerName) 
  
  function handleSubmit(event) {
    event.preventDefault();
    navigate('/')
  }

  function handleOpenShop() {
    dispatch(toggleShop());
  };

    return (
<nav className="border-gray-200 dark:bg-gray-900 dark:border-gray-700">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    {/* Logo */}
    <button onClick={handleSubmit} className="!flex !items-center !space-x-3 !rtl:space-x-reverse !bg-transparent !p-0">
        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">edno</span>
    </button>
    {/* Username */}
    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Hello, {userName ? userName : 'Player'}!</span>
    {/* Shop */}
      <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
        <button
  onClick={handleOpenShop}
  className={`${openShop ? 'invisible' : ''} block !py-2 !px-3 !text-gray-900 !rounded !hover:bg-gray-100 !md:hover:bg-transparent !md:border-0 !md:hover:text-blue-700 !md:p-0 !dark:text-white !md:dark:hover:text-blue-500 !dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-white`}
>
  Open Shop
</button>
        </li>
        
      </ul>
  </div>
</nav>
);
}

export default NavBar;