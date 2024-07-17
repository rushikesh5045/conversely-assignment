import React, { useState } from 'react';
import './Matrix.css';

const Matrix = () => {
  const [boxes, setBoxes] = useState(Array(9).fill({ color: 'white', order: null }));
  const [clickCount, setClickCount] = useState(0);

  const handleClick = (index) => {
    if (boxes[index].color !== 'white') return;

    const newClick = clickCount + 1;
    setClickCount(newClick);
    
    setBoxes(prevBoxes => {
      const newBoxes = [...prevBoxes];
      newBoxes[index] = { color: 'green', order: newClick };
      
      if (newClick === 9) { 
        setTimeout(() => colorChange(), 100);
      }
      
      return newBoxes;
    });
  };

  const colorChange = () => {
    for (let i = 1; i <= 9; i++) {
      setTimeout(() => {
        setBoxes(prevBoxes => {
          const newBoxes = [...prevBoxes];
          const index = newBoxes.findIndex(box => box.order === i);
          if (index !== -1) {
            newBoxes[index] = { ...newBoxes[index], color: 'orange' };
          }
          return newBoxes;
        });
      }, i * 500);
    }
  };

  return (
    <div className="matrix">
      {boxes.map((box, index) => (
        <div
          key={index}
          className="box"
          style={{ backgroundColor: box.color }}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default Matrix;