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
    { name: 'Tissues/Old Papers', category: 'Paper' },
    { name: 'Bottles/Plastic Bags', category: 'Plastic' },
    { name: 'Beer bottles/Jars', category: 'Glass' },
  ];
  
  export const categoryDescriptions = {
    Biodegradeable: 'Good! Biodegradeable is for items that cannot be recycled like vegetable and food remains.',
    Paper: 'Great! Paper is for recyclable paper like documents, envelopes, and newspapers.',
    Plastic: 'Amazing! Plastic is for plastic items like bottles and wraps.',
    Glass: 'Yay! Glasss is for recyclable Glasss like pickle and jam jars.'
  };
  
  export const wrongCategoryReasons = {
    Biodegradeable: 'Oops! This item can be recycled and should not go to Biodegradeable.',
    Paper: 'Nope! This item isn’t clean or made of recyclable paper.',
    Plastic: 'Not quite! This doesn’t belong in Plastic. Maybe it’s Glasss or paper or organic waste?',
    Glass: 'Hmm, that doesn’t belong in Glasss. Maybe it’s plastic, paper or has leftover food?'
  };
  export const bgImages = {
    Biodegradeable: './biodegradeable.png',
    Paper: './paper.png',
    Plastic: './Plastic.png',
    Glass: './Glass.png'
  };