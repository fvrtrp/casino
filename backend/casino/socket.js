import { createRoom } from "./rooms.js";
import { socketIO } from "../index.js";
let users = []
let room = null

function sendData(socket, data) {
    socket.emit('data', data)
}

function broadcastData(data) {
  socketIO.emit('data', data)
}

function throwError(data) {
  broadcastData({
    type: 'error',
    data,
  })
}

export function setEventListeners() {
    socketIO.on('connection', (socket) => {
        console.log(`⚡: ${socket.id} user just connected!`)  
        sendData(socket, `You are connected, ${socket.id}`)
        socket.on("data", data => {
          console.log(`data from client`, data, socket.id)
          socketIO.emit("messageResponse", data)
          handleData(data, socket)
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
}

export const handleData = (data, socket) => {
    switch(data.type) {
        case 'hostRoom': {
            room = createRoom(data.data, socket.id)
            sendData(socket, {
              type: 'Room created',
              data
            })
            break
        }
        case 'joinRoom': {
            const username = data.data.username ? data.data.username : socket.id
            room.participants.push({
              socketId: socket.id,
              username,
            })
            sendData(socket, {
              type: 'Room joined',
              data: room
            })
            broadcastData({
              type: 'update',
              data: `${username} joined`
            })
            break
        }
        default: {
            console.log(`invalid data`)
        }
    }
    console.log(`config now`, room)
}