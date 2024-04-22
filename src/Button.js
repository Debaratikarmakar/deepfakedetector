import React, { useState } from 'react';

// Functional component for the button
const Button = ({ onClick }) => {
  const [processing, setProcessing] = useState(false);
  const [showText, setShowText] = useState('processing');

  const handleClick = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      // Simulating either fake or original text after 2 seconds
      setShowText(Math.random() < 0.5 ? 'fake' : 'original');
    }, 2000);
    onClick(); // Call the onClick function passed from parent component
  };

  return (
    <button onClick={handleClick}>
      {processing ? 'Processing...' : showText === 'fake' ? 'Fake Text' : 'Original Text'}
    </button>
  );
};

export default Button;
