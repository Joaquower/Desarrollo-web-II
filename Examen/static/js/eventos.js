document.addEventListener("DOMContentLoaded", function () {
    cargarEventos(); 

    document.getElementById("agregar").addEventListener("click", function () {
        agregarEvento();
    });
});

function cargarEventos() {
    fetch("/eventos/lista/")  
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const tbody = document.getElementById("eventos_lista");
            tbody.innerHTML = ""; 

            data.eventos.forEach(evento => {
                const fila = `<tr>
                    <td>${evento.name}</td>
                    <td>${evento.fecha_inicio}</td>
                    <td>${evento.fecha_fin}</td>
                    <td>${evento.localidad__name}</td>
                    <td>
                        <button class="botonsexi" onclick="eliminarEvento(${evento.id})">Eliminar</button>
                    </td>
                </tr>`;
                tbody.insertAdjacentHTML("beforeend", fila); 
            });
        })
        .catch(error => console.error("Error al cargar eventos:", error));
}

function agregarEvento() {
    const nombre = document.getElementById("nombre_evento").value;
    const fechaInicio = document.getElementById("fecha_inicio").value;
    const fechaFin = document.getElementById("fecha_fin").value;
    const localidad = document.getElementById("localidad").value;
    const csrfToken = document.getElementById("csrf_token").value;


    const hoy = new Date();
    hoy.setDate(hoy.getDate() - 1); 
    hoy.setHours(0, 0, 0, 0); 
    
    console.log("Hoy (ahora es ayer):", hoy);
    

    const fechaInicioObj = new Date(fechaInicio);
    fechaInicioObj.setHours(0, 0, 0, 0); 
    const fechaFinObj = new Date(fechaFin);

    if (!nombre || !fechaInicio || !fechaFin || !localidad) {
        alert("Todos los campos son obligatorios");
        return;
    }

    if (fechaFinObj < fechaInicioObj) {
        alert("La fecha de fin no puede ser menor que la fecha de inicio.");
        return;
    }

    if (fechaInicioObj < hoy) {  
        alert("La fecha de inicio debe ser mayor al día de hoy.");
        return;
    }

    fetch("/eventos/agregar/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken
        },
        body: JSON.stringify({
            name: nombre,
            fecha_inicio: fechaInicio,
            fecha_fin: fechaFin,
            localidad: localidad
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert("Error: " + data.error);
        } else {
            alert("Evento agregado con éxito");
            cargarEventos(); // Actualizar la tabla en tiempo real
        }
    })
    .catch(error => console.error("Error al agregar evento:", error));
}


function eliminarEvento(eventoId) {
    const csrfToken = document.getElementById("csrf_token") ? document.getElementById("csrf_token").value : "";

    fetch(`/eventos/eliminar/${eventoId}/`, {
        method: "DELETE",
        headers: {
            "X-CSRFToken": csrfToken
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error al eliminar: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        alert(data.success);
        cargarEventos(); // Volver a cargar la lista de eventos en tiempo real
    })
    .catch(error => console.error("Error al eliminar evento:", error));
}
