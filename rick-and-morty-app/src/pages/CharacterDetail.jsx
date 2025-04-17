import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then(res => res.json())
      .then(setCharacter);
  }, [id]);

  if (!character) return <p style={{ textAlign: 'center' }}>Cargando personaje...</p>;

  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '2rem 4rem',
      backgroundColor: '#f5f5f5',
      minHeight: '90vh',
      fontFamily: 'Arial, sans-serif'
    },
    textSection: {
      flex: 1,
      maxWidth: '500px'
    },
    title: {
      fontSize: '1.8rem',
      fontWeight: '400',
      marginBottom: '1rem',
      lineHeight: '1.3'
    },
    description: {
      fontSize: '0.95rem',
      color: '#4b5563',
      marginBottom: '2rem'
    },
    button: {
      padding: '0.7rem 1.5rem',
      fontSize: '0.9rem',
      border: '1px solid black',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      borderRadius: '3px'
    },
    imageSection: {
      flex: 1,
      display: 'flex',
      justifyContent: 'flex-end'
    },
    image: {
      height: '100%',
      objectFit: 'cover'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.textSection}>
        <h1 style={styles.title}>Ríndase a la experiencia {character.name}</h1>
        <p style={styles.description}>
          Respire aventura, rareza y locura con {character.name}, un personaje {character.status.toLowerCase()} de tipo {character.species}.
        </p>
        <button style={styles.button} onClick={() => navigate(-1)}>
          Regresar
        </button>
      </div>

      <div style={styles.imageSection}>
        <img src={character.image} alt={character.name} style={styles.image} />
      </div>
    </div>
  );
}
