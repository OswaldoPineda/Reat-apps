import React, { useState, useRef } from 'react';
import './App.css';

const padTime = (time) => ( time.toString().padStart(2, '0') );

export default function App() {
  const [title, setTitle] = useState('Let the countdown begin!!!');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft - minutes * 60);
  const intervalRef = useRef(null);

  const startTimer = () => {
    if(intervalRef.current !== null) return;

    setIsRunning(true);
    setTitle(`You're doing great!!`);
    intervalRef.current = setInterval(() => {
      setTimeLeft(timeLeft => {
        if (timeLeft > 1) return timeLeft -1;

        return 0;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if(intervalRef.current === null) return;

    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTitle(`Keep it up!!!`);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTitle('Ready to another round?');
    setTimeLeft(25 * 60);
    setIsRunning(false);
  };

  return (
    <div className="app">
      <h2>{title}!</h2>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}
