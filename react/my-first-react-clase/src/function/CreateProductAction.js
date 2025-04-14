// OJO: "header" → debe ser "headers"
export default async function CreateProductAction(data) {
    const response = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: {  // ← CORREGIDO
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}
