// constants.js
export const facts = [
    "Did you know Recycling one aluminum can saves enough energy to run a TV for 3 hours!",
    "Did you know Plastic can take over 400 years to decompose!",
    "Did you know Recycling a stack of newspapers just 3 feet high saves one tree!",
    "Did you know Glass can be recycled endlessly without loss in quality.",
    "Did you know One ton of recycled paper saves 7,000 gallons of water."
  ];
  
  export const initialItems = [
    { name: 'Vegetable/Fruit Peels', category: 'Biodegradeable' },
    { name: 'Tissues/Old Papers', category: 'Papier' },
    { name: 'Bottles/Plastic Bags', category: 'Plastik' },
    { name: 'Beer bottles/Jars', category: 'Glas' },
  ];
  
  export const categoryDescriptions = {
    Biodegradeable: 'Good! Biodegradeable is for items that cannot be recycled like vegetable and food remains.',
    Papier: 'Great! Papier is for recyclable paper like documents, envelopes, and newspapers.',
    Plastik: 'Amazing! Plastik is for plastic items like bottles and wraps.',
    Glas: 'Yay! Glas is for recyclable glass like pickle and jam jars.'
  };
  
  export const wrongCategoryReasons = {
    Biodegradeable: 'Oops! This item can be recycled and should not go to Biodegradeable.',
    Papier: 'Nope! This item isn’t clean or made of recyclable paper.',
    Plastik: 'Not quite! This doesn’t belong in Plastik. Maybe it’s glass or paper or organic waste?',
    Glas: 'Hmm, that doesn’t belong in Glas. Maybe it’s plastic, paper or has leftover food?'
  };
  export const bgImages = {
    Biodegradeable: './biodegradeable.png',
    Papier: './papier.png',
    Plastik: './plastik.png',
    Glas: './glas.png'
  };