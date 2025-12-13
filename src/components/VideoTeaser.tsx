import React from 'react';

const VideoTeaser: React.FC = () => {
  return (
    <section className="video-section">
      <div className="crt-monitor">
        <div className="screen-content">
          <div className="video-placeholder">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/vQc8sDXsDo8?autoplay=0&mute=0&controls=1&loop=1&playlist=vQc8sDXsDo8"
              title="Battle Teaser"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              style={{ border: 'none', filter: 'contrast(1.2) brightness(0.8)' }}
            ></iframe>
          </div>
          <div className="scanlines"></div>
          <div className="glitch-overlay"></div>
          <div className="crt-text">REC ●</div>
        </div>
      </div>

      <style>{`
        .video-section {
          padding: 4rem 2rem;
          background: black;
          display: flex;
          justify-content: center;
        }

        .crt-monitor {
          width: 100%;
          max-width: 800px;
          aspect-ratio: 16/9;
          background: #111;
          border-radius: 20px;
          padding: 10px;
          box-shadow: 
            0 0 0 5px #222,
            0 0 20px rgba(57, 255, 20, 0.1);
          position: relative;
          overflow: hidden;
        }

        .screen-content {
          width: 100%;
          height: 100%;
          background: #000;
          border-radius: 12px; /* Slight curve for screen */
          position: relative;
          overflow: hidden;
        }

        .video-placeholder {
          width: 100%;
          height: 100%;
          transform: scale(1.1); /* Zoom slightly to avoid black bars */
        }

        .scanlines {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 0) 50%,
            rgba(0, 0, 0, 0.2) 50%,
            rgba(0, 0, 0, 0.2)
          );
          background-size: 100% 4px;
          pointer-events: none;
          z-index: 10;
        }

        .crt-text {
          position: absolute;
          top: 20px;
          right: 30px;
          color: red;
          font-family: monospace;
          font-size: 1.5rem;
          font-weight: bold;
          text-shadow: 0 0 5px red;
          animation: blink 1s infinite;
          z-index: 20;
        }

        @keyframes blink { 50% { opacity: 0; } }

        /* Subtle flicker */
        .screen-content::after {
          content: " ";
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background: rgba(18, 16, 16, 0.1);
          opacity: 0;
          z-index: 2;
          pointer-events: none;
          animation: flicker 0.15s infinite;
        }

        @keyframes flicker {
          0% { opacity: 0.02795156614152462; }
          5% { opacity: 0.04853913076131494; }
          /* ... simplified for brevity */
          100% { opacity: 0.02795156614152462; }
        }
      `}</style>
    </section>
  );
};

export default VideoTeaser;
