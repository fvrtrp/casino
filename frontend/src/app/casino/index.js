"use client"
import useSocket from './use-socket'
import useStore from './store';
import Lobby from './lobby';

export default function Home() {
  const { connect, isConnected, dataEvents, sendData } = useSocket();
  const room = useStore(state => state.room)
  const initHost = () => {
    sendData({
      type: 'host-room',
      data: {code: 420,},
    })
  }
  const onSubmit = (e) => {
    if(e) e.preventDefault()
    sendData({
      type: 'join-room',
      data: {code: 420, username: ''},
    })
  }

  // console.log(`zzz index`, room)
  return (
    <div>
      casino
      <br/>
      {/* <button onClick={connect}>Connect</button> */}
      {/* <button onClick={() => sendData('roomcode 69')}>Send</button> */}
      {
        !room ?
        <>
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
      </>
      :
      <Lobby />
      }

    </div>
  )
}
