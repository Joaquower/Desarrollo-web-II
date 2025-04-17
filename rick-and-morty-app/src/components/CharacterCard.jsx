import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LikesContext } from '../context/LikesContext';

export default function CharacterCard({ character, episodeId }) {
  const { state, dispatch } = useContext(LikesContext);
  const navigate = useNavigate();

  const likes = episodeId ? state.episodes?.[episodeId]?.[character.name] || 0 : null;

  const handleLike = () => {
    dispatch({
      type: 'LIKE_CHARACTER',
      payload: { episodeId, characterName: character.name }
    });
  };

  const styles = {
    card: {
      width: '160px',
      textAlign: 'center',
      backgroundColor: 'transparent',
      border: 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      padding: '1rem'
    },
    image: {
      width: '100%',
      height: '160px',
      objectFit: 'cover',
      borderRadius: '8px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
    },
    name: {
      fontSize: '1rem',
      color: '#1f2937',
      fontWeight: '600',
      margin: '0.3rem 0'
    },
    likes: {
      fontSize: '0.9rem',
      color: '#6b7280'
    },
    button: {
      backgroundColor: '#ef4444',
      color: 'white',
      padding: '0.3rem 0.7rem',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '0.8rem',
      marginTop: '0.3rem'
    },
    detailButton: {
      backgroundColor: '#10b981'
    }
  };

  return (
    <div style={styles.card}>
      <img src={character.image} alt={character.name} style={styles.image} />
      <p style={styles.name}>{character.name}</p>

      {episodeId && (
        <>
          <p style={styles.likes}>Likes en episodio: {likes}</p>
          <button style={styles.button} onClick={handleLike}>Like</button>
        </>
      )}

      <button
        style={{ ...styles.button, ...styles.detailButton }}
        onClick={() => navigate(`/character/${character.id}`)}
      >
        Ver Detalle
      </button>
    </div>
  );
}
