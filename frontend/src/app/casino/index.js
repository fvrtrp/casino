"use client"
import useSocket from './use-socket'

export default function Home() {
  const { isConnected, fooEvents } = useSocket();
  return (
    <div>
      Casino {String(isConnected)} is the status
    </div>
  )
}
