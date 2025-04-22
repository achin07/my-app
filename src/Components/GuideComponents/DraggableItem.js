// DraggableItem.js
import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableItem = ({ item }) => {
  const backgroundImage = `url(./${item.category.toLowerCase()}-waste.png)`;

  const [{ isDragging }, drag] = useDrag({
    type: 'ITEM',
    item: () => ({ name: item.name, category: item.category }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`drag-item ${isDragging ? 'dragging' : ''}`}
      style={{ backgroundImage }}
    >
      <div>{item.name}</div>
    </div>
  );
};

export default DraggableItem;
