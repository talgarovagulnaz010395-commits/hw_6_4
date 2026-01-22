import { create } from "zustand";
import { api } from "../api/axios.js";

export const useCartStore = create((set, get) => ({
    cart: [],
    isLoading: false,
    error: null,

    getCart: async () => {
       const res = await api.get("/cart");
       set ({cart: res.data});
    },

    addToCart: async (productId) => {
       await api.post("/cart", {productId , quantity: 1 });
       const res = await api.get("/cart");
       set({ cart: res.data });
        console.log(res.data);
    },

    removeFromCart: async (productId) => {
        await api.delete(`/cart/${productId}`);
        set((state) => ({
            cart: state.cart.filter((item) => item.productId !== productId),
        }) );


    },
}));
