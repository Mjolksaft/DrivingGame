import { Car } from './car';
import { PlayerController } from './playerController';
import { RoadManager } from './roadManager';
import './style.css'
import * as THREE from 'three';

const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
if (!ctx) {
    throw new Error('Failed to get canvas context');
}

const car = new Car(new THREE.Vector2(400, 300));
const playerController = new PlayerController(car);
const roadManager = new RoadManager(new THREE.Vector2(400, 600));

const mouse = new THREE.Vector2(0, 0);
let camera = new THREE.Vector2(0, 0);

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

let onRoad = false;

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
    ctx.fillText(`FPS: ${fps}`, camera.x + 10, camera.y + 20);
    ctx.restore();
}

function draw(now = performance.now()): void {
    if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // === Game Logic ===
        if (roadManager.end.distanceTo(playerController.car.position) < 100) {
            roadManager.generateRoad();
        }

        car.update();
        camera.x = car.position.x - canvas.width / 2;
        camera.y = car.position.y - canvas.height / 2;

        playerController.update();

        roadManager.roads.forEach(road => {
            if (playerController.checkRoad(road)) {
                onRoad = true;
            }
        });

        if (!onRoad) {
            console.log("off the road");
        }
        onRoad = false;

        // === Drawing ===
        ctx.save();
        ctx.translate(-camera.x, -camera.y);
        roadManager.draw(ctx);
        car.draw(ctx);
        drawFPS(ctx);

        ctx.restore();

        // === FPS Tracking ===
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
