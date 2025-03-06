document.addEventListener("DOMContentLoaded", function () {
    const productosLista = document.getElementById("productos_lista");
    const agregarBtn = document.getElementById("agregar_producto");
    const nombreProductoInput = document.getElementById("nombre_producto");
    const precioProductoInput = document.getElementById("precio_producto");
    const fechaInicioInput = document.getElementById("fecha_inicio");
    const fechaFinInput = document.getElementById("fecha_fin");
    const localidadSelect = document.getElementById("localidad");
    const csrfToken = document.getElementById("csrf_token").value;

    // Cargar lista de productos al inicio
    function cargarProductos() {
        fetch("/productos/lista/")
            .then(response => response.json())
            .then(data => {
                productosLista.innerHTML = ""; // Limpiar lista
                data.productos.forEach(prod => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${prod.name}</td>
                        <td>${prod.precio}</td>
                        <td>${prod.fecha_inicio || "N/A"}</td>
                        <td>${prod.fecha_fin || "N/A"}</td>
                        <td>${prod.localidad__name}</td>
                        <td><button class="eliminar" data-id="${prod.id}">Eliminar</button></td>
                    `;
                    productosLista.appendChild(row);
                });
            })
            .catch(error => console.error("Error cargando productos:", error));
    }

    // Agregar nuevo producto
    agregarBtn.addEventListener("click", function () {
        const nombre = nombreProductoInput.value;
        const precio = precioProductoInput.value;
        const localidad = localidadSelect.value;
        const fechaInicio = fechaInicioInput.value;
        const fechaFin = fechaFinInput.value;

        if (!nombre || !precio || !localidad || !fechaInicio || !fechaFin) {
            alert("Todos los campos son obligatorios");
            return;
        }
        if (precio <= 0) {
            alert("El precio del producto debe ser mayor a 0");
            return;
        }
        

        fetch("/productos/agregar/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken
            },
            body: JSON.stringify({
                name: nombre,
                precio: precio,
                localidad: localidad,
                fecha_inicio: fechaInicio,
                fecha_fin: fechaFin
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Producto agregado exitosamente");
                nombreProductoInput.value = "";
                precioProductoInput.value = "";
                fechaInicioInput.value = "";
                fechaFinInput.value = "";
                cargarProductos(); // Recargar lista
            } else {
                alert("Error: " + data.error);
            }
        })
        .catch(error => console.error("Error al agregar producto:", error));
    });

    // Eliminar producto (delegación de eventos)
    productosLista.addEventListener("click", function (event) {
        if (event.target.classList.contains("eliminar")) {
            const productoId = event.target.getAttribute("data-id");
            if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
                fetch(`/productos/eliminar/${productoId}/`, {
                    method: "DELETE",
                    headers: { "X-CSRFToken": csrfToken }
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert("Producto eliminado correctamente");
                        cargarProductos();
                    } else {
                        alert("Error: " + data.error);
                    }
                })
                .catch(error => console.error("Error eliminando producto:", error));
            }
        }
    });

    // Cargar productos al iniciar la página
    cargarProductos();
});
