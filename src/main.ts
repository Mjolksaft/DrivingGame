import { Car } from './car';
import { PlayerController } from './playerController';
import { Road } from './road';
import './style.css'
import * as THREE from 'three';

const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
if (!ctx) {
    throw new Error('Failed to get canvas context');
}

let debug = true; // Enable debug mode
const car = new Car(new THREE.Vector2(400, 300));
const playerController = new PlayerController(car);
const road = new Road(0, 0, 300, 600);

const mouse = new THREE.Vector2(0,0);

let camera = new THREE.Vector2(0,0);

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function draw(): void {
    // console.log("current key pressed: ", keys);
    if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        

        // movement logic
        car.update();
        
        camera.x = car.position.x - canvas.width / 2; // refactor to use camera class
        camera.y = car.position.y - canvas.height / 2;

        playerController.update();
        // playerController.edgeCheck();
        if (!playerController.checkRoad(road)) {
            console.log("Car is off the road");
        }
        
        // draw logic
        ctx.save();
        ctx.translate(-camera.x, -camera.y); // Move the canvas to the camera position
        road.draw(ctx);
        car.draw(ctx);
        ctx.restore();

        // for the mouse position
        // ctx.beginPath();
        // ctx.fillRect(mouse.x, mouse.y, 2, 2);
        // ctx.fillStyle = 'red';
        // ctx.fill();

    }
    requestAnimationFrame(draw);
}

draw();