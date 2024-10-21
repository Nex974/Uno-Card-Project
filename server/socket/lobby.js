const openLobbies = []; // Array to keep track of open lobbies

// Create a new lobby
function createLobby(lobbyName, maxPlayers, playerId) {
  const lobbyId = Math.random().toString(36).substr(2, 9); // Generate unique lobby ID
  openLobbies.push({ lobbyId, lobbyName, maxPlayers, players: [playerId] });
  return lobbyId;
}

// Join an existing lobby
function joinLobby(lobbyId, playerId) {
  const lobby = openLobbies.find(lobby => lobby.lobbyId === lobbyId);

  if (lobby && lobby.players.length < lobby.maxPlayers) {
    lobby.players.push(playerId);
    return { success: true, message: 'Joined lobby', lobbyId };
  } else {
    return { success: false, message: 'Lobby full or not found' };
  }
}

// Broadcast updates to all players in a lobby
function notifyLobbyPlayers(lobbyId, message) {
  const lobby = openLobbies.find(lobby => lobby.lobbyId === lobbyId);
  if (lobby) {
    lobby.players.forEach(player => {
      player.ws.send(JSON.stringify(message));
    });
  }
}

// Get all open lobbies
function getOpenLobbies() {
  return openLobbies;
}

module.exports = {
  createLobby,
  joinLobby,
  notifyLobbyPlayers,
  getOpenLobbies,
};
