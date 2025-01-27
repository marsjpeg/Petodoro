import React, { useState, useEffect } from 'react'
import Pet from './Pet.jsx';

function Timer() {
    const [timeRemaining, setTimeRemaining] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [isWorkMode, setIsWorkMode] = useState(true);
    const [isAutoBreak, setIsAutoBreak] = useState(true);
  
    useEffect(() => {
      let interval = null;
      if (isRunning) {
        interval = setInterval(() => {
          setTimeRemaining((prev) => {
            if (prev <= 0) {
                if (isAutoBreak) {
                    setIsWorkMode(false);
                    return 5 * 60;
                } else {
                    setIsRunning(false);
                    setIsWorkMode(false);
                    return 5 * 60;
                }
            }
            return prev - 1;
          });
        }, 1000);
      }
      return () => clearInterval(interval);
    }, [isRunning, isWorkMode, isAutoBreak]);
  
    const handleStartPause = () => {
        setIsRunning((prev) => !prev);
        if (!isRunning && !isWorkMode) {
          setIsWorkMode(true);
          setTimeRemaining(25 * 60);
        }
      };
    
      const handleReset = () => {
        setIsRunning(false);
        setTimeRemaining(25 * 60);
        setIsWorkMode(true);
        setIsAutoBreak(true);
      };
    
      const handleAutoBreakToggle = () => {
        setIsAutoBreak((prev) => !prev);
      };
  
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
  
    return (
        <div className="timer-container">
          <br/>
          <div className="mode">{isWorkMode ? 'Work Mode' : 'Break Mode'}</div>
          <div className="timer">{formatTime(timeRemaining)}</div>
          <br/>
          <Pet />
          <div className="controls">
            <button onClick={handleStartPause}>
              {isRunning ? 'Pause' : 'Start'}
            </button>
            <button onClick={handleReset}>Reset</button>
            <br/>
            <br/>
          </div>
          <div className="auto-break-toggle">
            Automatic Breaks:
            <input
              type="checkbox"
              id="auto-break-toggle"
              checked={isAutoBreak}
              onChange={handleAutoBreakToggle}
            />
            <label htmlFor="auto-break-toggle"></label>
            <br/>
            <br/>
          </div>
        </div>
      );
    }

export default Timer