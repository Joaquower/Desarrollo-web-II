import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../style/menu.css";

export default function Menu() {
    const location = useLocation();
    const restringidos = ["/login"];
    const [cartCount, setCartCount] = useState(0);


    useEffect(() => {
        const updateCartCount = () => {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0); // Sumar cantidades
            setCartCount(totalItems);
        };

        updateCartCount();
        

        window.addEventListener("cartUpdated", updateCartCount);

        return () => window.removeEventListener("cartUpdated", updateCartCount);
    }, []);

    return (
        <>
            {restringidos.indexOf(location.pathname) === -1 && (
                <header className="App-header">
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/products">Products</Link></li>
                            <li><Link to="/login">Login</Link></li>
                            <li className="cart-icon">
                                <Link to="/cart">Carrito 
                                    {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </header>
            )}
        </>
    );
}
