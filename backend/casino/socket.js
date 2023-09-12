import { createRoom } from "./rooms.js";

let users = []
let room = null

function sendData(socketIO, data) {
    socketIO.emit('data', data)
  }

export function setEventListeners(socketIO) {
    socketIO.on('connection', (socket) => {
        console.log(`⚡: ${socket.id} user just connected!`)  
        sendData(socketIO, `You are connected, ${socket.id}`)
        socket.on("data", data => {
          console.log(`data from client`, data, socket.id)
          //socketIO.emit("messageResponse", data)
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
            room = createRoom(data.data)
            break
        }
        case 'joinRoom': {
            room.participants.push(data.data.username)
            break
        }
        default: {
            console.log(`invalid data`)
        }
    }
    console.log(`config now`, room)
}