import "../style/no-products.css";


export default function NoProductsComponent() {
    return (
        <div className="no-products-container">
            <img 
                src="/images/no-products.png" 
                alt="No se encontraron productos" 
                className="no-products-image"
                onError={(e) => e.target.src = "https://via.placeholder.com/150?text=Sin+Imagen"} // Imagen de respaldo
            />
            <h2 className="no-products-title">No encontramos productos</h2>
            <p className="no-products-text">Parece que no hay productos disponibles en este momento.</p>
        </div>
    );
}
