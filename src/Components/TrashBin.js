import React from 'react';
import { useDrop } from 'react-dnd';

const TrashBin = ({ category, handleDrop }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'TRASH',
        drop: (item) => handleDrop(item, category),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    const categoryImages = {
        'Restmüll': './restmull.jpg',
        'Papier': './papier.jpg',
        'Plastik': './plastik.jpg',
        'Glas': './glas1.jpg',
    };

    return (
        <div
            ref={drop}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '1rem',
                position: 'relative',
            }}
        >
            {/* Animated Arrow */}
            {isOver && (
                <div style={{ position: 'absolute', top: '-50px', animation: 'bounce 1s infinite' }}>
                    <span style={{ fontSize: '2rem', color: '#4CAF50' }}>
                        <img src='./arrow.png' height='60px' width='55px' />
                    </span>
                </div>
            )}

            {/* Category Image */}
            <div
                style={{
                    width: '400px',
                    height: '350px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    backgroundColor: '#ffffff',
                }}
            >
                <img
                    src={categoryImages[category]}
                    alt={category}
                    style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                    }}
                />
            </div>

            {/* Category Label */}
            <div style={{ marginTop: '0.5rem', fontWeight: 'bold', color: '#333', marginBottom: '100px' }}>
                {category}
            </div>

            {/* Arrow Animation */}
            <style>
                {`
                    @keyframes bounce {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-10px); }
                    }
                `}
            </style>
        </div>
    );
};

export default TrashBin;

