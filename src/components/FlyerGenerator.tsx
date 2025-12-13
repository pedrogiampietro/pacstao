import React, { useRef, useState } from 'react';

const FlyerGenerator: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageLoaded, setImageLoaded] = useState(false);

    // Constants
    // const EVENT_DATE = '15 DEZ - 19H'; (Used in template now)

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const userImg = new Image();
            userImg.onload = () => {
                // Load template
                const templateImg = new Image();
                templateImg.src = '/assets/flyer-clone-unified.png';
                templateImg.onload = () => {
                    drawImageOnCanvas(userImg, templateImg);
                    setImageLoaded(true);
                }
            };
            if (event.target?.result) {
                userImg.src = event.target.result as string;
            }
        };
        reader.readAsDataURL(file);
    };

    const drawCover = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, width: number, height: number) => {
        // Calculate scale to cover the entire area
        const scale = Math.max(width / img.width, height / img.height);
        const x = (width / 2) - (img.width / 2) * scale;
        const y = (height / 2) - (img.height / 2) * scale;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    const drawImageOnCanvas = (userImg: HTMLImageElement, templateImg: HTMLImageElement) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clone/Reference is likely 1:1 or specific ratio. The generated image is 1024x1024 usually unless specified.
        // Prompt said "Instagram Story format (1080x1920)".
        // Let's stick to 1080x1920.
        const WIDTH = 1080;
        const HEIGHT = 1920;
        canvas.width = WIDTH;
        canvas.height = HEIGHT;

        // Create temp canvas for template
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = WIDTH;
        tempCanvas.height = HEIGHT;
        const tempCtx = tempCanvas.getContext('2d');
        if (!tempCtx) return;

        // Draw Template using Cover to remove any potential white bars from generation
        drawCover(tempCtx, templateImg, WIDTH, HEIGHT);

        const imageData = tempCtx.getImageData(0, 0, WIDTH, HEIGHT);
        const data = imageData.data;

        // Chroma Key (Magenta)
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            const dist = Math.sqrt(
                Math.pow(r - 255, 2) +
                Math.pow(g - 0, 2) +
                Math.pow(b - 255, 2)
            );

            if (dist < 180) {
                data[i + 3] = 0;
            } else if (dist < 230) {
                const alpha = (dist - 180) / 50 * 255;
                data[i + 3] = Math.min(data[i + 3], alpha);
            }
        }
        tempCtx.putImageData(imageData, 0, 0);

        // 1. Fill Background (Black)
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        // 2. Draw User Image (Cover)
        drawCover(ctx, userImg, WIDTH, HEIGHT);

        // 3. Draw Template
        ctx.drawImage(tempCanvas, 0, 0);

        // 4. Add "EU VOU" Text
        ctx.save();
        ctx.translate(WIDTH / 2, 1400); // Position roughly above the bottom text/logos
        ctx.font = '800 120px "Syne"'; // Cool heavy font
        ctx.fillStyle = 'white';
        // Add heavy text stroke for "sticker" effect or just shadow
        ctx.shadowColor = '#39ff14'; // Neon Green Shadow
        ctx.shadowBlur = 40;
        ctx.textAlign = 'center';
        ctx.fillText("EU VOU", 0, 0);

        // Stroke to make it pop
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 15;
        ctx.strokeText("EU VOU", 0, 0);
        ctx.fillText("EU VOU", 0, 0); // Redraw fill on top of stroke
        ctx.restore();
    };

    const downloadFlyer = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const link = document.createElement('a');
        link.download = 'pacstao-flyer.png';
        link.href = canvas.toDataURL();
        link.click();
    };

    return (
        <section className="flyer-section">
            <h3 className="section-title">Confirme sua Presença</h3>
            <p style={{ color: 'var(--color-silver)', marginBottom: '2rem' }}>Crie seu flyer personalizado e compartilhe!</p>

            <div className="generator-container">
                <div className="canvas-wrapper">
                    {!imageLoaded && (
                        <div className="placeholder" onClick={() => fileInputRef.current?.click()}>
                            <span>+ Carregar Foto</span>
                        </div>
                    )}
                    <canvas ref={canvasRef} className={imageLoaded ? 'active' : ''} style={{ maxWidth: '100%', height: 'auto', display: imageLoaded ? 'block' : 'none' }}></canvas>
                </div>

                <div className="controls">
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                    />
                    <button className="action-btn upload" onClick={() => fileInputRef.current?.click()}>
                        {imageLoaded ? 'Trocar Foto' : 'Escolher Foto'}
                    </button>

                    {imageLoaded && (
                        <button className="action-btn download" onClick={downloadFlyer}>
                            Baixar Flyer
                        </button>
                    )}
                </div>
            </div>

            <style>{`
        .flyer-section {
          padding: 4rem 2rem;
          background: #111;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .generator-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2rem;
        }

        .canvas-wrapper {
            width: 300px;
            height: 533px; /* 9:16 ratio based on width 300 */
            background: #222;
            border: 2px dashed #444;
            border-radius: 12px;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
        }

        .placeholder {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: var(--color-silver);
            font-weight: bold;
            transition: all 0.3s;
        }

        .placeholder:hover {
            background: rgba(255, 255, 255, 0.05);
            color: var(--color-neon-green);
        }

        .action-btn {
            padding: 1rem 2rem;
            border: none;
            border-radius: 50px;
            font-weight: bold;
            font-family: var(--font-body);
            cursor: pointer;
            transition: transform 0.2s;
            margin: 0 0.5rem;
        }

        .upload {
            background: #333;
            color: white;
            border: 1px solid #555;
        }

        .download {
            background: var(--color-neon-green);
            color: black;
            box-shadow: 0 0 15px rgba(57, 255, 20, 0.4);
        }

        .action-btn:hover {
            transform: scale(1.05);
        }
      `}</style>
        </section>
    );
};

export default FlyerGenerator;
