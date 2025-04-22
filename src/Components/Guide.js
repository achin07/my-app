import React, { useState, useEffect, useRef } from 'react';
import wasteMaterials from './wasteProducts';
import Recyclo from './Recyclo';
import { useNavigate } from 'react-router-dom';
import { facts, initialItems, categoryDescriptions, wrongCategoryReasons } from './GuideComponents/constants';
import './Guide.css';
import DraggableItem from './GuideComponents/DraggableItem';
import CategoryDropZone from "./GuideComponents/DropZone"

const dailyFact = facts[Math.floor(Math.random() * facts.length)];

const Guide = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [availableItems, setAvailableItems] = useState(initialItems);
  const [sortedItems, setSortedItems] = useState({
    Biodegradeable: [],
    Papier: [],
    Plastik: [],
    Glas: [],
  });
  const [recycloMessage, setRecycloMessage] = useState({ text: '', image: '' });
  const [showRecycloCard, setShowRecycloCard] = useState(false);
  const dragSectionRef = useRef(null);
  const [showStreakCard, setShowStreakCard] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const triggerPoint = 300;
      setScrolled(window.scrollY > triggerPoint);

      if (dragSectionRef.current) {
        const rect = dragSectionRef.current.getBoundingClientRect();
        const isInView = rect.top >= 0 && rect.top <= window.innerHeight;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredItems = Object.entries(wasteMaterials)
    .flatMap(([category, items]) =>
      items
        .filter(item =>
          typeof item === 'string' &&
          item.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map(item => ({
          name: item,
          category,
        }))
    );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleItemSelect = (item) => {
    setSortedItems(prev => ({
      ...prev,
      [item.category]: [...(prev[item.category] || []), item]
    }));
    setSearchQuery('');
    triggerRecyclo(item.category);
  };
  const triggerRecyclo = (category, wrong = false) => {
    const message = wrong ? wrongCategoryReasons[category] : categoryDescriptions[category];
    const image = wrong ? './recyclo-upset.png' : './recyclo-happy.png';
    setRecycloMessage({ text: message, image });
    setShowRecycloCard(true);
    setTimeout(() => setShowRecycloCard(false), 1500);
  };

  return (
    <main className='main-container'>

      {/* Recyclo + Heading */}
      <div className='flex-container'>
        <Recyclo fact={dailyFact} scrolled={scrolled} />
        <h2 className={`scroll-header ${scrolled ? 'scroll-header--hidden' : 'scroll-header--visible'}`}
        >
          Planning to recycle? <br />Scroll to begin.
        </h2>

        {scrolled && (
          <div className='flex-section'>
            <img
              src="./recyclo-whiteboard.png"
              alt="Recyclo pointing to whiteboard"
              className='image-container'
            />
            <div className='text-panel'>
              Let’s recycle! Search the items you want to recycle. These are common household items. Drag and drop them to complete your everyday streak!
            </div>
          </div>
        )}

      </div>

      {/* Search bar and dropdown */}
      {scrolled && (
        <div style={{ textAlign: 'center', marginBottom: '2rem', position: 'relative' }}>
          <input
            type="text"
            placeholder="Search items to recycle"
            value={searchQuery}
            onChange={handleSearchChange}
            className='custom-input'
          />
          {searchQuery && filteredItems.length > 0 && (
            <ul className='dropdown-list'>
              {filteredItems.map((item, index) => (
                <li key={index} style={{ padding: '0.5rem', cursor: 'pointer' }}
                  onClick={() => handleItemSelect(item)}
                >
                  <strong>{item.name}</strong> <em>({item.category})</em>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Draggable items */}
      {scrolled && (
        <div ref={dragSectionRef} style={{ textAlign: 'center', marginBottom: '2rem', marginLeft: '165px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem' }}>
            {availableItems.map((item, index) => (
              <DraggableItem key={index} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* Drop Zones */}
      {scrolled && (
        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(275px, 1fr))',
          gap: '1.5rem',
          marginBottom: '20rem',
          height: '400px'
        }}>
          {['Biodegradeable', 'Papier', 'Plastik', 'Glas'].map(category => (
            <CategoryDropZone
              key={category}
              category={category}
              initialItems={initialItems}
              sortedItems={sortedItems}
              setSortedItems={setSortedItems}
              availableItems={availableItems}
              setAvailableItems={setAvailableItems}
              setShowStreakCard={setShowStreakCard}
              triggerRecyclo={triggerRecyclo}
              showStreakCard={showStreakCard}
              windowSize={windowSize}
              navigate={navigate}
            />
          ))}
        </section>
      )}

      {/* Recyclo popup card */}
      {showRecycloCard && (
        <div className='pop-card'>
          <strong>Recyclo says:</strong>
          <p style={{ marginTop: '0.5rem' }}>{recycloMessage.text}</p>
          <img src={recycloMessage.image} alt="Recyclo Mood" width='200px' height='auto' />
        </div>
      )}
    </main>
  );
};

export default Guide;
