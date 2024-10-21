const { createLobby, joinLobby, notifyLobbyPlayers, getOpenLobbies } = require('./lobby');
const { startGame, playCard } = require('./game');

function handleWebSocketConnection(ws) {
  console.log('New player connected');

  ws.on('message', (message) => {
    const parsedMessage = JSON.parse(message);
    handleGameMessage(ws, parsedMessage);
  });

  ws.on('close', () => {
    console.log('Player disconnected');
    handlePlayerDisconnection(ws);
  });
}

function handleGameMessage(ws, message) {
  const { action, lobbyName, maxPlayers, playerId } = message;

  switch (action) {
    case 'createLobby':
      const lobbyId = createLobby(lobbyName, maxPlayers, playerId);
      ws.send(JSON.stringify({ action: 'lobbyCreated', lobbyId }));
      break;

    case 'joinLobby':
      const joinResult = joinLobby(message.lobbyId, playerId);
      if (joinResult.success) {
        ws.send(JSON.stringify({ action: 'joinedLobby', lobbyId: message.lobbyId }));
        notifyLobbyPlayers(message.lobbyId, { action: 'playerJoined', playerId });
      } else {
        ws.send(JSON.stringify({ action: 'error', message: joinResult.message }));
      }
      break;

    // Handle game actions
    case 'startGame':
      startGame(message.gameId);
      break;

    default:
      ws.send(JSON.stringify({ action: 'error', message: 'Unknown action' }));
  }
}

function handlePlayerDisconnection(ws) {
  // Handle player disconnection logic here
}

module.exports = {
  handleWebSocketConnection,
};
