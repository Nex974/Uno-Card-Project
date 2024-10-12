import { configureStore } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  inGame: false,
  openShop: false,
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_SHOP':
      return { ...state, openShop: !state.openShop };
    default:
      return state;
  }
};

// Create store
const store = configureStore({
  reducer,});

export default store;