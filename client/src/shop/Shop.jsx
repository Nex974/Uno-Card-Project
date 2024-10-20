import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { toggleShop } from '../store';

function Shop() {
    const dispatch = useDispatch();
    const openShop = useSelector((state) => state.game.openShop);

    function handleShopToggle() {
        dispatch(toggleShop())
    }

    
    return <button onClick={handleShopToggle} className="!absolute !top-[100px] !left-[20px]">Close Shop</button>;
}

export default Shop;