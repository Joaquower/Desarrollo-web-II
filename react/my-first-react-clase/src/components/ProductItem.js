import "../style/products.css";
import { useNavigate } from "react-router-dom";

export default function ProductItem({ product, onImageLoad }) {
    console.log("Renderizando ProductItem:", product);

    const navigate = useNavigate();
    const imageUrl = product.images && product.images.length > 0 ? product.images[0] : "";

    return (
        <div className="product-list-item">
            <div className="product-image">
                {imageUrl ? (
                    <img
                        key={product.id}  
                        src={imageUrl}
                        alt={product.title}
                        onLoad={() => {
                            console.log(`Imagen cargada: ${product.title}`);
                            onImageLoad();
                        }}
                        onError={() => console.log(`Error cargando imagen: ${product.title}`)}
                    />
                ) : (
                    <p>No hay imagen disponible</p>
                )}
            </div>
            <div className="product-details">
                <h4>{product.id} - {product.title}</h4>
                <p>{product.description}</p>


                <p className="product-price">$ {product.price}</p>

                <button
                    className="view-product-button"
                    onClick={() => navigate(`/products2/${product.id}`)}
                >
                    Ver Producto
                </button>
            </div>
        </div>
    );
}
