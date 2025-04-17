import React, { useEffect, useState } from 'react';
import EpisodeCard from '../components/EpisodeCard';

export default function Home() {
  const [episodes, setEpisodes] = useState([]);
  const [info, setInfo] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/episode?page=${page}`)
      .then(res => res.json())
      .then(data => {
        setEpisodes(data.results);
        setInfo(data.info);
      });
  }, [page]);

  const styles = {
    container: {
      backgroundColor: '#1e1e24',
      minHeight: '100vh',
      padding: '2rem',
    },
    title: {
      color: 'white',
      marginBottom: '1rem',
      fontSize: '2rem'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))',
      gap: '1.5rem',
      justifyContent: 'center'
    },
    pagination: {
      marginTop: '2rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '1rem'
    },
    button: {
      padding: '0.5rem 1rem',
      fontSize: '1rem',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Todos los Episodios</h1>

      <div style={styles.grid}>
        {episodes.map(ep => (
          <EpisodeCard key={ep.id} episode={ep} />
        ))}
      </div>

      <div style={styles.pagination}>
        <button
          style={styles.button}
          onClick={() => setPage(page - 1)}
          disabled={!info.prev}
        >
          Anterior
        </button>
        <span style={{ color: 'white' }}>Página {page}</span>
        <button
          style={styles.button}
          onClick={() => setPage(page + 1)}
          disabled={!info.next}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
