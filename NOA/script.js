// Crear el mapa con Leaflet, centrado en el océano (puedes cambiarlo)
const map = L.map('map').setView([21.00982952779426, -86.79447349643594], 4); 

// Agregar una capa base de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Agregar la capa de viento desde ArcGIS
L.tileLayer('https://maps.arcgis.com/sharing/rest/content/items/8b32db6e556f4967b48325c0a760a5a0/resources/styles/root.json', {
    attribution: '&copy; ArcGIS Weather'
}).addTo(map);

console.log("Capa de viento cargada desde ArcGIS");



//EJEMPLO DE FETCH UTILIZANDO RADIO DE DATOS EN NOAA

const coordenadas = [
    [21.0098, -86.7944],
    [21.1, -86.8],
    [20.9, -86.7],
    [21.0, -86.9]
];

coordenadas.forEach(([lat, lon]) => {
    fetch(`https://api.weather.gov/points/${lat},${lon}`)
        .then(response => response.json())
        .then(data => {
            console.log(`Datos de NOAA para (${lat},${lon}):`, data);
        })
        .catch(error => console.error(`Error con NOAA en (${lat},${lon})`, error));
});
