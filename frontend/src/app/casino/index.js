"use client"
import useSocket from './use-socket'

export default function Home() {
  const { connect, isConnected, dataEvents, sendData } = useSocket();
  const initHost = () => {
    sendData({
      type: 'hostRoom',
      data: {code: 420,},
    })
  }
  const onSubmit = (e) => {
    if(e) e.preventDefault()
    sendData({
      type: 'joinRoom',
      data: {code: 420, username: 'suuu'},
    })
  }
  return (
    <div>
      casino
      <br/>
      {/* <button onClick={connect}>Connect</button> */}
      {/* <button onClick={() => sendData('roomcode 69')}>Send</button> */}
      <button onClick={() => initHost()}>Host</button>
      <div>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Enter room code here"
          />
          <button type="submit">Join</button>
        </form>
      </div>
    </div>
  )
}
