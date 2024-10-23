const WebSocket = require('ws');
const openLobbies = [];
const clients = new Set();

function handleWebSocketConnection(ws) {
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    clients.add(ws);

    ws.on('close', () => {
      clients.delete(ws); // Remove the client from the set on disconnect
    });

    switch (data.type) {
      case 'CREATE_LOBBY':
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
        console.log('Current open lobbies:', openLobbies); // Log on server side

        // Broadcast updated openLobbies to all connected clients
        const availableLobbies = JSON.stringify({
          type: 'UPDATE_LOBBIES',
          payload: openLobbies,
        });

        clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(availableLobbies);
          }
        });
        break;

      default:
        console.log('Unknown message type:', data.type);
        return;
    }
  });
}

function generateGameId() {
  return Math.random().toString(36).substring(2, 10);
}

module.exports = { handleWebSocketConnection };
