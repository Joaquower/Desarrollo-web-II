import { useEffect, useState } from "react";
import "../style/cart.css";

export default function Cart() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    const removeOneFromCart = (productId) => {
        let updatedCart = cart.map(item => {
            if (item.id === productId) {
                return { ...item, quantity: item.quantity - 1 }; 
            }
            return item;
        }).filter(item => item.quantity > 0); 

        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("cartUpdated")); 
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("cart");
        window.dispatchEvent(new Event("cartUpdated"));
    };

    return (
        <div className="cart-container">
            <h1>Carrito de Compras</h1>

            {cart.length === 0 ? (
                <p className="empty-cart">Tu carrito está vacío.</p>
            ) : (
                <div>
                    <ul className="cart-list">
                        {cart.map((product) => (
                            <li key={product.id} className="cart-item">
                                <img src={product.images[0]} alt={product.title} className="cart-image" />
                                <div className="cart-details">
                                    <h3>{product.title}</h3>
                                    <p>{product.description}</p>
                                    <p>Cantidad: {product.quantity}</p>
                                    <button className="remove-button" onClick={() => removeOneFromCart(product.id)}>
                                        Eliminar 1
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    
                    <button className="clear-cart-button" onClick={clearCart}>
                        Vaciar Carrito
                    </button>
                </div>
            )}
        </div>
    );
}
