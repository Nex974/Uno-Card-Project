const WebSocket = require('ws');
const openLobbies = [];
const clients = new Set();

function lobbySockets(ws, data) {
  clients.add(ws);

  ws.on('close', () => {
    clients.delete(ws);
  });


switch (data.action) {
    case 'CREATE_LOBBY':
      createLobby(ws, data);
    break;

    case 'FETCH_LOBBIES':
      fetchLobbies(ws);
    break;

    default:
      console.log('Unknown message action:', data.action);
    return;
    }
  };


function createLobby(ws, data) {
  const { lobbyName, turnTime, maxPlayers } = data.payload;
  const gameId = generateGameId();
  const newLobby = {
    gameId,
    lobbyName,
    turnTime,
    maxPlayers,
    players: [],
  };
  openLobbies.push(newLobby);
  console.log('Current open lobbies:', openLobbies);
  redirectToLobby(ws, gameId);
}

function redirectToLobby(ws, gameId) {
  const sendId = JSON.stringify({
    action: 'LOBBY_CREATED',
    payload: { gameId },
  });
  ws.send(sendId);
}



function fetchLobbies(ws) {
  const availableLobbies = JSON.stringify({
    action: 'UPDATE_LOBBIES',
    payload: openLobbies,
  });
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(availableLobbies);
  }
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(availableLobbies);
    }
  });
}

function generateGameId() {
  return Math.random().toString(36).substring(2, 10);
}

module.exports = { lobbySockets };
