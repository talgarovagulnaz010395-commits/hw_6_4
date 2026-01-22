import { Routes, Route, Navigate } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import { useAuthStore } from "../store/authStore";
import { Products } from "../pages/Products.jsx";
import Cart from "../pages/Cart.jsx";
import {ProductDetail} from "../pages/ProductDetail.jsx";

export function AppRouter() {
    const { isAuth } = useAuthStore();

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products/:id" element={<ProductDetail/>}></Route>
            <Route
                path="/"
                element={<Navigate to={isAuth ? "/profile" : "/login"} />}
            />
        </Routes>
    );
}
