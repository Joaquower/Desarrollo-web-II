import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LikesContext } from '../context/LikesContext';

export default function EpisodeCard({ episode }) {
  const { state, dispatch } = useContext(LikesContext);
  const navigate = useNavigate();

  const episodeCharacterLikes = state.episodes[episode.id] || {};
  const totalCharacterLikes = Object.values(episodeCharacterLikes).reduce((sum, val) => sum + val, 0);

  const episodeLikes = state.episodeLikes?.[episode.id] || 0;

  const handleEpisodeLike = () => {
    dispatch({ type: 'LIKE_EPISODE', id: episode.id });
  };

  const handleEpisodeDislike = () => {
    dispatch({ type: 'DISLIKE_EPISODE', id: episode.id });
  };

  const styles = {
    card: {
      display: 'flex',
      backgroundColor: '#2c2f39',
      color: 'white',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
      width: '100%',
      maxWidth: '420px',
      margin: '1rem',
      transition: 'transform 0.2s ease'
    },
    image: {
      width: '120px',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    },
    info: {
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    title: {
      fontSize: '1.2rem',
      fontWeight: '600',
      marginBottom: '0.5rem'
    },
    detail: {
      margin: '0.2rem 0',
      fontSize: '0.95rem',
      color: '#d1d5db'
    },
    label: {
      fontWeight: '500',
      color: '#93c5fd'
    },
    buttons: {
      marginTop: '0.5rem',
      display: 'flex',
      gap: '0.5rem',
      flexWrap: 'wrap'
    },
    button: {
      backgroundColor: '#3b82f6',
      border: 'none',
      color: 'white',
      padding: '0.4rem 0.8rem',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '0.85rem'
    },
    unlikeButton: {
      backgroundColor: '#ef4444'
    },
    detailButton: {
      backgroundColor: '#10b981'
    }
  };

  return (
    <div
      style={styles.card}
      onClick={() => navigate(`/episode/${episode.id}`)}
    >
      <img
        src="https://www.lavanguardia.com/files/og_thumbnail/uploads/2018/09/10/5fa44aeac4924.jpeg"
        alt="Rick and Morty"
        style={styles.image}
      />
      <div style={styles.info}>
        <h3 style={styles.title}>{episode.name}</h3>
        <p style={styles.detail}>
          <span style={styles.label}>Fecha de estreno:</span> {episode.air_date}
        </p>
        <p style={styles.detail}>
          <span style={styles.label}>Nombre del capitulo:</span> {episode.episode}
        </p>
        <p style={styles.detail}>
          <span style={styles.label}>Likes:</span> {episodeLikes}
        </p>
        <div style={styles.buttons}>
          <button
            style={styles.button}
            onClick={(e) => {
              e.stopPropagation();
              handleEpisodeLike();
            }}
          >
            Like
          </button>
          <button
            style={{ ...styles.button, ...styles.unlikeButton }}
            onClick={(e) => {
              e.stopPropagation();
              handleEpisodeDislike();
            }}
          >
            Unlike
          </button>
        </div>
      </div>
    </div>
  );

}
