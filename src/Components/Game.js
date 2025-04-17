import React, { useState, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import wasteMaterials from './wasteProducts';



// Trash Item Component (Draggable Card)
const TrashItem = ({ name, category }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'TRASH',
        item: { name, category },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            style={{
                width: '200px',
                height: '250px',
                padding: '1rem',
                margin: '1rem',
                background: 'linear-gradient(90deg, #a8e6cf, #dcedc1)',
                textAlign: 'center',
                borderRadius: '8px',
                boxShadow: '0 2px 6px rgba(2, 3, 0, 0.1)',
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                borderRadius: '16px',
                transition: 'transform 0.2s ease-in-out',
            }}
        >
            <div style={{ marginBottom: '1rem' }}>
                <img
                    src="./trashbag.png"
                    alt="Trashbag Logo"
                    style={{ width: '150px', height: '170px', objectFit: 'contain' }}
                />
            </div>
            {name}
        </div>
    );
};

// Trash Bin (Drop Zone) Component
const TrashBin = ({ category, handleDrop }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'TRASH',
        drop: (item) => handleDrop(item, category),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    // Mapping categories to image filenames (ensure these images exist in public folder)
    const categoryImages = {
        'Restmüll': './restmull.png',
        'Papier': './papier.png',
        'Plastik': './plastik.png',
        'Glas': './glas.png',
    };

    return (
        <div
            ref={drop}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '1rem',
            }}
        >
            <div
                style={{
                    width: '250px',
                    height: '250px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    backgroundColor: isOver ? '#dcedc1' : '#ffffff',
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
            <div style={{ marginTop: '0.5rem', fontWeight: 'bold', color: '#333' }}>
                {category}
            </div>
        </div>
    );
};

const Game = () => {
    const categories = ['Restmüll', 'Papier', 'Plastik', 'Glas'];
    const [feedback, setFeedback] = useState(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [randomItem, setRandomItem] = useState(() => generateRandomItem());

    // Generate random item ensuring different category from previous
    function generateRandomItem(previousCategory) {
        const availableCategories = categories.filter(cat => cat !== previousCategory);
        const category = availableCategories[Math.floor(Math.random() * availableCategories.length)];
        const item = wasteMaterials[category][Math.floor(Math.random() * wasteMaterials[category].length)];
        return { name: item, category };
    }

    const handleDrop = (item, targetCategory) => {
        if (gameOver) return;

        // Validate item exists in its claimed category
        const isValid = wasteMaterials[item.category]?.includes(item.name);
        if (isValid && item.category === targetCategory) {
            setFeedback('Correct!');
            console.log(isValid, " ", item.name, " ", item.category, " ", targetCategory);
            setScore(prev => prev + 1);
            const currentCategory = item.category;
            const newItem = generateRandomItem(currentCategory);
            setRandomItem(newItem);
            setTimeout(() => setFeedback(null), 2000);
        } else {
            setFeedback('Wrong!');
            console.log(isValid, " ", item.name, " ", item.category, " ", targetCategory);
            setTimeout(() => setFeedback(null), 2000);
            setGameOver(true);
        }
    };

    const restartGame = () => {
        setScore(0);
        setGameOver(false);
        setRandomItem(generateRandomItem());
        setFeedback(null);
    };

    useEffect(() => {
        if (gameOver) {
            alert(`Game Over! Final Score: ${score}`);
        }
    }, [gameOver, score]);

    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            {/* Score & Logo */}
            <div style={{ marginBottom: '2rem', marginLeft: '1050px' }}>
                <img
                    src="./fire.png"
                    alt="Fire Streak Logo"
                    style={{ width: '40px', height: '40px', marginRight: '10px' }}
                />
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Score: {score}</span>
            </div>

            {/* Feedback Message */}
            {feedback && (
                <div
                    style={{
                        position: 'fixed',
                        top: '10%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        color: '#4CAF50',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        animation: 'slideDown 0.5s ease-out',
                        zIndex: 9999,
                    }}
                >
                    {feedback}
                </div>
            )}


            {/* Draggable Item - centered at the top */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                <TrashItem
                    key={`${randomItem.name}-${randomItem.category}`}
                    name={randomItem.name}
                    category={randomItem.category}
                />
            </div>

            {/* TrashBins - arranged in a row below the draggable item */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {categories.map((category) => (
                    <TrashBin key={category} category={category} handleDrop={handleDrop} />
                ))}
            </div>

            {/* Restart Button */}
            {gameOver && (
                <div style={{ marginTop: '2rem' }}>
                    <button
                        onClick={restartGame}
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            backgroundColor: '#4caf50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s'
                        }}
                    >
                        Restart Game
                    </button>
                </div>
            )}
        </div>
    );
};

export default Game;
