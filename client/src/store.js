import { configureStore, createSlice } from '@reduxjs/toolkit';

// Create a slice for game state
const gameSlice = createSlice({
  name: 'game', // Slice name
  initialState: {
    inGame: false,
    openShop: false,
    webSocket: false,
  },
  reducers: {
    toggleShop: (state) => {
      state.openShop = !state.openShop;
    },
    setInGame: (state, action) => {
      state.inGame = !state.inGame;
    },
    checkWebSocket: (state, action) => {
      state.webSocket = !state.webSocket
    }
  },
});

// Export actions for use in components
export const { toggleShop, setInGame, webSocket } = gameSlice.actions;

// Create store
const store = configureStore({
  reducer: {
    game: gameSlice.reducer, // You can add more slices here if needed
  },
});

export default store;
