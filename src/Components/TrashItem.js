import React from 'react';
import { useDrag } from 'react-dnd';

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
                height: '300px',
                padding: '1rem',
                margin: '1rem',
                marginTop: '2rem',
                marginBottom: '4rem',
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.1)', // semi-transparent white background
                backdropFilter: 'blur(10px)', // blur effect
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // soft shadow
                transition: 'transform 0.2s ease-in-out',
            }}
        >
            <div style={{ marginBottom: '1rem' }}>
                <img
                    src="./trashbag.png"
                    alt="Trashbag Logo"
                    style={{ width: '200px', height: '250px', objectFit: 'contain' }}
                />
                {name}
            </div>
            
        </div>
    );
};

export default TrashItem;
