import { create } from 'zustand'

const useStore = create((set) => ({
    username: null,
  config: null,
  room: null,
  setRoom: (payload) => set((state) => ({ room: payload })),
  clearRoom: () => set({ config: null }),
}))

export default useStore