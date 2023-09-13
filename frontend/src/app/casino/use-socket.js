import { useState, useEffect } from "react";
import { socket } from './socket';
import useStore from './store';

export default function useSocket() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [dataEvents, setDataEvents] = useState([]);
    const setRoom = useStore(state => state.setRoom)
    useEffect(() => {
        function onConnect() {
          setIsConnected(true);
        }
    
        function onDisconnect() {
          setIsConnected(false);
        }
    
        function onData(value) {
          //console.log(`zzz received data`, value)
          handleData(value)
          setDataEvents(previous => [...previous, value]);
        }
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('data', onData);
    
        return () => {
          socket.off('connect', onConnect);
          socket.off('disconnect', onDisconnect);
          socket.off('data', onData);
        };
      }, []);

    const connect = () => {
      socket.connect();
    }

    const sendData = (data) => {
      console.log(`zzz sending data`, data)
      socket.emit('data', data)
    }

    const handleData = (data) => {
      switch(data.type) {
        case 'update-room': {
          setRoom(data.room)
          break
        }
        case 'update': {
          console.log('zzz update: ', data.data)
          break
        }
        case 'room-joined': {
          setRoom(data.room)
          break
        }
        case 'error': {
          console.log(`zzz`, data.data)
          break
        }
        default: {
          console.log(`zzz received default`, data)
        }
      }
    }

    return { isConnected, dataEvents, connect, sendData };
}