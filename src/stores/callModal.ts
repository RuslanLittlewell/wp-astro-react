import { create } from 'zustand'


type SheetState = {
  open: boolean
  openWith: () => void
  close: () => void
}

export const useModalStore = create<SheetState>((set, get) => ({
  open: false,
  payload: null,
  openWith: () => set({ open: true }),
  close: () => set({ open: false }),
}))

export const Sheet = {
  open: () => useModalStore.getState().openWith(),
  close: () => useModalStore.getState().close(),
}
