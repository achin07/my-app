// Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: '#f4f4f4',
        padding: '1rem',
        textAlign: 'center',
        boxShadow: '0 -4px 8px rgba(0, 0, 0, 0.2)',
        width: '100%',
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: '1rem',
          color: '#555',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
        }}
      >
        Made with <span style={{ color: 'red' }}>❤️</span> by Achintya.
      </p>
    </footer>
  );
};

export default Footer;
