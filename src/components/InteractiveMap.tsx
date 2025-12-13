import React, { useState } from 'react';
import type { Roda } from '../data/rodas';
import { rodas } from '../data/rodas';

const InteractiveMap: React.FC = () => {
  const [activeRoda, setActiveRoda] = useState<Roda | null>(null);

  return (
    <section className="map-section">
      <div className="map-wrapper">
        <h3 className="section-title">O Território</h3>

        <div className="map-container">
          {/* Map Nodes */}
          {rodas.map((roda) => (
            <button
              key={roda.id}
              className={`map-pin ${activeRoda?.id === roda.id ? 'active' : ''}`}
              style={{ left: `${roda.coordinates.x}%`, top: `${roda.coordinates.y}%` }}
              onClick={() => setActiveRoda(roda)}
              onMouseEnter={() => setActiveRoda(roda)}
              aria-label={`View details for ${roda.name}`}
            >
              <div className="pin-icon">
                <div className="pin-pulse"></div>
              </div>
              <span className="pin-label">{roda.name}</span>
            </button>
          ))}
        </div>

        {/* Detail Card Sidebar */}
        <div className={`detail-panel ${activeRoda ? 'visible' : ''}`}>
          {activeRoda ? (
            <>
              <div className="panel-header">
                <span className="panel-tag">Roda Cultural</span>
                <h4 className="panel-title">{activeRoda.name}</h4>
              </div>

              <div className="panel-content">
                <div className="info-row">
                  <span className="label">Onde</span>
                  <span className="value">{activeRoda.location}</span>
                </div>
                <div className="info-row">
                  <span className="label">Quando</span>
                  <span className="value">{activeRoda.day} • {activeRoda.time}</span>
                </div>
                {activeRoda.battleType && (
                  <div className="info-row">
                    <span className="label">Batalha</span>
                    <span className="value highlight">{activeRoda.battleType}</span>
                  </div>
                )}

                {activeRoda.mcs && (
                  <div className="mcs-section">
                    <span className="label">Line-up Confirmado</span>
                    <div className="mcs-list">
                      {activeRoda.mcs.map(mc => <span key={mc} className="mc-tag">{mc}</span>)}
                    </div>
                  </div>
                )}

                {activeRoda.description && (
                  <p className="panel-desc">{activeRoda.description}</p>
                )}

                {activeRoda.social && (
                  <a href={`https://instagram.com/${activeRoda.social.replace('@', '')}`} target="_blank" className="social-link">
                    Seguir {activeRoda.social}
                  </a>
                )}
              </div>
            </>
          ) : (
            <div className="panel-placeholder">
              <p>Selecione um ponto no mapa</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .map-section {
          min-height: 100vh;
          width: 100%;
          background-color: var(--color-black);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-lg);
          position: relative;
        }

        .section-title {
          position: absolute;
          top: -3rem;
          left: 0;
          color: var(--color-white);
          font-size: 2rem;
          text-transform: uppercase;
        }

        .map-wrapper {
          position: relative;
          width: 90%;
          max-width: 1200px;
          height: 70vh;
          display: flex;
          gap: var(--spacing-md);
        }

        .map-container {
          flex: 2;
          position: relative;
          background-image: url('/assets/map-bg.png');
          background-size: cover;
          background-position: center;
          border-radius: var(--radius-lg);
          border: 1px solid rgba(57, 255, 20, 0.2);
          box-shadow: 0 0 30px rgba(0,0,0,0.5);
          overflow: hidden;
        }

        .map-container::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, transparent 40%, rgba(5,5,5,0.6) 100%);
          pointer-events: none;
        }

        .map-pin {
          position: absolute;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          z-index: 10;
          transition: all 0.3s ease;
        }

        .pin-icon {
          width: 20px;
          height: 20px;
          background: var(--color-neon-green);
          border-radius: 50%;
          position: relative;
          box-shadow: 0 0 10px var(--color-neon-green);
        }

        .pin-pulse {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1px solid var(--color-neon-green);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { width: 100%; height: 100%; opacity: 1; }
          100% { width: 300%; height: 300%; opacity: 0; }
        }

        .map-pin:hover {
          transform: translate(-50%, -50%) scale(1.1);
          z-index: 20;
        }

        .pin-label {
          background: rgba(0, 0, 0, 0.8);
          color: var(--color-white);
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
          white-space: nowrap;
          border: 1px solid rgba(255, 255, 255, 0.1);
          opacity: 0.8;
          transition: opacity 0.3s;
        }

        .map-pin:hover .pin-label,
        .map-pin.active .pin-label {
          opacity: 1;
          border-color: var(--color-neon-green);
          color: var(--color-neon-green);
        }

        .detail-panel {
          flex: 1;
          background: rgba(15, 15, 15, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-lg);
          padding: var(--spacing-lg);
          display: flex;
          flex-direction: column;
          min-width: 300px;
          backdrop-filter: blur(20px);
        }

        .panel-placeholder {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.3);
          font-style: italic;
        }

        .panel-header {
          margin-bottom: var(--spacing-lg);
          border-bottom: 2px solid var(--color-neon-green);
          padding-bottom: var(--spacing-md);
        }

        .panel-tag {
          font-size: 0.75rem;
          text-transform: uppercase;
          color: var(--color-silver);
          letter-spacing: 0.1em;
        }

        .panel-title {
          font-size: 2.5rem;
          color: var(--color-white);
          line-height: 1;
          margin-top: var(--spacing-sm);
        }

        .info-row {
          margin-bottom: var(--spacing-md);
        }

        .label {
          display: block;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .value {
          font-size: 1.1rem;
          color: var(--color-silver);
        }

        .highlight {
          color: var(--color-neon-green);
          font-weight: 700;
        }

        .mcs-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: var(--spacing-sm);
        }

        .mc-tag {
          background: rgba(57, 255, 20, 0.1);
          color: var(--color-neon-green);
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.85rem;
          border: 1px solid rgba(57, 255, 255, 0.3);
        }

        .panel-desc {
          margin-top: var(--spacing-lg);
          font-size: 0.95rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.7);
          font-style: italic;
        }

        .social-link {
          display: inline-block;
          margin-top: var(--spacing-lg);
          color: var(--color-black);
          background: var(--color-neon-green);
          padding: 10px 20px;
          border-radius: 4px;
          font-weight: 600;
          font-size: 0.9rem;
          transition: transform 0.2s;
        }
        
        .social-link:hover {
          transform: translateY(-2px);
        }

        @media (max-width: 900px) {
          .map-section {
            min-height: auto;
            padding: 2rem 1rem;
            display: block; /* Remove flex centering constraint */
          }
          .map-wrapper {
            display: flex;
            flex-direction: column;
            height: auto;
            width: 100%;
            gap: 2rem;
          }
          .map-container {
            flex: none; /* Disable flex scaling */
            width: 100%;
            height: 300px; /* Reduced height for better fit */
            order: -1; /* Ensure it stays on top */
          }
          .detail-panel {
            flex: none;
            width: 100%;
            min-height: 250px;
          }
          .section-title {
            position: relative; /* Reset absolute positioning */
            top: 0;
            margin-bottom: 2rem;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
};

export default InteractiveMap;
