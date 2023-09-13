import useStore from './store'
import useSocket from './use-socket'

export default function Lobby() {
  const { connect, isConnected, dataEvents, sendData } = useSocket();
  const room = useStore(state => state.room)

  console.log(`zzz lobby`, room)
  
  return (
    <div className="p-6">
      This is the lobby
      <div>Code: {room?.code}</div>
      <div>Host: {room?.host}</div>
      <div>
        <div>players:</div>
        {
          !room?.players || room?.players.length===0 && 'None'
        }
        {
          room?.players.map((player) => {
            return (
              <div key={player.socketId}>{player.socketId}</div>
            )
          })
        }
      </div>
    </div>
  )
}
