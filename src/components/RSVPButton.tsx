import React from 'react';
import confetti from 'canvas-confetti';

const RSVPButton: React.FC = () => {
    const handleClick = () => {
        // Fire confetti
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => {
            return Math.random() * (max - min) + min;
        };

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: ['#39ff14', '#ffffff', '#000000']
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: ['#39ff14', '#ffffff', '#000000']
            });
        }, 250);

        // Redirect to event (placeholder)
        // window.open('https://instagram.com/pacstao', '_blank');
    };

    return (
        <button className="rsvp-button" onClick={handleClick}>
            <span className="button-text">VOU COLAR</span>
            <div className="button-glitch"></div>

            <style>{`
        .rsvp-button {
          position: relative;
          padding: 1rem 3rem;
          background: transparent;
          border: 2px solid var(--color-neon-green);
          color: var(--color-neon-green);
          font-family: var(--font-display);
          font-size: 1.5rem;
          text-transform: uppercase;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 0 20px rgba(57, 255, 20, 0.2);
          margin-top: 2rem;
        }

        .rsvp-button:hover {
          background: var(--color-neon-green);
          color: var(--color-black);
          box-shadow: 0 0 50px rgba(57, 255, 20, 0.6);
          transform: scale(1.05);
        }

        .button-text {
          position: relative;
          z-index: 10;
        }
      `}</style>
        </button>
    );
};

export default RSVPButton;
