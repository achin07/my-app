import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();

  return (
    <header
      style={{
        background: 'transparent',
        padding: '1rem 2rem',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        height: '60px',
      }}
    >
     
      <img
        onClick={() => navigate('/')}
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

      
      <h1
        style={{
          color: '#1b5e20',
          margin: 0,
          marginRight: '500px',
          marginLeft: '500px',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
        }}
      >
        Recycle with Recyclo
      </h1>

      
      <div
        style={{
          position: 'absolute',
          right: '2rem',
          cursor: 'pointer',
        }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => navigate('/stats')}
      >
        <img
          src="./userstats.png" 
          alt="View Stats"
          style={{
            height: '35px',
            width: '35px',
            objectFit: 'contain',
          }}
        />

        
        {showTooltip && (
          <div
            style={{
              position: 'absolute',
              top: '45px',
              right: 0,
              backgroundColor: '#fff',
              color: 'black',
              padding: '5px 10px',
              borderRadius: '4px',
              fontSize: '12px',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
              zIndex: 10,
            }}
          >
            View Stats
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
