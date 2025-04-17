import React from 'react';
import { useNavigate } from 'react-router-dom';

const GameOverModal = ({ restartGame }) => {
    const navigate = useNavigate();

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 10000,
            }}
        >
            <div
                style={{
                    backgroundColor: '#fff',
                    padding: '2rem',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    textAlign: 'center',
                    width: '400px',
                }}
            >
                <img src='./litter.jpg' height='120px' weight='120px' marginLeft='70px'/>
                <h2 style={{ color: '#e53935', marginBottom: '1rem' }}>Wrong Trash Entered!</h2>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                    <button
                        style={{
                            backgroundColor: '#ffffff',
                            color: '#333',
                            border: '2px solid #ccc',
                            padding: '10px 20px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                        }}
                        onClick={() => navigate('/')}
                    >
                        Recycling Guide Page
                    </button>
                    <button
                        style={{
                            backgroundColor: '#4caf50',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                        }}
                        onClick={restartGame}
                    >
                        Restart Game
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameOverModal;
