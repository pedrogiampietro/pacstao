import React, { useEffect, useRef } from 'react';

const events = [
    { year: '2018', title: 'O Início', desc: 'A primeira roda acontece na praça, com apenas um amplificador e muita vontade.' },
    { year: '2020', title: 'Resistência', desc: 'Mesmo com as dificuldades, a cultura se manteve viva através das lives e batalhas online.' },
    { year: '2022', title: 'A Retomada', desc: 'Volta às ruas com público recorde e a primeira edição do "Rei do Sangue".' },
    { year: '2024', title: 'O Legado', desc: 'Hoje somos referência na cena, conectando MCs de toda a região e além.' },
];

const LegacyTimeline: React.FC = () => {
    const timelineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.2 });

        const nodes = timelineRef.current?.querySelectorAll('.timeline-node');
        nodes?.forEach(node => observer.observe(node));

        return () => observer.disconnect();
    }, []);

    return (
        <section className="timeline-section" ref={timelineRef}>
            <h3 className="section-title">Nossa História</h3>

            <div className="timeline-container">
                <div className="timeline-line"></div>

                {events.map((event, index) => (
                    <div key={event.year} className={`timeline-node ${index % 2 === 0 ? 'left' : 'right'}`}>
                        <div className="node-content">
                            <span className="node-year">{event.year}</span>
                            <h4 className="node-title">{event.title}</h4>
                            <p className="node-desc">{event.desc}</p>
                        </div>
                        <div className="node-marker"></div>
                    </div>
                ))}
            </div>

            <style>{`
        .timeline-section {
          padding: 4rem 2rem;
          background: #050505;
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow: hidden;
        }

        .timeline-container {
          position: relative;
          max-width: 1000px;
          width: 100%;
          padding: 2rem 0;
        }

        .timeline-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, transparent, var(--color-neon-green), transparent);
          transform: translateX(-50%);
        }

        .timeline-node {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 4rem;
          position: relative;
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s ease-out;
        }

        .timeline-node.visible {
            opacity: 1;
            transform: translateY(0);
        }

        .node-content {
          width: 45%;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          position: relative;
          transition: all 0.3s;
        }

        .node-content:hover {
            border-color: var(--color-neon-green);
            background: rgba(57, 255, 20, 0.05);
            transform: scale(1.02);
        }

        .left .node-content { margin-right: auto; text-align: right; }
        .right .node-content { margin-left: auto; text-align: left; }

        .node-marker {
          position: absolute;
          left: 50%;
          width: 20px;
          height: 20px;
          background: var(--color-black);
          border: 2px solid var(--color-neon-green);
          border-radius: 50%;
          transform: translateX(-50%);
          z-index: 2;
          box-shadow: 0 0 15px var(--color-neon-green);
        }

        .node-year {
          display: block;
          font-family: var(--font-display);
          font-size: 2rem;
          color: var(--color-neon-green);
          margin-bottom: 0.5rem;
        }

        .node-title {
          color: var(--color-white);
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          font-weight: bold;
        }

        .node-desc {
          color: var(--color-silver);
          font-size: 0.9rem;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .timeline-line { left: 20px; }
          .timeline-node { flex-direction: column; align-items: flex-start; margin-left: 20px; }
          .node-marker { left: 0; }
          .node-content { width: 100%; margin: 0 0 0 2rem !important; text-align: left !important; }
        }
      `}</style>
        </section>
    );
};

export default LegacyTimeline;
