// components/ArrayBar.js
import React from 'react';
import './styles.css';

const ArrayBar = ({ array }) => {
  return (
    <div className="array-container">
      {array.map((value, index) => (
        <div 
          key={index} 
          className="array-bar"
          style={{ height: `${value}px` }}
        ></div>
      ))}
    </div>
  );
};

export default ArrayBar;
