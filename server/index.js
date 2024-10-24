const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { handleWebSocketConnection } = require('./socket/socket');

const app = express();
const server = http.createServer(app);
const PORT = 3001;

app.use(express.json());

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('New client connected'); // Log when a new client connects
  handleWebSocketConnection(ws);
  
  // Optional: Handle client disconnection
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
