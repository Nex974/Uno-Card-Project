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

            return () => {
                socket.onmessage = null;
            };
        }
    }, [socket, isConnected, dispatch]);

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-900 p-6">
            <h1 className="text-4xl font-bold text-white mb-6">Join a Lobby</h1>
            <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-lg p-4 ">
                <div className="max-h-96 overflow-y-auto space-y-4 custom-scrollbar">
                    <ul className="space-y-4">
                        {openLobbies.length > 0 ? (
                            openLobbies.map((lobby) => (
                                <li
                                    key={lobby.gameId}
                                    className="flex items-center justify-between bg-gray-700 rounded-lg p-4 shadow-md"
                                >
                                    <div>
                                        <h2 className="text-lg font-semibold text-white">
                                            {lobby.lobbyName}
                                        </h2>
                                        <p className="text-sm text-gray-400">
                                            {lobby.players.length}/{lobby.maxPlayers} players
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => navigate(`/game-lobby/${lobby.gameId}`)}
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-md shadow-sm transition duration-200"
                                    >
                                        Join Lobby
                                    </button>
                                </li>
                            ))
                        ) : (
                            <p className="text-center text-gray-400">No open lobbies available.</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default JoinLobby;
