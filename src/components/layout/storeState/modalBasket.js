import { create } from 'zustand';

export const useModalStore = create((set) => ({
    modalState: false,
    setModalState: (status) => set({ modalState: status }),
}))
export const useModalSeatch = create((set) => ({
    modalStateSeatch: false,
    setModalStateSeatch: (status) => set({ modalStateSeatch: status }),
}))