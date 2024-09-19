import { create } from 'zustand';
import axios from 'axios';

export const usePhotoStore = create((set, get) => ({
    photos: [],
    currentPage: 1,
    fetching: false,
    fetchPhotos: async (limit, page) => {
        console.log('fetching');
        const token = localStorage.getItem('token');

        if (!token) {
            console.warn("No token available. Cannot fetch photos.");
            return;
        }

        set({ fetching: true });
        try {
            const response = await axios.get(`https://elevenislands.ru/api/products?Limit=${limit}&Page=${page}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const newPhotos = response.data.products;

            const uniquePhotos = newPhotos.filter(
                (newPhoto) => !get().photos.some((photo) => photo.id === newPhoto.id)
            );

            set((state) => ({
                photos: [...state.photos, ...uniquePhotos],
                currentPage: state.currentPage + 1,
                fetching: false
            }));
        } catch (error) {
            console.error("Error fetching photos:", error);
            set({ fetching: false });
        }
    },
    setFetching: (status) => set({ fetching: status }),
    findeElement: {},
    findeProduct: async (id) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`https://elevenislands.ru/api/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = response.data.products[0];
            // console.log(data);
            set({ findeElement: data });
        } catch (e) {
            console.error(e);
        }
    },
}));