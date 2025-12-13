import React, { useState, useRef } from 'react';

interface Sticker {
    id: number;
    type: 'text' | 'image';
    content: string;
    x: number;
    y: number;
    rotation: number;
    scale: number;
}

const GraffitiWall: React.FC = () => {
    const [stickers, setStickers] = useState<Sticker[]>([]);
    const wallRef = useRef<HTMLDivElement>(null);
    const [selectedTool, setSelectedTool] = useState<{ type: 'text' | 'image', content: string }>(
        { type: 'text', content: '🔥' }
    );

    const tools = [
        { type: 'text', content: '🔥', label: 'Fogo' },
        { type: 'text', content: '👑', label: 'Coroa' },
        { type: 'text', content: '💣', label: 'Bomba' },
        { type: 'image', content: '/assets/stickers/pac.png', label: 'PAC Tag' },
        { type: 'image', content: '/assets/stickers/mic.png', label: 'Microfone' },
        { type: 'image', content: '/assets/stickers/spray.png', label: 'Lata' },
        { type: 'image', content: '/assets/stickers/sound.png', label: 'Boombox' },
        { type: 'image', content: '/assets/stickers/favela.png', label: '100% Favela' },
        { type: 'image', content: '/assets/logo.png', label: 'Logo' },
    ];

    const handleWallClick = (e: React.MouseEvent) => {
        if (!wallRef.current) return;
        const rect = wallRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newSticker: Sticker = {
            id: Date.now(),
            type: selectedTool.type as 'text' | 'image',
            content: selectedTool.content,
            x,
            y,
            rotation: Math.random() * 30 - 15,
            scale: Math.random() * 0.4 + 0.8 // Random variation
        };

        setStickers([...stickers, newSticker]);
    };

    return (
        <section className="graffiti-section">
            <h3 className="section-title">Mural Interativo</h3>
            <p className="instruction">Escolha um sticker e clique no muro para colar</p>

            <div className="wall-interface">
                <div className="toolbox">
                    {tools.map(tool => (
                        <button
                            key={tool.content}
                            className={`tool-btn ${selectedTool.content === tool.content ? 'selected' : ''}`}
                            onClick={() => setSelectedTool({ type: tool.type as 'text' | 'image', content: tool.content })}
                            title={tool.label}
                        >
                            {tool.type === 'text' ? tool.content : (
                                <img src={tool.content} alt={tool.label} className="tool-icon" />
                            )}
                        </button>
                    ))}
                    <button className="clear-btn" onClick={() => setStickers([])}>Limpar</button>
                </div>

                <div className="wall-area" ref={wallRef} onClick={handleWallClick}>
                    <div className="brick-texture"></div>
                    {stickers.map(sticker => (
                        <div
                            key={sticker.id}
                            className="sticker"
                            style={{
                                left: sticker.x,
                                top: sticker.y,
                                transform: `translate(-50%, -50%) rotate(${sticker.rotation}deg) scale(${sticker.scale})`
                            }}
                        >
                            {sticker.type === 'text' ? (
                                <span>{sticker.content}</span>
                            ) : (
                                <img src={sticker.content} alt="sticker" className="sticker-img" />
                            )}
                        </div>
                    ))}

                    {stickers.length === 0 && (
                        <div className="empty-state">
                            <span>HACK THE PLANET</span>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
        .graffiti-section {
          padding: 4rem 2rem;
          background: #111;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .instruction {
            color: var(--color-silver);
            margin-bottom: 1rem;
            font-size: 0.9rem;
        }

        .wall-interface {
          display: flex;
          gap: 2rem;
          width: 100%;
          max-width: 1000px;
        }

        .toolbox {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          background: #222;
          padding: 1rem;
          border-radius: 8px;
          border: 1px solid #333;
        }

        .tool-btn {
          font-size: 1.5rem;
          background: transparent;
          border: 1px solid transparent;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 4px;
          color: white;
          font-family: var(--font-display);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
        }

        .tool-icon {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .tool-btn.selected {
          border-color: var(--color-neon-green);
          background: rgba(57, 255, 20, 0.1);
        }

        .clear-btn {
            margin-top: auto;
            color: #ff3333;
            border: 1px solid #ff3333;
            background: transparent;
            padding: 0.5rem;
            cursor: pointer;
            font-size: 0.8rem;
        }

        .wall-area {
          flex: 1;
          height: 500px;
          background-color: #1a1a1a;
          position: relative;
          overflow: hidden;
          border: 4px solid #333;
          cursor: crosshair;
        }

        .brick-texture {
            position: absolute;
            inset: 0;
            opacity: 0.1;
            background-image: 
                linear-gradient(335deg, rgba(255,255,255,0.1) 23px, transparent 23px),
                linear-gradient(155deg, rgba(255,255,255,0.1) 23px, transparent 23px),
                linear-gradient(335deg, rgba(255,255,255,0.1) 23px, transparent 23px),
                linear-gradient(155deg, rgba(255,255,255,0.1) 23px, transparent 23px);
            background-size: 58px 58px;
            background-position: 0px 2px, 4px 35px, 29px 31px, 34px 6px;
        }

        .sticker {
          position: absolute;
          font-size: 2.5rem;
          font-weight: bold;
          font-family: 'Syne', sans-serif;
          color: var(--color-white);
          text-shadow: 2px 2px 0px #000;
          pointer-events: none;
          user-select: none;
          filter: drop-shadow(0 0 5px rgba(0,0,0,0.5));
        }

        .sticker-img {
          width: 120px;
          height: auto;
          display: block;
        }
        
        .empty-state {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Syne', sans-serif;
          font-size: 4rem;
          color: rgba(255, 255, 255, 0.05);
          font-weight: 800;
          pointer-events: none;
          text-align: center;
          width: 100%;
        }

        @media (max-width: 768px) {
            .graffiti-section { padding: 2rem 1rem; }
            .wall-interface { 
                flex-direction: column-reverse; /* Put toolbox BELOW wall for better UX, or keep column */
                flex-direction: column;
                height: auto;
            }
            .toolbox { 
                flex-direction: row; 
                flex-wrap: wrap; 
                justify-content: center;
                width: 100%;
                flex: none;
            }
            .wall-area { 
                flex: none;
                width: 100%;
                height: 350px; 
            }
        }
      `}</style>
        </section>
    );
};

export default GraffitiWall;
