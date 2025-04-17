import React, { useState } from 'react';
import CharacterCard from '../components/CharacterCard';

export default function Search() {
  const [filters, setFilters] = useState({
    name: '',
    status: '',
    species: '',
    type: '',
    gender: ''
  });
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = Object.entries(filters)
      .filter(([_, value]) => value !== '')
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');

    fetch(`https://rickandmortyapi.com/api/character/?${query}`)
      .then(res => res.json())
      .then(data => setResults(data.results || []));
  };

  const styles = {
    container: {
      backgroundColor: '#f3f4f6',
      padding: '2rem',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    },
    title: {
      textAlign: 'center',
      fontSize: '2rem',
      marginBottom: '2rem',
      fontWeight: '400'
    },
    form: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '1rem',
      maxWidth: '1000px',
      margin: '0 auto 2rem'
    },
    input: {
      padding: '0.5rem',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '1rem',
      width: '100%'
    },
    button: {
      gridColumn: 'span 2',
      padding: '0.75rem',
      fontSize: '1rem',
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    },
    results: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1.5rem',
      justifyContent: 'center'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Buscar Personajes</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="name"
          placeholder="Nombre"
          value={filters.name}
          onChange={handleChange}
          style={styles.input}
        />
        <select name="status" value={filters.status} onChange={handleChange} style={styles.input}>
          <option value="">Estado</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
        <input
          name="species"
          placeholder="Especie"
          value={filters.species}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="type"
          placeholder="Tipo"
          value={filters.type}
          onChange={handleChange}
          style={styles.input}
        />
        <select name="gender" value={filters.gender} onChange={handleChange} style={styles.input}>
          <option value="">Género</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>

        <button type="submit" style={styles.button}>Buscar</button>
      </form>

      <div style={styles.results}>
        {results.map(character => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
}
