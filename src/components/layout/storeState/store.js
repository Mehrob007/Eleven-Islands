import { create } from "zustand";
import axios from "axios";
import apiClient from "../../../utils/api";

export const usePhotoStore = create((set, get) => ({
  photos: [],
  // currentPage: 1,
  loading: false,
  fetchPhotos: async (params) => {
    const token = localStorage.getItem("token");
    const queryParams = new URLSearchParams();

    if (params.categoryId) {
      queryParams.append("categoryId", params.categoryId);
    }

    // if (params.month) {
    //     queryParams.append('month', params.month);
    // }
    if (params.sizeId) {
      queryParams.append("sizeId", params.sizeId);
    }
    if (params.filter) {
      queryParams.append("filter", params.filter);
    }
    // if (params.last_name) {
    //     queryParams.append('last_name', params.last_name);
    // }
    // if (params.middle_name) {
    //     queryParams.append('middle_name', params.middle_name);
    // }

    if (params.limit) {
      queryParams.append("limit", params.limit);
    }

    if (params.page || params.page === 0) {
      queryParams.append("page", params.page);
    }

    // if (!token) {
    //     console.warn("No token available. Cannot fetch photos.");
    //     return;
    // }

    set({ loading: true });
    try {
      // const response = await apiClient.get(`products?${queryParams}`, {
      //     headers: {
      //         Authorization: `Bearer ${token}`
      //     }
      // });
      // Product/get-all-products
      const response = await apiClient.get(`products?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // const newPhotos = response.data.products;
      const newPhotos = response.data.data.products;

      const uniquePhotos = newPhotos.filter(
        (newPhoto) => !get().photos.some((photo) => photo.id === newPhoto.id),
      );

      console.log("products", newPhotos);
      console.log("productFilter", uniquePhotos);

      set(() => ({
        photos: newPhotos,
      }));
      return true
    } catch (error) {
      set(() => ({
        photos: [],
      }));
      console.error("Error fetching photos:", error);
      return false
    } finally {
      set({ loading: false });
    }
  },
  // setFetching: (status) => set({ fetching: status }),
  findeElement: {},
  findeProduct: async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await apiClient.get(`products/full?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.data;
      set({ findeElement: data });
    } catch (e) {
      console.error(e);
    }
  },
}));
