import { configureStore, createSlice } from '@reduxjs/toolkit';
const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    openShop: false,
    openLobbies: {},
    webSocket: null,
    playerName: "",
  },
  reducers: {
    toggleShop: (state) => {
      state.openShop = !state.openShop;
    },
    checkWebSocket: (state, action) => {
      state.webSocket = action.payload;
    },
    setOpenLobbies: (state, action) => {
      state.openLobbies = action.payload;
    },
    setLobbyExists: (state) => {
      state.lobbyExists = !state.lobbyExists;
    },
    setPlayerName: (state, action) => {
      state.playerName = action.payload;
    }
  },
});

export const { toggleShop, checkWebSocket, setOpenLobbies, setLobbyExists, setPlayerName } = menuSlice.actions;

const store = configureStore({
  reducer: {
    menu: menuSlice.reducer,
  },
});

export default store;
