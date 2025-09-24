import { create } from 'zustand'

type SheetPayload = {
  title?: string
  car?: any
  link: string
  image: string
  side?: 'top' | 'right' | 'bottom' | 'left'
}

type SheetState = {
  open: boolean
  payload: SheetPayload | null
  openWith: (payload: SheetPayload) => void
  close: () => void
  toggle: (payload?: SheetPayload) => void
}

export const useSheetStore = create<SheetState>((set, get) => ({
  open: false,
  payload: null,
  openWith: (payload) => set({ open: true, payload }),
  close: () => set({ open: false }),
  toggle: (payload) => {
    const { open } = get()
    if (open) set({ open: false })
    else set({ open: true, payload: payload ?? get().payload })
  },
}))

export const Sheet = {
  open: (payload: SheetPayload) => useSheetStore.getState().openWith(payload),
  close: () => useSheetStore.getState().close(),
  toggle: (payload?: SheetPayload) => useSheetStore.getState().toggle(payload),
}
