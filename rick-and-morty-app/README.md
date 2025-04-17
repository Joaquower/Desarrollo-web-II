# Rick and Morty App

Este proyecto es una aplicación web creada con React y Vite, basada en la API de Rick and Morty.

## 🚀 Requisitos

- Node.js >= 14
- npm o yarn

## 📦 Instalación

1. Clona el repositorio o descomprime el zip.
2. Abre la terminal en la raíz del proyecto.
3. Ejecuta:

```bash
npm install
```

## ▶️ Ejecutar en modo desarrollo

```bash
npm run dev
```

Abre en tu navegador: [http://localhost:5173](http://localhost:5173)

## 📁 Estructura

- `src/pages/` — Vistas principales (Home, Search, Static, etc)
- `src/components/` — Componentes reutilizables (EpisodeCard, CharacterCard, etc)
- `src/context/` — Contexto global para likes
- `src/reducers/` — Reducer para gestionar votos

## 🧠 Funcionalidades

- Visualización de episodios con paginación
- Detalle de episodio y personajes
- Likes en episodios y personajes (persisten con `localStorage`)
- Búsqueda de personajes con filtros
- Página estática replicada del blog de Le Blanc

## 🌐 API utilizada

[Rick and Morty API](https://rickandmortyapi.com/)

---
Creado como mini-proyecto web educativo.
