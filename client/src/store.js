import { configureStore, createSlice } from '@reduxjs/toolkit';

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    inGame: false,
    openShop: false,
    openLobbies: {},
    webSocket: null,
  },
  reducers: {
    toggleShop: (state) => {
      state.openShop = !state.openShop;
    },
    setInGame: (state, action) => {
      state.inGame = action.payload;
    },
    checkWebSocket: (state, action) => {
      state.webSocket = action.payload;
    },
    setOpenLobbies: (state, action) => {
      state.openLobbies = action.payload;
    }
  },
});

export const { toggleShop, setInGame, checkWebSocket, setOpenLobbies } = menuSlice.actions;

const store = configureStore({
  reducer: {
    menu: menuSlice.reducer,
  },
});

export default store;
