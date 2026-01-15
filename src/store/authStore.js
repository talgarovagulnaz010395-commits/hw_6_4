import { create } from "zustand";
import { api } from "../api/axios";

export const useAuthStore = create((set) => ({
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuth: false,
    isLoading: false,
    error: null,

    register: async (data) => {
        try {
            set({ isLoading: true, error: null });

            await api.post("/auth/register", data);

            return true;
        } catch (error) {
            set({
                error: error.response?.data?.message || "Registration failed",
            });
            return false;
        } finally {
            set({ isLoading: false });
        }
    },

    login: async (data) => {
        try {
            set({ isLoading: true, error: null });

            const res = await api.post("/auth/login", {
                email: data.email,
                password: data.password,
            });

            console.log("Login Response", res.data);

            set({
                user: res.data.user,
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken,
                isAuth: true,
            });

            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);

            return true;
        } catch (error) {
            set({
                error: error.response?.data?.message || "Login failed",
            });
            return false;
        } finally {
            set({ isLoading: false });
        }
    },
    logout: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuth: false,
        });
    },
}));
