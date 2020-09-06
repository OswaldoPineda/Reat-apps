import { useState, useEffect } from 'react';

const useMovement = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [direction, setDirection] = useState('down');

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === 'ArrowUp') move('up');
      if (e.key === 'ArrowDown') move('down');
      if (e.key === 'ArrowLeft') move('left');
      if (e.key === 'ArrowRight') move('right');
    };

    window.addEventListener('keydown', handleKeydown);
  }, []);

  const move = (direction) => {
    setDirection(direction);
    if (direction === 'up') setY((y) => y - 20);
    if (direction === 'down') setY((y) => y + 20);
    if (direction === 'left') setX((x) => x - 20);
    if (direction === 'right') setX((x) => x + 20);
  };

  return { x, y, direction, move };
};

export default useMovement;
