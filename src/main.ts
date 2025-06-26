import { GameManager } from './gameManager';
import './style.css'

const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
if (!ctx) {
    throw new Error('Failed to get canvas context');
}

const gameManager = new GameManager(ctx)

// === FPS Tracking ===
let lastTime = performance.now();
let frames = 0;
let fps = 0;
let lastFpsUpdate = lastTime;
const fpsUpdateInterval = 500; // ms

function drawFPS(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.font = '16px monospace';
    ctx.fillText(`FPS: ${fps}`, 10, 20);
    ctx.restore();
}

function draw(now = performance.now()): void {
    if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        gameManager.update();

        // === FPS Tracking ===
        drawFPS(ctx);
        frames++;
        if (now - lastFpsUpdate >= fpsUpdateInterval) {
            fps = Math.round((frames * 1000) / (now - lastFpsUpdate));
            frames = 0;
            lastFpsUpdate = now;
        }
    }

    requestAnimationFrame(draw);
}

draw();
