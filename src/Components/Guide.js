import React, { useState, useEffect, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import wasteMaterials from './wasteProducts';
import Recyclo from './Recyclo';
import Confetti from 'react-confetti'; // Make sure you have 'react-confetti' installed
import { useNavigate } from 'react-router-dom';







const playSound = () => {
  const audio = new Audio(`${process.env.PUBLIC_URL}/music/trash.mp3`);
  audio.play();
};


const facts = [
  "Did you know Recycling one aluminum can saves enough energy to run a TV for 3 hours!",
  "Did you know Plastic can take over 400 years to decompose!",
  "Did you know Recycling a stack of newspapers just 3 feet high saves one tree!",
  "Did you know Glass can be recycled endlessly without loss in quality.",
  "Did you know One ton of recycled paper saves 7,000 gallons of water."
];
const dailyFact = facts[Math.floor(Math.random() * facts.length)];



const initialItems = [
  { name: 'Vegetable Remains/Fruit Peels', category: 'Biodegradeable' },
  { name: 'Tissues/Old Papers', category: 'Papier' },
  { name: 'Bottles/Plastic Bags', category: 'Plastik' },
  { name: 'Beer bottles/Jars', category: 'Glas' },
];

const categoryDescriptions = {
  Biodegradeable: 'Biodegradeable is for items that cannot be recycled like vegetable and food remains.',
  Papier: 'Papier is for recyclable paper like documents, envelopes, and newspapers.',
  Plastik: 'Plastik is for plastic items like bottles and wraps.',
  Glas: 'Glas is for recyclable glass like pickle and jam jars.'
};

const wrongCategoryReasons = {
  Biodegradeable: 'Oops! This item can be recycled and should not go to Biodegradeable.',
  Papier: 'Nope! This item isn’t clean or made of recyclable paper.',
  Plastik: 'Not quite! This doesn’t belong in Plastik. Maybe it’s glass or paper or organic waste?',
  Glas: 'Hmm, that doesn’t belong in Glas. Maybe it’s plastic, paper or has leftover food?'
};


const DraggableItem = ({ item }) => {
  // Dynamically set the background image based on the item category
  const backgroundImage = `url(./${item.category.toLowerCase()}-waste.png)`;

  const [{ isDragging }, drag] = useDrag({
    type: 'ITEM',
    item: () => ({
      name: item.name,
      category: item.category,
    }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }, [item]);

  return (
    <div
      ref={drag}
      style={{
        padding: '1rem',
        marginLeft: '15px',
        borderRadius: '8px',
        cursor: 'pointer',
        textAlign: 'center',
        opacity: isDragging ? 0.5 : 1,
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        backgroundImage: backgroundImage, // Set the background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'black',
        position: 'relative',
        position: 'relative',
        width: isDragging ? '100px' : '200px',
        height: isDragging ? '100px' : '200px',
        transform: isDragging ? 'scale(0.8)' : 'scale(1)',
        transition: 'all 0.3s ease-in-out',
        zIndex: isDragging ? 1000 : 'auto', // ensures it's above other elements
      }}
    >
      <div style={{ marginTop: '0.3rem' }}>
        {item.name}
      </div>
    </div>
  );
};


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
  const [recycloMessage, setRecycloMessage] = useState('');
  const [showRecycloCard, setShowRecycloCard] = useState(false);
  const [hasShownIntro, setHasShownIntro] = useState(false);
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
    setRecycloMessage(message);
    setShowRecycloCard(true);
    setTimeout(() => setShowRecycloCard(false), 3000);
  };


  const CategoryDropZone = ({ category }) => {
    const [isOver, setIsOver] = useState(false);

    const [{ isOverCurrent }, drop] = useDrop({
      accept: 'ITEM',
      collect: (monitor) => ({
        isOverCurrent: monitor.isOver({ shallow: true }),
      }),
      hover: () => setIsOver(true),
      drop: (item) => {
        setIsOver(false);

        playSound();

        if (item.category === category) {
          setSortedItems(prev => {
            const updated = {
              ...prev,
              [category]: [...prev[category], item]
            };

            // Check if all items are sorted
            const totalItemsSorted = Object.values(updated).flat().length;
            if (totalItemsSorted === initialItems.length) {
              setShowStreakCard(true);
              // Optional: Store to localStorage or trigger backend
              const todayStr = new Date().toISOString().split('T')[0]; // format as YYYY-MM-DD

              const storedStreak = JSON.parse(localStorage.getItem('recyclingStreak') || '[]');
              if (!storedStreak.includes(todayStr)) {
                storedStreak.push(todayStr);
                localStorage.setItem('recyclingStreak', JSON.stringify(storedStreak));
              }

            }

            return updated;
          });

          setAvailableItems(prev => prev.filter(i => i.name !== item.name));
          triggerRecyclo(category);
        } else {
          triggerRecyclo(category, true);
        }

      },
      leave: () => setIsOver(false),
    });

    const bgImages = {
      Biodegradeable: './biodegradeable.png',
      Papier: './papier.png',
      Plastik: './plastik.png',
      Glas: './glas.png'
    };

    return (
      <div style={{ position: 'relative' }}>
        {showStreakCard && (
          <>
            <Confetti
              width={windowSize.width}
              height={windowSize.height}
              recycle={false}
              numberOfPieces={200}
            />
            <div style={{
              position: 'fixed',
              top: '20%',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(255,255,255,0.3)',
              padding: '2rem',
              borderRadius: '16px',
              boxShadow: '0 8px 16px rgba(0,0,0,0.25)',
              zIndex: 9999,
              textAlign: 'center'
            }}>
              <img
                src="./recyclo-confetti.png"
                alt="Recyclo celebrating"
                style={{ maxWidth: '200px', marginBottom: '1rem' }}
              />
              <h2>Daily Streak Completed!</h2>
              <p> See your streak on the stats page!</p>
              <button onClick={() => {
                setShowStreakCard(false);
                navigate('/userstats');
              }}
              style={{
                marginTop: '1rem',
                padding: '0.75rem 1.5rem',
                backgroundColor: '#4CAF50',
                border: 'none',
                color: '#fff',
                fontSize: '1rem',
                borderRadius: '8px',
                cursor: 'pointer'
              }}>
                User Stats
              </button>
            </div>
          </>
        )}


        {isOverCurrent && (
          <img
            src="./arrow.png"
            alt="Arrow"
            style={{
              position: 'absolute',
              top: '-50px',
              //left: '50%',
              transform: 'translateX(-50%)',
              height: '40px',
              animation: 'bounce 1s infinite',
              zIndex: 20,
            }}
          />
        )}

        <div
          ref={drop}
          style={{
            position: 'relative',
            padding: '1.5rem',
            textAlign: 'center',
            borderRadius: '12px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
            fontWeight: 'bold',
            color: '#fff',
            cursor: 'pointer',
            overflow: 'hidden',
            height: '400px',
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${bgImages[category]})`,
            backgroundSize: '200px 300px',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.8,
            zIndex: 0,
          }} />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 1,
          }} />
          <div style={{ position: 'relative', zIndex: 2 }}>
            {category}
            <ul style={{
              marginTop: '1rem',
              textAlign: 'left',
              paddingLeft: '1rem',
              color: '#fff',
              listStyleType: 'none',
            }}>
              {sortedItems[category].map((item, index) => (
                <DraggableItem key={index} item={item} />
              ))}

            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main style={{
      padding: '2rem',
      fontFamily: `'Poppins', sans-serif`,
      minHeight: '200vh',
      backgroundImage: 'url("./background.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
    }}>
      {/* Recyclo + Heading */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        flexWrap: 'wrap',
      }}>
        <Recyclo fact={dailyFact} scrolled={scrolled} />
        <h2
          style={{
            marginTop: '200px',
            opacity: scrolled ? 0 : 1,
            transform: scrolled ? 'translateY(-30px)' : 'translateY(0)',
            transition: 'opacity 0.6s, transform 0.6s',
            position: scrolled ? 'absolute' : 'relative',
            top: scrolled ? '-9999px' : 'auto',
            color: '#ffffff',
            fontSize: '64px',
            maxWidth: '600px',
            lineHeight: '1.5',
            textWrap: 'nowrap',
          }}
        >
          Planning to recycle? <br />Scroll to begin.
        </h2>

        {scrolled && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
            marginTop: '450px',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            position: 'relative'
          }}>
            <img
              src="./recyclo-whiteboard.png"
              alt="Recyclo pointing to whiteboard"
              style={{
                maxWidth: '300px',
                height: 'auto',
                borderRadius: '16px',
                marginRight: '500px',
                zIndex: '10',
              }}
            />
            <div style={{
              position: 'absolute',
              left: '30%',
              top: '55%',
              transform: 'translate(0%, -50%)',
              textAlign: 'center',
              color: '#1a1a1a',
              fontWeight: 'bold',
              fontSize: '1.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: 'rgba(255,255,255,0.6)',
              borderRadius: '12px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              maxWidth: '80%',
              padding: '3rem',
            }}>
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
            style={{
              width: '60%',
              padding: '0.75rem 1rem',
              fontSize: '1rem',
              border: '1px solid #ccc',
              borderRadius: '8px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
              outline: 'none',
            }}
          />
          {searchQuery && filteredItems.length > 0 && (
            <ul style={{
              position: 'absolute',
              backgroundColor: 'rgba(255,255,255,0.95)',
              border: '1px solid #ccc',
              width: '60%',
              margin: '0.5rem auto 0',
              padding: '0.5rem',
              listStyleType: 'none',
              maxHeight: '200px',
              overflowY: 'auto',
              borderRadius: '8px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
              left: '20%',
              zIndex: '10',
            }}>
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
            <CategoryDropZone key={category} category={category} />
          ))}
        </section>
      )}

      {/* Recyclo popup card */}
      {showRecycloCard && (
        <div style={{
          position: 'absolute',
          bottom: '30px',
          top:'160%',
          left: '50%',
          height:'300px',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
          zIndex: 999,
          maxWidth: '400px',
          animation: 'slideUp 0.5s ease-out',
          textAlign: 'center'
        }}>
          <strong>Recyclo says:</strong>
          <p style={{ marginTop: '0.5rem' }}>{recycloMessage}</p>
          <img src='./recyclo-upset.png' width='200px' height='auto'/>
        </div>
      )}
    </main>
  );
};

export default Guide;
