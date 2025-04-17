import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function NavBar() {
  const location = useLocation();

  const styles = {
    nav: {
      backgroundColor: '#1f2937', // gris oscuro elegante
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'center',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 999
    },
    ul: {
      display: 'flex',
      gap: '2rem',
      listStyle: 'none',
      margin: 0,
      padding: 0
    },
    link: {
      color: '#d1d5db',
      textDecoration: 'none',
      fontSize: '1rem',
      fontWeight: '500',
      paddingBottom: '0.2rem',
      borderBottom: '2px solid transparent',
      transition: 'border-color 0.2s ease, color 0.2s ease'
    },
    active: {
      color: 'white',
      borderBottom: '2px solid #3b82f6' // azul moderno
    }
  };

  const navItems = [
    { to: '/', label: 'Inicio' },
    { to: '/static', label: 'Estática' },
    { to: '/search', label: 'Buscar Personaje' }
  ];

  return (
    <nav style={styles.nav}>
      <ul style={styles.ul}>
        {navItems.map(item => (
          <li key={item.to}>
            <Link
              to={item.to}
              style={{
                ...styles.link,
                ...(location.pathname === item.to ? styles.active : {})
              }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
