import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenLobbies } from '../store';
import { useWebSocket } from '../WebSocketProvider';

function JoinLobby() {
  const dispatch = useDispatch();
  const socket = useWebSocket();
  const isConnected = useSelector((state) => state.menu.webSocket);
  const openLobbies = useSelector((state) => state.menu.openLobbies);

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === 'UPDATE_LOBBIES') {
          dispatch(setOpenLobbies(message.payload));
          console.log('Lobbies updated:', message.payload);
        }
      };

      if (isConnected) {
        const fetchLobbiesMessage = JSON.stringify({ type: 'FETCH_LOBBIES' });
        socket.send(fetchLobbiesMessage);
      }
    }

    return () => {
      if (socket) {
        socket.onmessage = null;
      }
    };
  }, [socket, isConnected, dispatch]);

  return (
    <div>
      <h1>Join Lobby</h1>
      <ul>
        {openLobbies.length > 0 ? (
          openLobbies.map((lobby) => (
            <li key={lobby.gameId}>
              {lobby.lobbyName} - {lobby.maxPlayers} players
            </li>
          ))
        ) : (
          <p>No open lobbies available.</p>
        )}
      </ul>
    </div>
  );
}

export default JoinLobby;
