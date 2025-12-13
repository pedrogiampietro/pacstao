import React from 'react';
import CountdownTimer from './CountdownTimer';
import RSVPButton from './RSVPButton';

const Hero: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <img src="/assets/logo.png" alt="Pac'stão Logo" className="hero-logo" />

        <div className="motto-container">
          <span className="motto-text">Por Amor</span>
          <span className="motto-separator">•</span>
          <span className="motto-text">Por Cultura</span>
        </div>

        <h1 className="hero-title">PAC'STÃO</h1>

        <div className="hero-decoration">
          <div className="neon-line"></div>
          <p className="hero-date">15 DEZEMBRO ÀS 19H00</p>
          <div className="neon-line"></div>
        </div>

        <CountdownTimer />
        <RSVPButton />


        <p className="hero-location">Em frente a Biblioteca Parque de Manguinhos</p>
      </div>

      <style>{`
        .hero-section {
          height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background-image: url('/assets/hero-bg.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, rgba(5, 5, 5, 0.7) 0%, rgba(5, 5, 5, 0.95) 100%);
          z-index: 1;
        }

        .hero-content {
          z-index: 2;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-md);
          padding: 0 var(--spacing-md);
        }

        .hero-logo {
          width: 120px;
          height: auto;
          filter: drop-shadow(0 0 15px var(--color-neon-green-dim));
          margin-bottom: var(--spacing-sm);
        }

        .motto-container {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          margin-bottom: -1rem;
        }

        .motto-text {
          font-family: var(--font-body);
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: var(--color-silver);
        }

        .motto-separator {
          color: var(--color-neon-green);
        }

        .hero-title {
          font-size: 8rem;
          color: transparent;
          -webkit-text-stroke: 2px var(--color-white);
          text-shadow: 0 0 30px var(--color-neon-green-dim);
          letter-spacing: -0.05em;
          position: relative;
          margin: 0;
          line-height: 1;
        }
        
        .hero-title::before {
          content: "PAC'STÃO";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          color: var(--color-neon-green);
          -webkit-text-stroke: 0;
          opacity: 0.1;
          filter: blur(10px);
          z-index: -1;
        }

        .hero-decoration {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          margin-top: var(--spacing-lg);
        }

        .neon-line {
          height: 1px;
          background: var(--color-neon-green);
          width: 80px;
          box-shadow: 0 0 10px var(--color-neon-green);
        }

        .hero-date {
          font-family: var(--font-display);
          font-size: 1.25rem;
          color: var(--color-white);
          text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        }

        .hero-location {
          margin-top: var(--spacing-sm);
          color: var(--color-silver);
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          background: rgba(0, 0, 0, 0.6);
          padding: 8px 16px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 4rem;
          }
          .neon-line {
            width: 30px;
          }
          .hero-logo {
            width: 80px;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
