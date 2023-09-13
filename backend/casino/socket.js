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
        console.log(`${socket.id} connected.`)  
        sendData(socket, {
          type: 'socketId',
          id: socket.id,
        })
        socket.on("data", data => {
          console.log(`data from client`, data, socket.id)
          socketIO.emit("messageResponse", data)
          handleData(data, socket)
        })
     
        socket.on('disconnect', () => {
          console.log(`${socket.id} disconnected.`);
          if(roomExists()) {
            const targetUser = room.players.filter(i => i.socketId === socket.id)
            room.players = room.players.filter(i => i.socketId !== socket.id)
            broadcastData({
              type: 'update',
              data: `${targetUser?.username} left`
            })
          }
          socket.disconnect()
        });
    });
}

export const handleData = (data, socket) => {
    switch(data.type) {
        case 'set-game': {
          broadcastData({
            type: 'set-game',
            index: data.index,
          })
          break
        }
        case 'host-room': {
            room = createRoom(data.data, socket.id)
            sendData(socket, {
              type: 'update-room',
              room
            })
            break
        }
        case 'join-room': {
            const username = data.data.username ? data.data.username : socket.id
            if(!roomExists()) {
              sendData(socket, {
                type: 'error',
                data: 'Room doesn\'t exist',
              })
            }
            else {
              room.players.push({
                socketId: socket.id,
                username,
              })
              broadcastData({
                type: 'update-room',
                room,
              })
              broadcastData({
                type: 'update',
                data: `${username} joined`
              })
            }
            break
        }
        default: {
            console.log(`invalid data`)
        }
    }
    console.log(`config now`, room)
}

function roomExists() {
  return room && Object.keys(room).length > 0
}