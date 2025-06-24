// PlayerController.ts
import { Car } from './car';
import type { Road } from './road';
import { findClosest } from './util';

// get the current input then let the object handle what to do with it

export class PlayerController {
    private car: Car;
    
    private keys: Record<string, boolean> = {
        w: false,
        a: false,
        s: false,
        d: false,
    };


    constructor(car: Car) {
        window.addEventListener('keydown', (e) => this.setKey(e.key, true));
        window.addEventListener('keyup', (e) => this.setKey(e.key, false));
    
        this.car = car;
    }

    private setKey(key: string, isDown: boolean) {
        if (this.keys.hasOwnProperty(key)) {
            this.keys[key] = isDown;
        }
    }

    public checkRoad(road: Road): boolean {
        let t = findClosest(road.curve, this.car.getPosition());
        let closestPoint = road.curve.getPoint(t);
        let dist = closestPoint.distanceTo(this.car.getPosition());
        return dist < road.width / 2;
    }

    public edgeCheck(): void {
        this.car.position.x = Math.max(75, Math.min(800 - 75, this.car.position.x));
        this.car.position.y = Math.max(75, Math.min(600 - 75, this.car.position.y));
    }

    public update(): void {

        if (this.keys['w']) this.car.acceleration = -0.2;
        if (this.keys['s']) this.car.acceleration = 0.1;

        const speedFactor = this.car.velocity.length() / this.car.maxSpeed;

        if (this.keys['a']) this.car.angle -= this.car.turnSpeed * speedFactor;
        if (this.keys['d']) this.car.angle += this.car.turnSpeed * speedFactor;
    }
}
