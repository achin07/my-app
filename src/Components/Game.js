import React from 'react';
import TrashItem from './TrashItem';
import TrashBin from './TrashBin';
import GameOverModal from './GameOverModal';
import GameLogic from './GameLogic';

const Game = () => {
    const categories = ['Restmüll', 'Papier', 'Plastik', 'Glas'];
    

    const {
        score,
        gameOver,
        randomItem,
        animateScore,
        handleDrop,
        restartGame
    } = GameLogic(categories);

    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <style>
                {`
                    @keyframes pop {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.5); }
                        100% { transform: scale(1); }
                    }

                    .score-animate {
                        animation: pop 0.3s ease-in-out;
                    }
                `}
            </style>

            {/* Score */}
            <div style={{ marginBottom: '2rem', marginLeft: '1250px' }}>
                <span
                    className={animateScore ? 'score-animate' : ''}
                    style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        display: 'inline-block',
                    }}
                >
                    🔥 Score: {score}
                </span>
            </div>

            {/* Draggable Item */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                <TrashItem
                    key={`${randomItem.name}-${randomItem.category}`}
                    name={randomItem.name}
                    category={randomItem.category}
                />
            </div>

            {/* Trash Bins */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {categories.map((category) => (
                    <TrashBin key={category} category={category} handleDrop={handleDrop} />
                ))}
            </div>

            {/* Game Over Modal */}
            {gameOver && <GameOverModal restartGame={restartGame} />}
        </div>
    );
};

export default Game;
