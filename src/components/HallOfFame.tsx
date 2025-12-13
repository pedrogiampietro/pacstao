import React from 'react';

const champions = [
    { id: 1, name: 'MC Aleatória', title: 'Campeã 2024', img: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { id: 2, name: 'Darth MC', title: 'Rei do Sangue', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { id: 3, name: 'Poeta da Norte', title: 'Mestre Conhecimento', img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { id: 4, name: 'Flow Zilla', title: 'Revelação', img: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
];

const HallOfFame: React.FC = () => {
    return (
        <section className="hof-section">
            <h3 className="section-title">Hall da Fama</h3>

            <div className="gallery-container">
                {champions.map((champ) => (
                    <div key={champ.id} className="champ-card">
                        <div className="card-image" style={{ backgroundImage: `url(${champ.img})` }}></div>
                        <div className="card-info">
                            <h4 className="champ-name">{champ.name}</h4>
                            <span className="champ-title">{champ.title}</span>
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
        .hof-section {
          padding: 4rem 2rem;
          background: linear-gradient(to bottom, var(--color-black), #0a0a0a);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .section-title {
          font-size: 2.5rem;
          color: var(--color-white);
          text-transform: uppercase;
          margin-bottom: 3rem;
          text-shadow: 0 0 20px rgba(57, 255, 20, 0.3);
        }

        .gallery-container {
          display: flex;
          gap: 2rem;
          overflow-x: auto;
          width: 100%;
          max-width: 1200px;
          padding: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .champ-card {
          width: 250px;
          height: 350px;
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: transform 0.3s ease;
          cursor: pointer;
        }

        .champ-card:hover {
          transform: translateY(-10px);
          border-color: var(--color-neon-green);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .card-image {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          filter: grayscale(100%);
          transition: filter 0.3s;
        }

        .champ-card:hover .card-image {
          filter: grayscale(0%);
        }

        .card-info {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 1.5rem 1rem;
          background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
          transform: translateY(20px);
          transition: transform 0.3s;
        }

        .champ-card:hover .card-info {
          transform: translateY(0);
        }

        .champ-name {
          color: var(--color-white);
          font-size: 1.2rem;
          margin: 0;
        }

        .champ-title {
          color: var(--color-neon-green);
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
      `}</style>
        </section>

    );
};

export default HallOfFame;
