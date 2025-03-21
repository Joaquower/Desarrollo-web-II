// 1️⃣ Inicializar el mapa con Leaflet
const map = L.map('map').setView([20.0, -86.0], 5); // México como centro

// 2️⃣ Agregar un mapa base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// 3️⃣ Generar 200 puntos aleatorios dentro de un área definida
const puntosViento = [];
for (let i = 0; i < 200; i++) {
    let lat = 10 + Math.random() * 180;  // Latitudes entre 10° y 40°
    let lon = -100 + Math.random() * 180; // Longitudes entre -100° y -70°
    puntosViento.push({ lat, lon });
}

// 4️⃣ Función para obtener datos de viento desde Open-Meteo
async function obtenerDatosViento() {
    const coords = puntosViento.map(p => `${p.lat},${p.lon}`).join("|");

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${puntosViento[0].lat}&longitude=${puntosViento[0].lon}&current_weather=true&timezone=auto`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        // 5️⃣ Dibujar los datos en el mapa
        agregarFlechasViento(data);
    } catch (error) {
        console.error("Error obteniendo datos de viento:", error);
    }
}

// 6️⃣ Función para agregar flechas que representen el viento
function agregarFlechasViento(data) {
    puntosViento.forEach((punto, index) => {
        let viento = data.current_weather;

        let velocidad = viento.windspeed; // Velocidad del viento en km/h
        let direccion = viento.winddirection; // Dirección del viento en grados

        let tamañoFlecha = Math.min(velocidad / 2, 20); // Limitar tamaño de la flecha

        let iconoFlecha = L.divIcon({
            className: 'flecha-viento',
            html: `<svg width="${tamañoFlecha}" height="${tamañoFlecha}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="50,0 100,100 0,100" fill="black"/>
                   </svg>`,
            iconSize: [tamañoFlecha, tamañoFlecha],
            iconAnchor: [tamañoFlecha / 2, tamañoFlecha / 2]
        });

        let marker = L.marker([punto.lat, punto.lon], { icon: iconoFlecha }).addTo(map);

        // Rotar la flecha según la dirección del viento
        marker.on('add', function () {
            marker._icon.style.transform = `rotate(${direccion}deg)`;
            marker._icon.style.transformOrigin = 'center';
        });
    });
}

// 7️⃣ Llamar a la API y mostrar datos en el mapa
obtenerDatosViento();
