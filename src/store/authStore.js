import { create } from "zustand";
import { api } from "../api/axios.js";

export const useAuthStore = create((set) => ({
    user: null,
    isLoading: false,
    error: null,

    register: async (data) => {
        set({ isLoading: true, error: null });
        try {
            await api.post("/auth/register", data);
            set({ isLoading: false });
            return true;
        } catch (err) {
            set({
                error: err.response?.data?.message || "Register failed",
                isLoading: false,
            });
            return false;
        }
    },

    login: async (data) => {
        set({ isLoading: true, error: null });
        try {
            const res = await api.post("/auth/login", data);

            localStorage.setItem("accessToken", res.data.token.accessToken);
            localStorage.setItem("refreshToken", res.data.token.refreshToken);

            set({ user: res.data.user, isLoading: false });
            return true;
        } catch (err) {
            set({
                error: err.response?.data?.message || "Login failed",
                isLoading: false,
            });
            return false;
        }
    },

    logout: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        set({ user: null });
    },
}));
