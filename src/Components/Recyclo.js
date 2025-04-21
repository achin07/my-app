// components/Recyclo.js
import React from 'react';
import './recyclo.css'; // Create this CSS file

const Recyclo = ({ fact,scrolled }) => {
  return (
    <div className={`recyclo-container ${scrolled ? 'hide-recyclo' : ''}`}>
      <div className="recyclo-panda">
        <img
          src="./recyclo-panda.png"
          alt="Recyclo the Panda"
          className="recyclo-image"
        />
        <div className="thought-bubble">
          <p>{fact}</p>
        </div>
      </div>
    </div>
  );
};

export default Recyclo;
