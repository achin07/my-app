import React, { useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';




const CategoryDropZone = ({
    category,
    initialItems,
    sortedItems,
    setSortedItems,
    availableItems,
    setAvailableItems,
    setShowStreakCard,
    showStreakCard,
    triggerRecyclo,
    windowSize,
}) => {
    const navigate = useNavigate();
    const [{ isOverCurrent }, drop] = useDrop({
        accept: 'ITEM',
        collect: (monitor) => ({
            isOverCurrent: monitor.isOver({ shallow: true }),
        }),
        drop: (item) => {
            playSound();
            const isDragItem = initialItems.some(i => i.name === item.name && i.category === item.category);

            if (item.category === category) {
                const updated = {
                    ...sortedItems,
                    [category]: [...sortedItems[category], item]
                };

                setSortedItems(updated);

                if (isDragItem) {
                    const totalItemsSorted = Object.values(updated).flat().filter(i =>
                        initialItems.some(init => init.name === i.name && init.category === i.category)
                    ).length;

                    if (totalItemsSorted === initialItems.length) {
                        setShowStreakCard(true);

                        const todayStr = new Date().toISOString().split('T')[0];
                        const storedStreak = JSON.parse(localStorage.getItem('recyclingStreak') || '[]');
                        if (!storedStreak.includes(todayStr)) {
                            storedStreak.push(todayStr);
                            localStorage.setItem('recyclingStreak', JSON.stringify(storedStreak));
                        }
                    } else {
                        triggerRecyclo(category); // Only trigger feedback if not last item
                    }

                    setAvailableItems(prev => prev.filter(i => i.name !== item.name));
                } else {
                    triggerRecyclo(category); // fallback
                }
            } else {
                triggerRecyclo(category, true); // incorrect category
            }
        }
    });

    // Close Streak Card on outside click
    const streakRef = useRef(null);


    const bgImages = {
        Biodegradeable: './biodegradeable.png',
        Paper: './paper.png',
        Plastic: './plastic.png',
        Glass: './glass.png'
    };

   

    return (
        <div style={{ position: 'relative' }}>
            {isOverCurrent && (
                <img src="./arrow.png" alt="Arrow" className='arrow-point' />
            )}

            {showStreakCard && (
                <>
                    <Confetti
                        width={windowSize.width}
                        height={windowSize.height}
                        recycle={false}
                        numberOfPieces={200}
                    />
                    <div className='streak-card' ref={streakRef}>
                        <img
                            src="./recyclo-confetti.png"
                            alt="Recyclo celebrating"
                            style={{ maxWidth: '200px', marginBottom: '1rem' }}
                        />
                        <h2>Daily Streak Completed!</h2>
                        <p>See your streak on the stats page!</p>
                        <button
                            className='streak-card-butt'
                            onClick={()=>{setShowStreakCard(false);
        
        navigate('/stats');}}
                        >
                            User Stats
                        </button>
                    </div>
                </>
            )}

            <div ref={drop} className='drop-zone-con1'>
                <div
                    className='drop-zone-con2'
                    style={{ backgroundImage: `url(${bgImages[category]})` }}
                />
                <div className='overlay' />
                <div style={{ position: 'relative', zIndex: 2 }}>
                    {category}
                    <ul className="items-list">
                        {sortedItems[category].map((item, index) => (
                            <li key={index}>{item.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CategoryDropZone;

function playSound() {
    const audio = new Audio(`${process.env.PUBLIC_URL}/music/trash.mp3`);
    audio.play();
}
