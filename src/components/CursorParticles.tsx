import React, { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;
    life: number;
}

const CursorParticles: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<Particle[]>([]);
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;

            // Create particles on move
            for (let i = 0; i < 3; i++) {
                particles.current.push({
                    x: mouse.current.x,
                    y: mouse.current.y,
                    size: Math.random() * 3 + 1,
                    speedX: Math.random() * 2 - 1,
                    speedY: Math.random() * 2 - 1,
                    color: `hsl(${100 + Math.random() * 60}, 100%, 50%)`, // Neon Green range
                    life: 1
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.current.forEach((p, index) => {
                p.x += p.speedX;
                p.y += p.speedY;
                p.size *= 0.95;
                p.life -= 0.02;

                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.life;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                if (p.life <= 0) {
                    particles.current.splice(index, 1);
                }
            });

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                pointerEvents: 'none',
                zIndex: 9999
            }}
        />
    );
};

export default CursorParticles;
