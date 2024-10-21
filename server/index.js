const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { handleWebSocketConnection } = require('./socket/socket');
const gameRoutes = require('./routes/gameRoutes');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const PORT = 3001;

app.use(express.json());
app.use('/api/game', gameRoutes);

wss.on('connection', (ws) => {
  handleWebSocketConnection(ws);
});

server.listen(PORT, () => {
  console.log(`Game server running on port ${PORT}`);
});
