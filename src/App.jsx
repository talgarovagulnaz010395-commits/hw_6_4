import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router/AppRouter.jsx";
import AppHeader from "./pages/Header.jsx";
import { useCartStore } from "./store/cartStore.js";

function App() {
    const { cart } = useCartStore();

    return (
        <BrowserRouter>
            <AppHeader cartCount={cart.length} />
            <AppRouter />
        </BrowserRouter>
    );
}

export default App;
