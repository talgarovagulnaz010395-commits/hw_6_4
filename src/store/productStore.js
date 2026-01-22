import { create } from "zustand";
import { api } from "../api/axios.js";

export const useProductStore = create((set) => ({
    products: [],
    productDetail: null,
    isLoading: false,

    getProducts: async () => {
        set({ isLoading: true });
        const res = await api.get("/products");
        set({ products: res.data, isLoading: false });
    },

    createProduct: async ({ title,category, description, image, price}) => {
        const res = await api.post("/products", { title,category, description, image,price });
        return res.data;
    },
    getProductById: async (productId) => {
        set({ isLoading: true });
        const res = await api.get(`/products/${productId}`);
        set({ productDetail: res.data, isLoading: false });
        },
}));
