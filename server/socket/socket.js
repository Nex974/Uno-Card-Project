const openLobbies = []; // Array to store open lobbies

function handleWebSocketConnection(ws) {
  ws.on('message', (message) => {
    const data = JSON.parse(message);

    switch (data.type) {
      case 'CREATE_LOBBY':
        const { lobbyName, turnTime, maxPlayers } = data.payload;
        const gameId = generateGameId(); // Generate Game ID
        const newLobby = {
          gameId,
          lobbyName,
          turnTime,
          maxPlayers,
          players: [],
        };

        openLobbies.push(newLobby); // Save lobby to openLobbies array

        // Notify all players in the lobby
        notifyLobbyPlayers(newLobby.gameId, {
          type: 'LOBBY_CREATED',
          payload: newLobby,
        });
        break;

      // Handle other message types as necessary
      default:
        console.log('Unknown message type:', data.type);
    }
  });
}

function notifyLobbyPlayers(lobbyId, message) {
  const lobby = openLobbies.find(lobby => lobby.gameId === lobbyId);
  if (lobby) {
    lobby.players.forEach(player => {
      player.ws.send(JSON.stringify(message));
    });
  }
}

function generateGameId() {
  return Math.random().toString(36).substring(2, 10); // Generates a random string
}

module.exports = { handleWebSocketConnection };
