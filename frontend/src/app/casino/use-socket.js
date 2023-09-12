import { useState, useEffect } from "react";
import { socket } from './socket';

export default function useSocket() {
    const [isConnected, setIsConnected] = useState(socket.connected);
  const [dataEvents, setDataEvents] = useState([]);
    useEffect(() => {
        function onConnect() {
          setIsConnected(true);
        }
    
        function onDisconnect() {
          setIsConnected(false);
        }
    
        function onData(value) {
          console.log(`zzz received data`, value)
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

    return { isConnected, dataEvents, connect, sendData };
}