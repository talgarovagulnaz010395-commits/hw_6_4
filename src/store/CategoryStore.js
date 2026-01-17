import {api} from "../api/axios.js";
import {create } from "zustand"

export const  useCategoryStore = create((set) => ({
    categories: [],
    isLoading: false,

    getCategories : async () => {
        set({isLoading: true});

        const res = await api.get("/categories");
        set({categories: res.data , isLoading: false});

    },
    createCategory : async (title) => {

        const res = await api.post("/categories/create", {title});
        set((state) => ({
            categories: [...state.categories, res.data],
        }))
    },
    clearCategories: () => {
        set({ categories: [] });
    },

}))