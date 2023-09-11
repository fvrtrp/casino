const express = require("express")
const app = express()
const cors = require("cors")
const http = require('http').Server(app);
const PORT = 2000
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

app.use(cors())
let users = []

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`)  
    sendData(socket, `You are connected, ${socket.id}`)
    socket.on("data", data => {
      console.log(`data from client`, data, socket.id)
      //socketIO.emit("messageResponse", data)
    })

    socket.on("typing", data => (
      socket.broadcast.emit("typingResponse", data)
    ))

    socket.on("newUser", data => {
      users.push(data)
      socketIO.emit("newUserResponse", users)
    })
 
    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
      users = users.filter(user => user.socketID !== socket.id)
      socketIO.emit("newUserResponse", users)
      socket.disconnect()
    });
});

function sendData(socket, data) {
  socketIO.emit('data', data)
}

// app.get("/api", (req, res) => {
//   res.json({message: "Hello"})
// });

   
http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});