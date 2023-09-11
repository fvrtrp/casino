"use client"
import useSocket from './use-socket'

export default function Home() {
  const { connect, isConnected, dataEvents, sendData } = useSocket();
  return (
    <div>
      Casino {String(isConnected)} is the status
        <button onClick={connect}>Connect</button>
        <button onClick={() => sendData('roomcode 69')}>Send</button>
    </div>
  )
}
