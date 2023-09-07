const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = 2000

// app.get('/', (req, res) => {
//   res.send('<h1>Hello universe</h1>');
// });

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

server.listen(PORT, () => {
  console.log('listening on *:', PORT);
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.broadcast.emit('chat message', 'user joined');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
      });
  });