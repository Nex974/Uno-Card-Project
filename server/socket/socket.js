const WebSocket = require('ws');
const openLobbies = [];
const clients = new Set();

function handleWebSocketConnection(ws) {
  clients.add(ws);

  ws.on('message', (message) => {
    const data = JSON.parse(message);

    ws.on('close', () => {
      clients.delete(ws);
    });

    switch (data.type) {
      case 'CREATE_LOBBY':
        createLobby(ws, data); //pass ws for the redirectToLobby message
        break;

      case 'FETCH_LOBBIES':
        fetchLobbies();
        break;

      default:
        console.log('Unknown message type:', data.type);
        return;
    }
  });
}

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
    type: 'LOBBY_CREATED',
    payload: { gameId },
  });
  ws.send(sendId);
}

function fetchLobbies() {
  const availableLobbies = JSON.stringify({
    type: 'UPDATE_LOBBIES',
    payload: openLobbies,
  });

  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(availableLobbies);
    }
  });
}

function generateGameId() {
  return Math.random().toString(36).substring(2, 10);
}

module.exports = { handleWebSocketConnection };
