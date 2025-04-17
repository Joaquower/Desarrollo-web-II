import React from 'react';

export default function StaticPage() {
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      lineHeight: '1.8',
      color: '#1f1f1f',
      backgroundColor: '#fff'
    },
    banner: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      height: '500px',
      overflow: 'hidden',
      marginBottom: '2rem'
    },
    bannerImg: {
      width: '50%',
      objectFit: 'cover',
      height: '100%'
    },
    bannerText: {
      width: '50%',
      backgroundColor: '#000',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem'
    },
    title: {
      fontSize: '2rem',
      letterSpacing: '1px',
      textAlign: 'center',
      margin: '2rem auto',
      maxWidth: '900px'
    },
    content: {
      maxWidth: '900px',
      margin: '0 auto',
      padding: '2rem'
    },
    paragraph: {
      textAlign: 'justify',
      marginBottom: '1.5rem'
    },
    imgFull: {
      width: '100%',
      borderRadius: '10px',
      margin: '2rem 0'
    },
    list: {
      margin: '1.5rem 0',
      paddingLeft: '1.2rem'
    },
    footer: {
      backgroundColor: '#f4f4f4',
      padding: '4rem 2rem',
      marginTop: '4rem',
      borderTop: '1px solid #ccc'
    },
    footerContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '2rem'
    },
    footerCol: {
      textAlign: 'left'
    },
    footerTitle: {
      fontWeight: 'bold',
      marginBottom: '1rem'
    },
    footerInput: {
      display: 'block',
      width: '100%',
      marginBottom: '0.5rem',
      padding: '0.5rem',
      borderRadius: '4px',
      border: '1px solid #ccc'
    },
    checkbox: {
      marginRight: '0.5rem'
    },
    button: {
      backgroundColor: '#222',
      color: '#fff',
      border: 'none',
      padding: '0.6rem 1.2rem',
      borderRadius: '4px',
      cursor: 'pointer',
      marginTop: '1rem'
    },
    socialIcons: {
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem',
      marginTop: '2rem'
    },
    icon: {
      width: '24px',
      height: '24px',
      filter: 'grayscale(100%)',
      cursor: 'pointer',
      transition: 'filter 0.3s ease'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.banner}>
        <img
          src="https://wallpapers.com/images/hd/rick-and-morty-1920x1080-y20sjmm96xpxosty.jpg"
          alt="Rick and Morty Banner"
          style={styles.bannerImg}
        />
        <div style={styles.bannerText}>
          <p>Volver</p>
          <h1>NOVEDADES INTERDIMENSIONALES SOBRE PORTALES</h1>
        </div>
      </div>

      <div style={styles.content}>
        <p style={styles.paragraph}>
          Para brindar un entorno seguro a todos nuestros viajeros intergalácticos, el Consejo de Ricks ha iniciado una serie de ajustes para controlar el
          uso excesivo de portales y tecnologías prohibidas.
        </p>

        <img
          src="https://wallpapers.com/images/hd/trippy-rick-and-morty-pc-4k-jc8x45hfl3i5zveu.jpg"
          alt="Imagen de Rick en dimensión psicodélica"
          style={styles.imgFull}
        />

        <ul style={styles.list}>
          <li>Evita portales cerca de Cronenbergianos.</li>
          <li>Señales obligatorias sobre riesgos de colapso cuántico.</li>
          <li>Prohibido el ingreso a humanos con alergia a Morty.</li>
        </ul>

        <img
          src="https://images.wallpapersden.com/image/ws-rick-and-morty-in-outer-space_72696.jpg"
          alt="Rick y Morty en el espacio"
          style={styles.imgFull}
        />

        <p style={styles.paragraph}>
          Estas medidas no afectarán tu experiencia en ninguna línea temporal. ¡Disfruta tu estancia multiversal!
        </p>

        <img
          src="https://i.pinimg.com/originals/6b/d8/2e/6bd82e272f3f35439634e546deb732eb.png"
          alt="Rick señalando"
          style={styles.imgFull}
        />
      </div>

      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          <div style={styles.footerCol}>
            <h3 style={styles.footerTitle}>Sitios Multiversales</h3>
            <p>Rick HQ</p>
            <p>Dimensión C-137</p>
            <p>Planet Squanch</p>
            <p>Federación Galáctica</p>
          </div>
          <div style={styles.footerCol}>
            <h3 style={styles.footerTitle}>Recursos</h3>
            <p>Guía del Viajero Dimensional</p>
            <p>Morty Survival Tips</p>
            <p>Preguntas Frecuentes</p>
            <p>Contáctanos</p>
          </div>
          <div style={styles.footerCol}>
            <h3 style={styles.footerTitle}>Acerca de Rick & Morty</h3>
            <p>Consejo de Ricks</p>
            <p>Noticias del Multiverso</p>
            <p>App Oficial</p>
          </div>
          <div style={styles.footerCol}>
            <h3 style={styles.footerTitle}>Suscríbete</h3>
            <input type="text" placeholder="Nombre" style={styles.footerInput} />
            <input type="text" placeholder="Apellido" style={styles.footerInput} />
            <input type="email" placeholder="Correo" style={styles.footerInput} />
            <input type="text" placeholder="Planeta" style={styles.footerInput} />
            <label>
              <input type="checkbox" style={styles.checkbox} /> Acepto términos y condiciones
            </label>
            <button style={styles.button}>Enviar</button>
          </div>
        </div>

        <div style={styles.socialIcons}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" style={styles.icon} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" style={styles.icon} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" style={styles.icon} />
          </a>
        </div>
      </footer>
    </div>
  );
}
