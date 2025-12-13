import React, { useState, useEffect } from 'react';

const CountdownTimer: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        // Target: Dec 15, 2025 19:00:00 (Adjust year if needed, assuming upcoming event)
        const targetDate = new Date('2025-12-15T19:00:00').getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference < 0) {
                clearInterval(interval);
                return;
            }

            setTimeLeft({
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((difference % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="countdown-container">
            <div className="time-block">
                <span className="time-value">{String(timeLeft.days).padStart(2, '0')}</span>
                <span className="time-label">Dias</span>
            </div>
            <span className="separator">:</span>
            <div className="time-block">
                <span className="time-value">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="time-label">Hrs</span>
            </div>
            <span className="separator">:</span>
            <div className="time-block">
                <span className="time-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="time-label">Min</span>
            </div>
            <span className="separator">:</span>
            <div className="time-block">
                <span className="time-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="time-label">Seg</span>
            </div>

            <style>{`
        .countdown-container {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 1rem;
          padding: 1rem 2rem;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid var(--color-neon-green-dim);
          border-radius: 8px;
          backdrop-filter: blur(5px);
        }

        .time-block {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .time-value {
          font-family: var(--font-display);
          font-size: 2rem;
          color: var(--color-neon-green);
          line-height: 1;
          text-shadow: 0 0 10px var(--color-neon-green-dim);
        }

        .time-label {
          font-size: 0.75rem;
          color: var(--color-silver);
          text-transform: uppercase;
        }

        .separator {
          font-family: var(--font-display);
          font-size: 2rem;
          color: var(--color-white);
          margin-bottom: 1rem;
        }

        @media (max-width: 768px) {
          .countdown-container {
            gap: 0.5rem;
            padding: 0.5rem 1rem;
          }
          .time-value {
            font-size: 1.5rem;
          }
        }
      `}</style>
        </div>
    );
};

export default CountdownTimer;
