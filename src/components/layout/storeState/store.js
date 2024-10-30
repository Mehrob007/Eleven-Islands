import { create } from 'zustand';
import axios from 'axios';
import apiClient from '../../../utils/api';

export const usePhotoStore = create((set, get) => ({
    photos: [],
    // currentPage: 1,
    loading: false,
    fetchPhotos: async (params) => {
        const token = localStorage.getItem('token');
        const queryParams = new URLSearchParams();

        if (params.CategoryId) {
            queryParams.append('CategoryId', params.CategoryId);
        }

        // if (params.month) {
        //     queryParams.append('month', params.month);
        // }
        // if (params.name) {
        //     queryParams.append('name', params.name);
        // }
        // if (params.last_name) {
        //     queryParams.append('last_name', params.last_name);
        // }
        // if (params.middle_name) {
        //     queryParams.append('middle_name', params.middle_name);
        // }

        if (params.limit) {
            queryParams.append('limit', params.limit);
        }
       
        if (params.page || params.page === 1) {
            queryParams.append('page', params.page);
        }

        if (!token) {
            console.warn("No token available. Cannot fetch photos.");
            return;
        }

        set({ loading: true });
        try {
            const response = await apiClient.get(`products?${queryParams}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const newPhotos = response.data.products;

            const uniquePhotos = newPhotos.filter(
                (newPhoto) => !get().photos.some((photo) => photo.id === newPhoto.id)
            );

            set(() => ({
                photos: uniquePhotos,
            }));
        } catch (error) {
            console.error("Error fetching photos:", error);
        } finally{
            set({ loading: false });
        }
    },
    // setFetching: (status) => set({ fetching: status }),
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
            set({ findeElement: data });
        } catch (e) {
            console.error(e);
        }
    },
}));