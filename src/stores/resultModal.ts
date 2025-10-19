import { create } from 'zustand'


type ModalState = {
  open: boolean;
  type: any;
  openWith: (type: string) => void
  close: () => void
}

export const useResultModalStore = create<ModalState>((set, get) => ({
  open: false,
  type: null,
  openWith: (type: string) => set({ open: true, type }),
  close: () => set({ open: false }),
}))

export const Modal = {
  open: (type: string) => useResultModalStore.getState().openWith(type),
  close: () => useResultModalStore.getState().close(),
}
