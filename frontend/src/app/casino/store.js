import { create } from 'zustand'

const useStore = create((set) => ({
  username: null,
  id: null,
  status: 'init',
  room: null,
  gameList: ['3', '1'],
  currentGameIndex: -1,
  setUsername: (payload) => set(state => ({ username: payload })),
  setId: (payload) => set(state => ({ id: payload })),
  setRoom: (payload) => set((state) => ({ room: payload })),
  setStatus: (payload) => set((state) => ({ status: payload })),
  clearRoom: () => set({ config: null }),
  setGameList: (payload) => set(state => ({ gameList: payload })),
  setCurrentGameIndex: (payload) => set(state => ({ currentGameIndex: payload })),
}))

export default useStore