const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { lobbySockets } = require('./socket/global');
const { gameSockets } = require('./socket/game');

const app = express();
const server = http.createServer(app);
const PORT = 3001;

app.use(express.json());

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('New client connected');
  ws.on('message', (message) => {
    const parsedMessage = JSON.parse(message);
    
    if (parsedMessage.type === 'LOBBY') {
      lobbySockets(ws, parsedMessage);
    } else if (parsedMessage.type === 'GAME') {
      gameSockets(ws, parsedMessage);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

wss.on('error', (error) => {
  console.error('WebSocket error:', error);
});

server.on('error', (error) => {
  console.error('HTTP server error:', error);
});

server.listen(PORT, () => {
  console.log(`Game server running on port ${PORT}`);
});
