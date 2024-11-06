import store from '../store';
import { checkWebSocket } from '../store';

const socket = new WebSocket('ws://localhost:3001');

socket.onopen = () => {
  console.log('Connected to WebSocket');
  store.dispatch(checkWebSocket(true));
};

socket.onclose = () => {
  console.log('Disconnected from WebSocket');
  store.dispatch(checkWebSocket(false));
};

socket.onerror = (error) => console.error('WebSocket error:', error);

export default socket;
