import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();

  return (
    <header
      style={{
        background: 'linear-gradient(90deg, #a8e6cf, #dcedc1)',
        padding: '1rem 2rem',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        height: '60px',
      }}
    >
      {/* Logo on the left */}
      <img
        src="./recycle.png"
        alt="Logo"
        style={{
          position: 'absolute',
          left: '2rem',
          height: '40px',
          width: '40px',
          objectFit: 'contain',
        }}
      />

      {/* Centered Title */}
      <h1
        style={{
          color: '#1b5e20', // dark earthy green
          margin: 0,
          marginRight:'500px',
          marginLeft:'500px',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
        }}
      >
        Recycling Guide
      </h1>

      {/* Logo on the right with Tooltip */}
      <div
        style={{
          right: '2rem', // Make sure it's 2rem from the right edge
          alignItems:'right',
          cursor: 'pointer',
        }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => navigate('/game')}
      >
        <img
          src="./gamelogo.png" // Replace with the gaming logo
          alt="Switch to Gaming Mode"
          style={{
            height: '40px',
            width: '40px',
            objectFit: 'contain',
          }}
        />

        {/* Custom Tooltip */}
        {showTooltip && (
          <div
            style={{
              position: 'absolute',
              top: '45px', // position below the icon
              left: '50%',
              backgroundColor: '#fff',
              color: 'black',
              padding: '5px 10px',
              borderRadius: '4px',
              fontSize: '12px',
              whiteSpace: 'nowrap',
              opacity: 1,
              transition: 'opacity 0.3s',
            }}
          >
            Switch to Gaming Mode
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

