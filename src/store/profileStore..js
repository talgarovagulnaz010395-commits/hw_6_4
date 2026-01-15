import { create } from "zustand"

export const useProfileStore = create((set)=> ({
        getProfile: async() => {
            const res = await api.get("/profile")
            return res.data;
        }
    }
))