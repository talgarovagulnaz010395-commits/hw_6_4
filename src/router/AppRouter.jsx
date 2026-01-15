import { Routes, Route, Navigate } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login.jsx";
import { useAuthStore } from "../store/authStore.js";
import Profile from "../pages/Profile.jsx";

export function AppRouter() {
    const { isAuth } = useAuthStore();

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Profile />} />
        </Routes>
    );
}

export default AppRouter;
