import "../style/create-product.css";
import { useState, useEffect } from "react";
import CreateProductAction from "../function/CreateProductAction"; // Asegúrate que esté bien la ruta

export default function CreateProduct() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch('https://dummyjson.com/products/categories');
                const data = await response.json();

                // ✅ Aseguramos que sean objetos con .name y .slug
                if (Array.isArray(data) && typeof data[0] === 'object') {
                    setCategories(data);
                } else {
                    // Si por alguna razón sigue siendo array de strings, los convertimos
                    const transformed = data.map(c => ({
                        name: c.charAt(0).toUpperCase() + c.slice(1),
                        slug: c,
                        url: `/categories/${c}`
                    }));
                    setCategories(transformed);
                }

            } catch (error) {
                console.error("Error al obtener categorías:", error);
                setCategories([]);
            }
        }

        fetchCategories();
    }, []);

    async function submitAction(e) {
        e.preventDefault();

        if (!productName || !description || !price || !selectedCategory) {
            setMessage("⚠️ Por favor completa todos los campos.");
            return;
        }

        const formData = {
            title: productName,
            description,
            price: parseFloat(price),
            category: selectedCategory
        };

        try {
            setSaving(true);
            setMessage('');
            const response = await CreateProductAction(formData);
            console.log("Producto enviado:", response);
            setMessage("✅ Producto creado exitosamente.");
            setProductName('');
            setDescription('');
            setPrice('');
            setSelectedCategory('');
        } catch (error) {
            setMessage("❌ Error al enviar el producto.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <div>
            <h1>Create Product</h1>
            {message && <p>{message}</p>}

            <form className="product-container" onSubmit={submitAction}>
                <p>Producto</p>
                <input
                    className="nombre"
                    type="text"
                    placeholder="Nombre del producto"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />

                <p>Descripción</p>
                <input
                    className="descripcion"
                    type="text"
                    placeholder="Descripción"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <div className="container-chiquito">
                    <p>Categoría</p>
                    <select
                        className="categoria"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        required
                    >
                        <option value="">Selecciona una categoría</option>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat.slug}>
                                {cat.name}
                            </option>
                        ))}
                    </select>

                    <p>Precio</p>
                    <input
                        className="nombre"
                        type="number"
                        placeholder="Precio"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        min="0"
                        step="0.01"
                    />
                </div>

                <button type="submit" disabled={saving}>
                    {saving ? "Saving..." : "Save"}
                </button>
            </form>
        </div>
    );
}
