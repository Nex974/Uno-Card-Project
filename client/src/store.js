import { configureStore, createSlice } from '@reduxjs/toolkit';

// Create a slice for game state
const gameSlice = createSlice({
  name: 'game', // Slice name
  initialState: {
    inGame: false,
    openShop: false,
  },
  reducers: {
    toggleShop: (state) => {
      // Redux Toolkit allows direct state mutation because it uses Immer under the hood
      state.openShop = !state.openShop;
    },
    setInGame: (state, action) => {
      // Example for setting the in-game state
      state.inGame = action.payload;
    },
  },
});

// Export actions for use in components
export const { toggleShop, setInGame } = gameSlice.actions;

// Create store
const store = configureStore({
  reducer: {
    game: gameSlice.reducer, // You can add more slices here if needed
  },
});

export default store;
