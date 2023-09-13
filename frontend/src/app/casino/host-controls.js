import React from 'react'
import useStore from './store'
import useSocket from './use-socket'

export default function HostControls() {
    // const setCurrentGameIndex = useStore(state => state.setCurrentGameIndex)
    const currentGameIndex = useStore(state => state.currentGameIndex)

    const { sendData } = useSocket()

    const startGames = () => {
        sendData({
            type: 'set-game',
            index: 0
        })
    }

    console.log(`zzz host controls`, currentGameIndex)

    return (
        <button onClick={startGames}>
            Start
        </button>
    )
}