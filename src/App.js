import React, { useState, useRef, useEffect } from 'react';
import beep from './beep.mp3';
const PomodoroClock = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerLabel, setTimerLabel] = useState('Session');
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isRunning, setIsRunning] = useState(false);

  const beepRef = useRef(null);

  useEffect(() => {
    const handleTick = () => {
      if (isRunning && timeLeft > 0) {
        setTimeLeft((prevTime) => prevTime - 1);
      } else if (timeLeft === 0) {
        beepRef.current.play();
        if (timerLabel === 'Session') {
          setTimerLabel('Break');
          setTimeLeft(breakLength * 60);
        } else {
          setTimerLabel('Session');
          setTimeLeft(sessionLength * 60);
        }
      }
    };

    const interval = setInterval(handleTick, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, timerLabel, breakLength, sessionLength]);

  const handleReset = () => {
    beepRef.current.pause();
    beepRef.current.currentTime = 0;
    setBreakLength(5);
    setSessionLength(25);
    setTimerLabel('Session');
    setTimeLeft(25 * 60);
    setIsRunning(false);
  };

  const handleStartStop = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const handleIncrement = (type) => {
    if (type === 'break' && breakLength < 60) {
      setBreakLength((prevLength) => prevLength + 1);
    } else if (type === 'session' && sessionLength < 60) {
      setSessionLength((prevLength) => prevLength + 1);
      setTimeLeft((prevTime) => (prevTime === sessionLength * 60 ? (sessionLength + 1) * 60 : prevTime));
    }
  };

  const handleDecrement = (type) => {
    if (type === 'break' && breakLength > 1) {
      setBreakLength((prevLength) => prevLength - 1);
    } else if (type === 'session' && sessionLength > 1) {
      setSessionLength((prevLength) => prevLength - 1);
      setTimeLeft((prevTime) => (prevTime === sessionLength * 60 ? (sessionLength - 1) * 60 : prevTime));
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div>
      <div id="break-label" className="tag">Break Length: <div id="break-length">{breakLength}</div></div>
      <div id="session-label" className="tag">Session Length: <div id="session-length">{sessionLength}</div></div>
      <button id="break-decrement" className="button-break" onClick={() => handleDecrement('break')}>
        Decrease Break
      </button>
      <button id="break-increment" className="button-break" onClick={() => handleIncrement('break')}>
        Increase Break
      </button>
      <button id="session-decrement" className="button-session" onClick={() => handleDecrement('session')}>
        Decrease Session
      </button>
      <button id="session-increment" className="button-session" onClick={() => handleIncrement('session')}>
        Increase Session
      </button>
      <div id="timer-label">{timerLabel}</div>
      <div id="time-left">{formatTime(timeLeft)}</div>
      <button id="start_stop" onClick={handleStartStop}>
        Start/Stop
      </button>
      <button id="reset" onClick={handleReset}>
        Reset
      </button>
      <audio id="beep" ref={beepRef} src={beep} />
    </div>
  );
};

export default PomodoroClock;
