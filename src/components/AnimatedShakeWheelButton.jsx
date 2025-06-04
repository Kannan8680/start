import React, { useState, useEffect, useRef } from 'react';

const AnimatedShakeWheelButton = ({ onClick, children }) => {
  const buttonRef = useRef(null);

  const shakeVerySlow = 800;
  const shakeSlow = 500;
  const shakeMediumFast = 200;

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

  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

  const applyDurations = (shakeDur, rollDur) => {
    if (buttonRef.current) {
      buttonRef.current.style.setProperty('--shake-duration', `${shakeDur}ms`);
      buttonRef.current.style.setProperty('--roll-duration', `${rollDur}ms`);
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

      shakeDur = clamp(shakeDur - shakeAccelStep, shakeMediumFast, shakeSlow);
      rollDur = clamp(rollDur - rollAccelStep, rollMediumFast, rollSlow);

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

      shakeDur = clamp(shakeDur + shakeDecelStep, shakeMediumFast, shakeVerySlow);
      rollDur = clamp(rollDur + rollDecelStep, rollMediumFast, rollVerySlow);

      setShakeDuration(shakeDur);
      setRollDuration(rollDur);
      applyDurations(shakeDur, rollDur);

      if (shakeDur >= shakeVerySlow - 10 && rollDur >= rollVerySlow - 10) {
        clearInterval(decelIntervalRef.current);
        setTimeout(() => {
          setIsActive(false);
          deceleratingRef.current = false;
        }, 300);
      }
    }, updateInterval);
  };

  useEffect(() => {
    return () => {
      clearInterval(accelIntervalRef.current);
      clearInterval(decelIntervalRef.current);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes shake-blur {
          0%, 100% { transform: translate(0, 0); filter: blur(0); }
          12.5% { transform: translate(-2px, -2px); filter: drop-shadow(-3px -3px 2px rgba(59, 130, 246, 0.5)); }
          37.5% { transform: translate(2px, -2px); filter: drop-shadow(3px -3px 2px rgba(59, 130, 246, 0.5)); }
          62.5% { transform: translate(2px, 2px); filter: drop-shadow(3px 3px 2px rgba(59, 130, 246, 0.5)); }
          87.5% { transform: translate(-2px, 2px); filter: drop-shadow(-3px 3px 2px rgba(59, 130, 246, 0.5)); }
        }
        @keyframes roll {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .btn-shake {
          animation-name: shake-blur;
          animation-duration: var(--shake-duration, 500ms);
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-play-state: paused;
          animation-fill-mode: forwards;
          background: linear-gradient(to right, #2563eb, #7c3aed);
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          color: white;
          border: none;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease;
          box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.5),
                      0 4px 6px -2px rgba(59, 130, 246, 0.3);
        }
        .btn-shake:hover {
          background: linear-gradient(to right, #1d4ed8, #6b21a8);
        }
        .btn-shake.active {
          animation-play-state: running;
        }
        .btn-shake.active .wheel {
          animation-play-state: running;
        }
        .wheel {
          width: 1.5rem;
          height: 1.5rem;
          animation-name: roll;
          animation-duration: var(--roll-duration, 2s);
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-play-state: paused;
          flex-shrink: 0;
        }
      `}</style>
      <button
        ref={buttonRef}
        className={`btn-shake${isActive ? ' active' : ''}`}
        onMouseEnter={startAcceleration}
        onMouseLeave={startDeceleration}
        onFocus={startAcceleration}
        onBlur={startDeceleration}
        onClick={onClick}
      >
        {children}
        <svg
          className="wheel"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="32"
            cy="32"
            r="30"
            stroke="white"
            strokeWidth="4"
            fill="transparent"
          />
          <g transform="translate(32, 32)">
            {/* Three fan blades shaped as arcs with gaps */}
            <path
              d="M0,-22 A10,10 0 0,1 8.66,-17.5 L4,0 Z"
              fill="white"
              transform="rotate(0)"
            />
            <path
              d="M0,-22 A10,10 0 0,1 8.66,-17.5 L4,0 Z"
              fill="white"
              transform="rotate(120)"
            />
            <path
              d="M0,-22 A10,10 0 0,1 8.66,-17.5 L4,0 Z"
              fill="white"
              transform="rotate(240)"
            />
          </g>
        </svg>
      </button>
    </>
  );
};

export default AnimatedShakeWheelButton;
