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
export const dataBasketItems = create((set) => ({
    dataBasket: [],
    setDataBasket: (status) => set({ dataBasket: status }),
}))
const loadFromLocalStorage = () => {
    const savedData = localStorage.getItem('dataGelary');
    return savedData ? JSON.parse(savedData) : [];
  };
  
  export const dataGelaryStore = create((set) => ({
    dataGelary: loadFromLocalStorage(),
    setDataGelary: (status) => {
      set({ dataGelary: status });
      // Сохраняем в localStorage
      localStorage.setItem('dataGelary', JSON.stringify(status));
    },
  }));