import { useState, useEffect } from 'react';
import wasteMaterials from './wasteProducts';

const useGameLogic = (categories) => {
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [randomItem, setRandomItem] = useState(generateRandomItem());
    const [animateScore, setAnimateScore] = useState(false);
    const dropSound = new Audio('./trash.mp3');
    dropSound.volume = 0.5;

    function generateRandomItem(previousCategory) {
        const availableCategories = categories.filter(cat => cat !== previousCategory);
        const category = availableCategories[Math.floor(Math.random() * availableCategories.length)];
        const item = wasteMaterials[category][Math.floor(Math.random() * wasteMaterials[category].length)];
        return { name: item, category };
    }

    const handleDrop = (item, targetCategory) => {
        if (gameOver) return;

        const isValid = wasteMaterials[item.category]?.includes(item.name);
        dropSound.play();
        if (isValid && item.category === targetCategory) {
            setScore(prev => prev + 1);
            setAnimateScore(true);
            const newItem = generateRandomItem(item.category);
            setRandomItem(newItem);
        } else {
            setGameOver(true);
        }
    };

    const restartGame = () => {
        setScore(0);
        setGameOver(false);
        setRandomItem(generateRandomItem());
    };

    useEffect(() => {
        if (animateScore) {
            const timer = setTimeout(() => setAnimateScore(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [animateScore]);

    return {
        score,
        gameOver,
        randomItem,
        animateScore,
        handleDrop,
        restartGame
    };
};

export default useGameLogic;
