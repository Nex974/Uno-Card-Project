import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenLobbies } from '../store';
import { useWebSocket } from '../WebSocketProvider';
import { useNavigate } from 'react-router-dom';
import fetchLobbies from '../utils/UpdateLobbies';

function JoinLobby() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const socket = useWebSocket();
    const isConnected = useSelector((state) => state.menu.webSocket);
    const openLobbies = useSelector((state) => state.menu.openLobbies);

    useEffect(() => {
        if (socket) {
            fetchLobbies(socket, dispatch, isConnected, setOpenLobbies);

            // Cleanup function to avoid memory leaks
            return () => {
                socket.onmessage = null; // Clean up the message handler
            };
        }
    }, [socket, isConnected, dispatch]);

    return (
        <div>
            <h1 className="text-center">Join Lobby</h1>
            <div>
                <ul>
                    {openLobbies.length > 0 ? (
                        openLobbies.map((lobby) => (
                            <li key={lobby.gameId} className='text-center'>
                                {lobby.lobbyName} - {lobby.players.length}/{lobby.maxPlayers} players
                                <button onClick={() => navigate(`/game-lobby/${lobby.gameId}`)}>
                                    Join Lobby
                                </button>
                            </li>
                        ))
                    ) : (
                        <p className='text-center'>No open lobbies available.</p>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default JoinLobby;
