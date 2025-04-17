import React, { useState, useEffect } from 'react';
import wasteMaterials from './wasteProducts'; // Ensure this file exports the expected object

const Guide = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null); // State to track the selected item in the dropdown

  useEffect(() => {
    const handleScroll = () => {
      const triggerPoint = 300; // Scroll threshold in px
      if (window.scrollY > triggerPoint) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter waste materials based on the search query
  const filteredItems = Object.entries(wasteMaterials)
    .flatMap(([category, items]) =>
      items
        // Safety check: make sure item is a string before using toLowerCase
        .filter(item =>
          typeof item === 'string' &&
          item.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map(item => ({
          name: item,
          category,
        }))
    );

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle item selection from dropdown
  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setSearchQuery(''); // Clear search bar after selection
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif', minHeight: '200vh' }}>
      {/* Animated Heading */}
      <div style={{ textAlign: 'center', margin: '4rem 0' }}>
        <h2
          style={{
            marginTop: '200px',
            opacity: scrolled ? 0 : 1,
            transform: scrolled ? 'translateY(-30px)' : 'translateY(0)',
            transition: 'opacity 0.6s, transform 0.6s',
            position: scrolled ? 'absolute' : 'relative',
            top: scrolled ? '-9999px' : 'auto',
            color: '#2e7d32',
            fontSize: '64px',
          }}
        >
          What are you planning to recycle today? &nbsp;&nbsp; Scroll down to begin.
        </h2>

        {scrolled && (
          <h2
            style={{
              marginTop: '450px',
              opacity: 1,
              transform: 'translateY(0)',
              transition: 'opacity 0.6s, transform 0.6s',
              color: '#1b5e20',
              marginBottom: '2rem',
            }}
          >
            Let’s recycle! Search the items you want to recycle.
          </h2>
        )}
      </div>

      {/* Search bar */}
      {scrolled && (
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <input
            type="text"
            placeholder="Search items to recycle"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={(e) => e.target.placeholder = ''}
            onBlur={(e) => e.target.placeholder = 'Search items to recycle'}
            style={{
              width: '60%',
              padding: '0.75rem 1rem',
              fontSize: '1rem',
              border: '1px solid #ccc',
              borderRadius: '8px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
              outline: 'none',
            }}
            onFocusCapture={(e) => {
              e.target.style.border = '2px solid green';
            }}
            onBlurCapture={(e) => {
              e.target.style.border = '1px solid #ccc';
            }}
          />
          {/* Dropdown list of filtered items */}
          {searchQuery && filteredItems.length > 0 && (
            <ul
              style={{
                position: 'absolute',
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                width: '60%',
                margin: '0.5rem auto 0',
                padding: '0.5rem',
                listStyleType: 'none',
                maxHeight: '200px',
                overflowY: 'auto',
                borderRadius: '8px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              {filteredItems.map((item, index) => (
                <li
                  key={index}
                  style={{
                    padding: '0.5rem',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                  }}
                  onClick={() => handleItemSelect(item)}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <strong>{item.name}</strong><em style={{ fontStyle: 'italic' }}>({item.category})</em>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Display selected item */}
      {selectedItem && (
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <p>
            You selected: <strong>{selectedItem.name}</strong> (
            <em style={{ fontStyle: 'italic' }}>{selectedItem.category}</em>)
          </p>
        </div>
      )}

      {/* Category boxes */}
      {scrolled && (
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1.5rem',
            justifyContent: 'center',
            transition: 'opacity 0.5s',
          }}
        >
          {['Restmüll', 'Papier', 'Plastik', 'Glas'].map((category) => (
            <div
              key={category}
              style={{
                backgroundColor: '#ffffff',
                padding: '1.5rem',
                textAlign: 'center',
                borderRadius: '12px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                fontWeight: 'bold',
                color: '#333',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
            >
              {category}
            </div>
          ))}
        </section>
      )}
    </main>
  );
};

export default Guide;

