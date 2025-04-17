import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EpisodeDetail from './pages/EpisodeDetail';
import CharacterDetail from './pages/CharacterDetail';
import Search from './pages/Search';
import StaticPage from './pages/StaticPage';
import NavBar from './components/NavBar';

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/episode/:id" element={<EpisodeDetail />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/static" element={<StaticPage />} />
      </Routes>
    </Router>
  );
}
