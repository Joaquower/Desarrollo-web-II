import { useEffect, useState } from "react";
import ProductItem from "../components/ProductItem";
import LoadingComponent from "../components/LoadingComponents";
import NoProductsComponent from "../components/NoProductsComponent";

export default function ProductsList() {
    const [products, setProducts] = useState([]); // Estado para productos
    const [word, setWord] = useState(""); // Estado para búsqueda
    const [loading, setLoading] = useState(false); // Solo se activa al buscar
    const [imagesLoaded, setImagesLoaded] = useState(0); // Contador de imágenes cargadas

    // ✅ Cargar productos desde la API
    useEffect(() => {
        async function fetchProducts() {
            // Solo mostrar "Cargando productos..." cuando se usa el buscador
            if (word) {
                setLoading(true);
            }

            setImagesLoaded(0); // Reiniciar contador de imágenes

            try {
                const url = word
                    ? `https://dummyjson.com/products/search?q=${word}`
                    : "https://dummyjson.com/products";

                const response = await fetch(url);
                const data = await response.json();
                console.log("📦 Productos recibidos:", data.products.length);
                setProducts(data.products || []);
            } catch (error) {
                console.error("❌ Error fetching products:", error);
                setProducts([]);
            } finally {
                setLoading(false); // ✅ Quitar "Cargando productos..." cuando termina la búsqueda
            }
        }

        fetchProducts();
    }, [word]);

    // ✅ Contador de imágenes cargadas (no es necesario para la primera carga)
    const handleImageLoad = () => {
        setImagesLoaded((prev) => prev + 1);
    };

    return (
        <div className="products-container">
            {/*uscador */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar producto..."
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    className="search-input"
                />
            </div>

            {/*Contenedor de productos */}
            <div className="container-products">
                {loading ? (
                    <LoadingComponent />
                ) : products.length > 0 ? (
                    products.map((product) => (
                        <ProductItem key={product.id} product={product} onImageLoad={handleImageLoad} />
                    ))
                ) : (
                    <NoProductsComponent /> 
                )}
            </div>

        </div>
    );
}
