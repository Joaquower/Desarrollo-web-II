import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CharacterCard from '../components/CharacterCard';
import { LikesContext } from '../context/LikesContext';

export default function EpisodeDetail() {
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();
  const { state } = useContext(LikesContext);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/episode/${id}`)
      .then(res => res.json())
      .then(data => {
        setEpisode(data);
        const charUrls = [...data.characters.slice(0, 2), ...data.characters.slice(-2)];
        Promise.all(charUrls.map(url => fetch(url).then(res => res.json())))
          .then(setCharacters);
      });
  }, [id]);

  if (!episode) return <p>Cargando episodio...</p>;
  if (!characters || characters.length === 0) return <p>Cargando personajes...</p>;

  const getLikes = (characterName) => {
    return state.episodes?.[id]?.[characterName] || 0;
  };

  const topCharacters = [...characters]
    .sort((a, b) => getLikes(b.name) - getLikes(a.name))
    .filter(c => getLikes(c.name) > 0)
    .slice(0, 3);

  const restCharacters = characters
    .filter(c => !topCharacters.some(t => t.id === c.id))
    .slice(0, 4);

  const styles = {
    container: {
      textAlign: 'center',
      padding: '3rem 2rem',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: 'white'
    },
    title: {
      fontSize: '2rem',
      fontWeight: '300',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      marginBottom: '1rem'
    },
    subtitle: {
      color: '#9333ea',
      fontWeight: 'bold',
      marginTop: '2rem'
    },
    description: {
      color: '#4b5563',
      margin: '1rem auto 2rem',
      maxWidth: '600px',
      fontSize: '0.95rem'
    },
    podiumGrid: {
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem',
      flexWrap: 'wrap',
      marginTop: '2rem'
    },
    sectionTitle: {
      marginTop: '3rem',
      fontWeight: '600',
      color: '#9333ea',
      fontSize: '1rem'
    },
    othersGrid: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1.5rem',
      flexWrap: 'wrap',
      marginTop: '1rem'
    },
    backButton: {
      marginTop: '3rem',
      padding: '0.6rem 1.5rem',
      fontSize: '1rem',
      border: 'none',
      borderRadius: '4px',
      backgroundColor: '#6b7280',
      color: 'white',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{episode.name}</h1>

      <p style={styles.description}>
        Fecha de estreno: {episode.air_date} · Código: {episode.episode}
      </p>

      {topCharacters.length > 0 && (
        <>
          <div style={styles.podiumGrid}>
            {topCharacters.map(char => (
              <CharacterCard key={char.id} character={char} episodeId={id} />
            ))}
          </div>
          <p style={styles.sectionTitle}>Los tres personajes favoritos</p>
        </>
      )}

      {restCharacters.length > 0 && (
        <>
          <h3 style={{ marginTop: '3rem' }}>Otros personajes</h3>
          <div style={styles.othersGrid}>
            {restCharacters.map(char => (
              <CharacterCard key={char.id} character={char} episodeId={id} />
            ))}
          </div>
        </>
      )}

      <button style={styles.backButton} onClick={() => navigate(-1)}>
        Volver
      </button>
    </div>
  );
}
