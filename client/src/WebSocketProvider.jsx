import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { checkWebSocket } from './store';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3001');
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
      dispatch(checkWebSocket(true));
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
      dispatch(checkWebSocket(false));
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Listen for messages from the server
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case 'UPDATE_LOBBIES':
          console.log('Updated open lobbies:', message.payload); // Log the openLobbies array
          break;

        default:
          console.log('Unknown message type:', message.type);
      }
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        setIsConnected(false);
        dispatch(checkWebSocket(false));
      }
    };
  }, [dispatch]);

  return (
    <WebSocketContext.Provider value={socketRef.current}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};

export default WebSocketProvider;
