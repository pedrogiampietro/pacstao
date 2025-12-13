import React, { useState, useRef } from 'react';

const AudioPlayer: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(e => console.log("Audio play failed:", e));
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="audio-player">
            <audio ref={audioRef} loop>
                <source src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=lofi-study-112778.mp3" type="audio/mp3" />
            </audio>

            <div className="player-wrapper">
                <button
                    className={`play-btn ${isPlaying ? 'playing' : ''}`}
                    onClick={togglePlay}
                    aria-label={isPlaying ? "Pause Music" : "Play Music"}
                >
                    {isPlaying ? (
                        <div className="bars-anim">
                            <span className="bar"></span>
                            <span className="bar"></span>
                            <span className="bar"></span>
                        </div>
                    ) : (
                        <span className="play-icon">▶</span>
                    )}
                </button>
                <div className="track-info">
                    <span className="track-name">PAC'STÃO RADIO</span>
                    <span className="track-status">{isPlaying ? 'AO VIVO' : 'OFFLINE'}</span>
                </div>
            </div>

            <style>{`
        .audio-player {
          position: fixed;
          bottom: 2rem;
          left: 2rem;
          z-index: 100;
          background: rgba(0, 0, 0, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.5rem 1rem;
          border-radius: 50px;
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
        }

        .player-wrapper {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .play-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--color-neon-green);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .play-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 0 15px var(--color-neon-green);
        }

        .play-icon {
          color: var(--color-black);
          font-size: 1.2rem;
          margin-left: 2px;
        }

        .bars-anim {
          display: flex;
          align-items: flex-end;
          gap: 3px;
          height: 15px;
        }

        .bar {
          width: 3px;
          background: var(--color-black);
          animation: bounce 0.5s infinite alternate;
        }

        .bar:nth-child(2) { animation-delay: 0.1s; }
        .bar:nth-child(3) { animation-delay: 0.2s; }

        @keyframes bounce {
          0% { height: 3px; }
          100% { height: 15px; }
        }

        .track-info {
          display: flex;
          flex-direction: column;
        }

        .track-name {
          font-size: 0.75rem;
          font-weight: bold;
          color: var(--color-white);
        }

        .track-status {
          font-size: 0.65rem;
          color: var(--color-neon-green);
          letter-spacing: 0.1em;
        }

        @media (max-width: 768px) {
          .audio-player {
            bottom: 1rem;
            left: 1rem;
            transform: scale(0.85);
            transform-origin: bottom left;
          }
        }
      `}</style>
        </div>
    );
};

export default AudioPlayer;
