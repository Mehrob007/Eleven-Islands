import { create } from 'zustand';

export const useModalStore = create((set) => ({
    modalState: false,
    setModalState: (status) => set({ modalState: status }),
}))
export const useModalSeatch = create((set) => ({
    modalStateSeatch: false,
    setModalStateSeatch: (status) => set({ modalStateSeatch: status }),
}))
export const useModalFilter = create((set) => ({
    modalStateFilter: false,
    setModalStateFilter: (status) => set({ modalStateFilter: status }),
}))
export const useModalReset = create((set) => ({
    modalStateReset: false,
    setModalStateReset: (status) => set({ modalStateReset: status }),
}))
export const useModalNav = create((set) => ({
    modalStateNav: false,
    setModalStateNav: (status) => set({ modalStateNav: status }),
}))