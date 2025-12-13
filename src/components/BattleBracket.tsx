import React from 'react';

const BattleBracket: React.FC = () => {
    return (
        <section className="bracket-section">
            <h3 className="section-title">Chaveamento</h3>

            <div className="bracket-container">
                {/* Quarter Finals */}
                <div className="round round-1">
                    <div className="match">
                        <div className="player winner">MC Zilla</div>
                        <div className="player">K-Brum</div>
                    </div>
                    <div className="match">
                        <div className="player">Dark</div>
                        <div className="player winner">Magrin</div>
                    </div>
                    <div className="match">
                        <div className="player winner">Neo</div>
                        <div className="player">Sombra</div>
                    </div>
                    <div className="match">
                        <div className="player">Vulto</div>
                        <div className="player winner">Cronos</div>
                    </div>
                </div>

                {/* Semis */}
                <div className="round round-2">
                    <div className="match">
                        <div className="player winner">MC Zilla</div>
                        <div className="player">Magrin</div>
                    </div>
                    <div className="match">
                        <div className="player">Neo</div>
                        <div className="player winner">Cronos</div>
                    </div>
                </div>

                {/* Final */}
                <div className="round round-3">
                    <div className="match final-match">
                        <div className="player winner">MC Zilla</div>
                        <div className="player">Cronos</div>
                    </div>
                </div>

                {/* Champion */}
                <div className="round round-4">
                    <div className="champion-box">
                        <span className="trophy">🏆</span>
                        <span className="champ-name">MC Zilla</span>
                    </div>
                </div>
            </div>

            <style>{`
        .bracket-section {
          padding: 4rem 2rem;
          background: var(--color-black-offset);
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow-x: auto;
        }

        .bracket-container {
          display: flex;
          gap: 4rem;
          align-items: center;
          padding: 2rem;
        }

        .round {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          gap: 2rem;
        }

        .match {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 0.5rem;
          width: 150px;
          position: relative;
        }

        .round-1 .match { margin-bottom: 1rem; }
        
        .round-2 { gap: 6rem; }

        .player {
          padding: 0.5rem;
          color: var(--color-silver);
          font-size: 0.9rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .player:last-child { border-bottom: none; }

        .winner {
          color: var(--color-neon-green);
          font-weight: bold;
          text-shadow: 0 0 5px var(--color-neon-green-dim);
        }

        /* Connecting Lines (Simplified with pseudo-elements) */
        .match::after {
          content: '';
          position: absolute;
          right: -2rem;
          top: 50%;
          width: 2rem;
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
        }

        .round-3 .match::after, .round-4 .champion-box::after { display: none; }

        .champion-box {
          border: 2px solid var(--color-neon-green);
          padding: 1rem 2rem;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 0 20px rgba(57, 255, 20, 0.2);
          animation: float 3s ease-in-out infinite;
        }

        .trophy { display: block; font-size: 2rem; margin-bottom: 0.5rem; }
        .champ-name { font-size: 1.2rem; font-weight: bold; color: var(--color-white); }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
        </section>
    );
};

export default BattleBracket;
