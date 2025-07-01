// PlayerController.ts
import { Car } from './car';
import { GameSocket } from '../game/gameSocket';
import type { Road } from '../road/roadObject';
import { findClosest } from '../util/utility';

// get the current input then let the object handle what to do with it


// abstract class PlayerController {

// }

export class PlayerController {
    public car: Car;
    public pause = false;

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

    public isOnRoad(roads: Road[]): boolean {
        return roads.some(road => this.checkRoad(road));
    }

    public edgeCheck(): void {
        this.car.position.x = Math.max(75, Math.min(800 - 75, this.car.position.x));
        this.car.position.y = Math.max(75, Math.min(600 - 75, this.car.position.y));
    }

    public pauseGame(): void {
        // do the pause logic for the car 
        console.log("Pause the game !")
    }

    public update(): void {

        if (this.keys['w']) this.car.acceleration = -0.2;
        if (this.keys['s']) this.car.acceleration = 0.1;

        if (this.keys['a']) this.car.delta = this.car.maxSteeringAngle;
        if (this.keys['d']) this.car.delta = -this.car.maxSteeringAngle;

        if(!this.keys['a'] && !this.keys['d']) this.car.delta = 0

        if (Math.abs(this.car.velocity) > 0.005) {
            let socket = GameSocket.getInstance();
            socket.sendMoveMessage({x: this.car.getPosition().x, y: this.car.getPosition().y});
        }

    }
}
