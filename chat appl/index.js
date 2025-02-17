const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

// Create a new Express application
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Listen for new connections to Socket.io
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for chat messages
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  // Listen for disconnects
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 7000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});