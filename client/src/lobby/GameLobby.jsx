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
        console.log(gameId)
    }, [gameId, openLobbies]);

    if (!lobbyExists) { 
        return <WrongLobby />;
    }

    return (
      <div className="grid place-items-center min-h-screen" style={{ marginTop: '-75px' }}>
            {/* Lobby Box */}
            <div className="relative w-80 h-80 border-4 border-gray-700 rounded-lg bg-gray-800" >
                
                {/* Player Slots */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-gray-700 rounded-md flex items-center justify-center m-4">
                    <span className="text-lg font-semibold">Player 1</span>
                </div>
                
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-700 rounded-md flex items-center justify-center m-4">
                    <span className="text-lg font-semibold">Player 2</span>
                </div>
                
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gray-700 rounded-md flex items-center justify-center m-4">
                    <span className="text-lg font-semibold">Player 3</span>
                </div>
                
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gray-700 rounded-md flex items-center justify-center m-4">
                    <span className="text-lg font-semibold">Player 4</span>
                </div>

                {/* Start Button*/}
                <button className="absolute w-20 h-20 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-bold flex items-center justify-center z-20"
                    style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    Start
                </button>
            </div>
        </div>
    );
}

export default GameLobby;
