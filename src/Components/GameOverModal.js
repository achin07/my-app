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
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 10000,
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
            }}
        >
            <div
                style={{
                    background: 'rgba(0, 0, 0, 0.2)',
                    borderRadius: '20px',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                    padding: '2rem',
                    textAlign: 'center',
                    width: '400px',
                    color: '#ffffff',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                }}
            >
                <img
                    src="./litter.jpg"
                    alt="Litter"
                    style={{
                        height: '120px',
                        width: '120px',
                        marginBottom: '1.5rem',
                        borderRadius: '50%',
                        border: '2px solid rgba(255, 255, 255, 0.2)',
                    }}
                />
                <h2 style={{ color: '#ffffff', marginBottom: '1rem', fontWeight: 600 }}>
                    Wrong Trash Entered!
                </h2>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                    <button
                        style={{
                            background: 'rgba(255, 255, 255, 0.2)',
                            color: '#fff',
                            padding: '10px 20px',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            transition: 'all 0.3s ease',
                            backdropFilter: 'blur(10px)',
                            outline: 'none',
                            border: 'none',
                        }}
                        onClick={() => navigate('/')}
                    >
                        Recycling Guide
                    </button>
                    <button
                        style={{
                            background: 'rgba(255, 255, 255, 0.2)',
                            color: '#ffffff',
                            padding: '10px 20px',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            marginLeft: '1rem',
                            transition: 'all 0.3s ease',
                            backdropFilter: 'blur(10px)',
                            outline: 'none',
                            border: 'none',
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


