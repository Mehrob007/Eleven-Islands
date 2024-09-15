import { create } from 'zustand';

export const useModalStore = create((set) => ({
    modalState: false,
    setModalState: (status) => set({ modalState: status }),
}))