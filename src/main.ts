import { Car } from './car';
import './style.css'
import * as THREE from 'three';

const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
if (!ctx) {
    throw new Error('Failed to get canvas context');
}

let debug = true; // Enable debug mode
const car = new Car(new THREE.Vector2(400, 300));

const keys: Record<string, boolean> = {
  w: false,
  a: false,
  s: false,
  d: false
};

window.addEventListener('keydown', (event) => {
   if (event.key.toLowerCase() === 'w') {
       keys['w'] = true;
   }
   if (event.key.toLowerCase() === 's') {
       keys['s'] = true;
   }
   if (event.key.toLowerCase() === 'a') {
       keys['a'] = true;
   }
   if (event.key.toLowerCase() === 'd') {
       keys['d']   = true;
   }
});

window.addEventListener('keyup', (event) => {
   if (event.key.toLowerCase() === 'w') {
       keys['w'] = false;
   }
   if (event.key.toLowerCase() === 's') {
       keys['s'] = false;
   }
   if (event.key.toLowerCase() === 'a') {
       keys['a'] = false;
   }
   if (event.key.toLowerCase() === 'd') {
       keys['d']   = false;
   }
});

function handleInput(): void {
    keys['w'] && (car.acceleration = -0.2);
    keys['s'] && (car.acceleration = 0.2);
    keys['a'] && (car.angle -= car.turnSpeed * (car.velocity.length() / car.maxSpeed)); // Rotate left
    keys['d'] && (car.angle += car.turnSpeed * (car.velocity.length() / car.maxSpeed)); // Rotate right
}

function draw(): void {
    // console.log("current key pressed: ", keys);
    if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        handleInput();
        car.update();
        car.draw(ctx);
    }
    requestAnimationFrame(draw);
}

draw();