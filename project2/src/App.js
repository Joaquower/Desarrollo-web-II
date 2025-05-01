import React from 'react';
import './App.css';
import Hero from './components/Hero';
import PropertyCard from './components/PropertyCard';
import useProperties from './hooks/useProperties';

function App() {
  const { properties, search, setSearch, loading, error } = useProperties();

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="app">
      <Hero search={search} onSearchChange={handleSearchChange} />
      <div className="card-container">
        {properties.map((property, index) => (
          <PropertyCard key={index} property={property} />
        ))}
      </div>
    </div>
  );
}

export default App;
