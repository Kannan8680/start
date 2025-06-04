import React, { useState, useEffect, useRef } from 'react';

const AnimatedShakeCpuFanButton = () => {
  const buttonRef = useRef(null);

  // Durations in ms for shaking (lower means faster shaking)
  const shakeVerySlow = 800; 
  const shakeSlow = 500;     
  const shakeMediumFast = 200;  

  // Durations in ms for fan rotation
  const rollVerySlow = 3200; 
  const rollSlow = 2000;     
  const rollMediumFast = 700;  

  const updateInterval = 50; 
  const accelDuration = 1500; 
  const decelDuration = 1500; 

  const shakeAccelStep = (shakeSlow - shakeMediumFast) / (accelDuration / updateInterval);
  const rollAccelStep = (rollSlow - rollMediumFast) / (accelDuration / updateInterval);

  const [shakeDuration, setShakeDuration] = useState(shakeVerySlow);
  const [rollDuration, setRollDuration] = useState(rollVerySlow);
  const [isActive, setIsActive] = useState(false);

  const acceleratingRef = useRef(false);
  const deceleratingRef = useRef(false);
  const accelIntervalRef = useRef(null);
  const decelIntervalRef = useRef(null);

  const clamp = (val, min, max) => {
    if (val < min) return min;
    if (val > max) return max;
    return val;
  };

  const applyDurations = (shakeDur, rollDur) => {
    if (buttonRef.current) {
      buttonRef.current.style.setProperty('--shake-duration', shakeDur + 'ms');
      buttonRef.current.style.setProperty('--roll-duration', rollDur + 'ms');
    }
  };

  const startAcceleration = () => {
    if (acceleratingRef.current) return;
    acceleratingRef.current = true;
    deceleratingRef.current = false;

    let shakeDur = shakeSlow;
    let rollDur = rollSlow;

    setShakeDuration(shakeDur);
    setRollDuration(rollDur);
    setIsActive(true);

    applyDurations(shakeDur, rollDur);

    clearInterval(decelIntervalRef.current);

    accelIntervalRef.current = setInterval(() => {
      if (!acceleratingRef.current) {
        clearInterval(accelIntervalRef.current);
        return;
      }

      shakeDur -= shakeAccelStep;
      rollDur -= rollAccelStep;

      shakeDur = clamp(shakeDur, shakeMediumFast, shakeSlow);
      rollDur = clamp(rollDur, rollMediumFast, rollSlow);

      setShakeDuration(shakeDur);
      setRollDuration(rollDur);
      applyDurations(shakeDur, rollDur);

      if (shakeDur === shakeMediumFast && rollDur === rollMediumFast) {
        clearInterval(accelIntervalRef.current);
        acceleratingRef.current = false;
      }
    }, updateInterval);
  };

  const startDeceleration = () => {
    if (deceleratingRef.current) return;
    deceleratingRef.current = true;
    acceleratingRef.current = false;

    clearInterval(accelIntervalRef.current);
    clearInterval(decelIntervalRef.current);

    let shakeDur = shakeDuration;
    let rollDur = rollDuration;

    const stepsCount = decelDuration / updateInterval;
    const shakeDecelStep = (shakeVerySlow - shakeDur) / stepsCount;
    const rollDecelStep = (rollVerySlow - rollDur) / stepsCount;

    decelIntervalRef.current = setInterval(() => {
      if (!deceleratingRef.current) {
        clearInterval(decelIntervalRef.current);
        return;
      }

      shakeDur += shakeDecelStep;
      rollDur += rollDecelStep;

      shakeDur = clamp(shakeDur, shakeMediumFast, shakeVerySlow);
      rollDur = clamp(rollDur, rollMediumFast, rollVerySlow);

      setShakeDuration(shakeDur);
      setRollDuration(rollDur);
      applyDurations(shakeDur, rollDur);

      const nearStopThreshold = 10;
      const shakeStop = (shakeDur >= shakeVerySlow - nearStopThreshold);
      const rollStop = (rollDur >= rollVerySlow - nearStopThreshold);

      if (shakeStop && rollStop) {
        clearInterval(decelIntervalRef.current);
        setTimeout(() => {
          setIsActive(false);
          deceleratingRef.current = false;
        }, 300);
      }
    }, updateInterval);
  };

  React.useEffect(() => {
    return () => {
      clearInterval(accelIntervalRef.current);
      clearInterval(decelIntervalRef.current);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes shake-blur {
          0%, 100% {
            transform: translate(0, 0);
            filter: blur(0);
            filter: drop-shadow(0 0 transparent);
          }
          12.5% {
            transform: translate(-2px, -2px);
            filter: drop-shadow(-3px -3px 2px rgba(59, 130, 246, 0.5));
          }
          37.5% {
            transform: translate(2px, -2px);
            filter: drop-shadow(3px -3px 2px rgba(59, 130, 246, 0.5));
          }
          62.5% {
            transform: translate(2px, 2px);
            filter: drop-shadow(3px 3px 2px rgba(59, 130, 246, 0.5));
          }
          87.5% {
            transform: translate(-2px, 2px);
            filter: drop-shadow(-3px 3px 2px rgba(59, 130, 246, 0.5));
          }
        }
        @keyframes roll {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .btn-shake {
          animation-name: shake-blur;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-direction: normal;
          animation-fill-mode: forwards;
          animation-play-state: paused;
          animation-duration: var(--shake-duration, 0.5s);
          will-change: transform, filter;
          outline: none;
          cursor: pointer;
          background-color: #2563eb;
          color: white;
          font-weight: 600;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.5),
                      0 4px 6px -2px rgba(59, 130, 246, 0.3);
          border: none;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          transition: background-color 0.3s ease;
          user-select: none;
        }
        .btn-shake:hover {
          background-color: #1d4ed8;
        }
        .btn-shake.active {
          animation-play-state: running;
        }
        .btn-shake.active .fan {
          animation-play-state: running;
        }
        .fan {
          width: 1.5rem;
          height: 1.5rem;
          animation-name: roll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-play-state: paused;
          animation-duration: var(--roll-duration, 2s);
          will-change: transform;
          flex-shrink: 0;
        }
      `}</style>
      <button
        ref={buttonRef}
        className={`btn-shake${isActive ? ' active' : ''}`}
        onMouseEnter={startAcceleration}
        onFocus={startAcceleration}
        onMouseLeave={startDeceleration}
        onBlur={startDeceleration}
        type="button"
        aria-label="Hover to animate button with CPU fan"
      >
        <span>Hover Me</span>
        {/* CPU Fan SVG */}
        <svg
          className="fan"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="32" cy="32" r="30" stroke="white" strokeWidth="4" />
          {/* Fan blades */}
          <path
            fill="white"
            d="M32 12c5 0 9 5 9 9l-9 9-9-9c0-4 4-9 9-9z"
            opacity="0.8"
            transform="rotate(0 32 32)"
          />
          <path
            fill="white"
            d="M32 12c5 0 9 5 9 9l-9 9-9-9c0-4 4-9 9-9z"
            opacity="0.8"
            transform="rotate(90 32 32)"
          />
          <path
            fill="white"
            d="M32 12c5 0 9 5 9 9l-9 9-9-9c0-4 4-9 9-9z"
            opacity="0.8"
            transform="rotate(180 32 32)"
          />
          <path
            fill="white"
            d="M32 12c5 0 9 5 9 9l-9 9-9-9c0-4 4-9 9-9z"
            opacity="0.8"
            transform="rotate(270 32 32)"
          />
          {/* Hub */}
          <circle cx="32" cy="32" r="6" fill="white" />
        </svg>
      </button>
    </>
  );
};

export default AnimatedShakeCpuFanButton;
