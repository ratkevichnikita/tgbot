import React from 'react';
import './button.css';

const Button = ({children}) => {
  return (
    <button >
      {children}
    </button>
  );
};

export default Button;