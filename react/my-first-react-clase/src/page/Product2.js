import "../style/product2.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

async function getProductById(id) {
    try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) throw new Error("Producto no encontrado");
        const product = await response.json();
        return product;
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
}

export default function Product2() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        async function fetchProduct() {
            const data = await getProductById(id);
            setProduct(data);
        }

        // ✅ Cargar carrito desde localStorage
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);

        fetchProduct();
    }, [id]);

    // ✅ Calcular el total actual del carrito
    const getTotalCartValue = (cart) => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const addToCart = () => {
        let updatedCart = [...cart];

        const existingProduct = updatedCart.find(item => item.id === product.id);

        // ✅ Validar existencia antes de agregar
        if (existingProduct) {
            if (existingProduct.quantity + quantity > product.stock) {
                alert("No puedes agregar más de la existencia disponible.");
                return;
            }
            existingProduct.quantity += quantity;
        } else {
            if (updatedCart.length >= 5) {
                alert("No puedes tener más de 5 productos diferentes en el carrito.");
                return;
            }

            updatedCart.push({ 
                id: product.id,
                title: product.title,
                description: product.description,
                price: product.price,
                stock: product.stock,
                quantity: quantity,
                images: product.images
            });
        }

        // ✅ Validar límite de $10,000 con el carrito actualizado
        const newTotal = getTotalCartValue(updatedCart) + product.price * quantity;

        if (newTotal > 10000) {
            alert("No puedes superar los $10,000 en total en el carrito.");
            return;
        }

        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("cartUpdated"));
    };

    const increaseQuantity = () => {
        if (quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    if (!product) return <p>Loading...</p>;

    return (
        <div className="product-detail">
            <div className="product-info">
                <h1>{product.title}</h1>
                <p>Product ID: {product.id}</p>
                <p>{product.description}</p>
                <p className="product-price">$ Precio: ${product.price}</p>
                <p className="product-stock">Existencias: {product.stock} unidades</p>

                {product.images && product.images.length > 0 ? (
                    <div className="product-image">
                        <img src={product.images[0]} alt={product.title} />
                    </div>
                ) : (
                    <p>No image available</p>
                )}

                <div className="quantity-control">
                    <button className="quantity-btn" onClick={decreaseQuantity}>➖</button>
                    <input type="text" value={quantity} readOnly className="quantity-input" />
                    <button 
                        className="quantity-btn"
                        onClick={increaseQuantity}
                        disabled={quantity >= product.stock} 
                    >➕</button>
                </div>


                <button 
                    className="add-to-cart-button"
                    onClick={addToCart}
                    disabled={
                        quantity > product.stock || 
                        cart.length >= 5 || 
                        getTotalCartValue(cart) + product.price * quantity > 10000
                    }
                >
                    Agregar al carrito
                </button>
            </div>
        </div>
    );
}
