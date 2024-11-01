import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenLobbies } from '../store';
import { useWebSocket } from '../WebSocketProvider';
import fetchLobbies from '../utils/UpdateLobbies';
import WrongLobby from './WrongLobby.jsx';

function GameLobby() {
    const { gameId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const socket = useWebSocket();
    const isConnected = useSelector((state) => state.menu.webSocket);
    const openLobbies = useSelector((state) => state.menu.openLobbies);
    const [lobbyExists, setLobbyExists] = useState(false);

    useEffect(() => {
        if (socket) {
            fetchLobbies(socket, dispatch, isConnected, setOpenLobbies);
        }
    }, [socket, dispatch]);

    useEffect(() => {
        const exists = Object.values(openLobbies).some((lobby) => lobby.gameId === gameId);
        setLobbyExists(exists);
    }, [gameId, openLobbies]);

    if (!lobbyExists) { 
        return <WrongLobby />;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-center">Game ID: {gameId}</h1>
            {/* Game logic and UI go here */}
        </div>
    );
}

export default GameLobby;
