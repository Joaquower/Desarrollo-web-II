// 1️⃣ Inicializar el mapa con Leaflet
const map = L.map('map').setView([20.0, -86.0], 5); // México como centro

// 2️⃣ Agregar un mapa base (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// 3️⃣ Generar 50 puntos aleatorios dentro de un área definida
const puntosViento = [];
for (let i = 0; i < 50; i++) {
    let lat = 10 + Math.random() * 30;  // Latitudes entre 10° y 40°
    let lon = -100 + Math.random() * 30; // Longitudes entre -100° y -70°
    puntosViento.push({ lat, lon });
}

// 4️⃣ Función para obtener datos de viento de Open-Meteo para cada punto
async function obtenerDatosViento() {
    for (let punto of puntosViento) {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${punto.lat}&longitude=${punto.lon}&current_weather=true&timezone=auto`;

        try {
            let response = await fetch(url);
            let data = await response.json();

            if (data && data.current_weather) {
                animarLineaViento(punto, data.current_weather);
            }
        } catch (error) {
            console.error("Error obteniendo datos de viento para", punto, error);
        }
    }
}

// 5️⃣ Función para animar la línea de viento con efecto visible
function animarLineaViento(punto, viento) {
    let velocidad = viento.windspeed; // Velocidad del viento en km/h
    let direccion = viento.winddirection; // Dirección del viento en grados

    let distancia = Math.min(velocidad / 3, 2.5); // Hacer líneas más largas según velocidad

    let radianes = direccion * (Math.PI / 180);
    
    // Posición inicial
    let latInicial = punto.lat;
    let lonInicial = punto.lon;

    // Posición final (se irá extendiendo poco a poco)
    let latFinal = latInicial + (distancia * Math.cos(radianes));
    let lonFinal = lonInicial + (distancia * Math.sin(radianes));

    let linea = L.polyline([[latInicial, lonInicial], [latInicial, lonInicial]], {
        color: "blue",
        weight: 3,
        opacity: 0.9,
        className: "linea-viento"
    }).addTo(map);

    let iconoFlecha = L.divIcon({
        className: 'flecha-viento',
        html: `<svg width="14" height="14" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" 
                style="transform: rotate(${direccion}deg);">
                    <polygon points="50,0 100,100 0,100" fill="blue"/>
               </svg>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7]
    });

    let flecha = L.marker([latInicial, lonInicial], { icon: iconoFlecha }).addTo(map);

    let pasos = 10; // Número de movimientos antes de desaparecer
    let contador = 0;

    let animacion = setInterval(() => {
        if (contador < pasos) {
            let latPaso = latInicial + ((contador / pasos) * (latFinal - latInicial));
            let lonPaso = lonInicial + ((contador / pasos) * (lonFinal - lonInicial));

            linea.setLatLngs([[latInicial, lonInicial], [latPaso, lonPaso]]);
            flecha.setLatLng([latPaso, lonPaso]);

            contador++;
        } else {
            clearInterval(animacion);
            desaparecerLinea(linea, flecha);
        }
    }, 300); // Mueve la línea cada 300ms para que se note más el desplazamiento
}

// 6️⃣ Función para hacer que las líneas desaparezcan suavemente
function desaparecerLinea(linea, flecha) {
    let opacidad = 0.9;
    let desvanecer = setInterval(() => {
        if (opacidad > 0) {
            opacidad -= 0.1;
            linea.setStyle({ opacity: opacidad });
            flecha.setOpacity(opacidad);
        } else {
            clearInterval(desvanecer);
            map.removeLayer(linea);
            map.removeLayer(flecha);
        }
    }, 100);
}

// 7️⃣ Llamar a la API y mostrar datos en el mapa
obtenerDatosViento();

// 8️⃣ Refrescar las líneas de viento cada 10 segundos
setInterval(() => {
    obtenerDatosViento();
}, 10000);
