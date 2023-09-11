import { useState, useEffect } from "react";
import { socket } from './socket';

export default function useSocket() {
    const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
    useEffect(() => {
        function onConnect(payload) {
          console.log(`zzz connected!`, payload)
          setIsConnected(true);
        }
    
        function onDisconnect() {
          setIsConnected(false);
        }
    
        function onFooEvent(value) {
          setFooEvents(previous => [...previous, value]);
        }
        console.log(`zzz socketobj`, socket)
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('foo', onFooEvent);
    
        return () => {
          socket.off('connect', onConnect);
          socket.off('disconnect', onDisconnect);
          socket.off('foo', onFooEvent);
        };
      }, []);


    return { isConnected, fooEvents };
}