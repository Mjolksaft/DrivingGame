import { Vector2 } from "three";

export class Car {
    public position: Vector2;
    public acceleration: number;
    public velocity: Vector2;
    private friction = 0.99;
    public angle: number = 0.5;
    public direction: Vector2 = new Vector2(1, 0); // Default direction facing right
    public maxSpeed: number = 2; // Maximum speed of the car
    public turnSpeed: number = 0.01; // Speed at which the car turns

    constructor(position: Vector2) {
        this.position = position;
        this.acceleration = 0;
        this.velocity = new Vector2(0, 0);
    }

    private edgeCheck(): void {
        // Check if the car is out of bounds and reset position if necessary
        if (this.position.x < 0) {
            this.position.x = 0;
        }
        if (this.position.x > 800 - 150) {
            this.position.x = 800 - 150;
        }
        if (this.position.y < 0) {
            this.position.y = 0;
        }
        if (this.position.y > 600 - 100) {
            this.position.y = 600 - 100;
        }

    }

    public getPosition(): Vector2 {
        return this.position;
    }  

    public setPosition(position: Vector2): void {
        this.position = position;
    }

    public update(): void {
        // update the logic for the car
        this.direction = new Vector2(Math.cos(this.angle), Math.sin(this.angle));
        this.position.add(this.velocity);
        this.velocity.add(this.direction.clone().multiplyScalar(this.acceleration));
        this.velocity.clampLength(0, this.maxSpeed); // Limit the speed to a maximum of 5 units
        this.velocity.multiplyScalar(this.friction); // Apply friction to the acceleration
        this.acceleration = 0;

        this.edgeCheck();
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        if (!ctx) {
            throw new Error('Failed to get canvas context');
        }
        ctx.save();

        // Move origin to the car's position
        ctx.translate(this.position.x, this.position.y);

        ctx.rotate(this.angle);
        // Rotate around the origin (which is now car's position)
        
        // Draw the car centered at (0,0)
        
        //The chassi of the car
        ctx.fillStyle = 'blue';
        ctx.fillRect(-150 / 2, -100 / 2, 150, 100); // width: 150, height: 100
        
        ctx.fillStyle = 'darkblue';
        ctx.fillRect(-150 / 2 + 50, -100 / 2 +5, 90, 90); // width: 150, height: 100

        // the lights of the car
        ctx.fillStyle = 'yellow';
        ctx.fillRect(-150 / 2, -100 / 2, 10, 10); // width: 10, height: 10
 
        ctx.fillRect(-150 / 2, -100 / 2 + 90, 10, 10); // width: 10, height: 10

        ctx.fillStyle = 'red';
        ctx.fillRect(-150 / 2 + 140, -100 / 2, 10, 10); // width: 10, height: 10
        
        ctx.fillRect(-150 / 2 + + 140, -100 / 2 + 90, 10, 10); // width: 10, height: 10
        
        // the wheels of the car
        ctx.fillStyle = 'black';
        ctx.fillRect(-150 / 2 + 10, -100 / 2 - 5, 30, 5); // width: 10, height: 10
        ctx.fillRect(-150 / 2 + 10, -100 / 2 + 100, 30, 5); // width: 10, height: 10
        ctx.fillRect(-150 / 2 + 110, -100 / 2 - 5, 30, 5); // width: 10, height: 10
        ctx.fillRect(-150 / 2 + 110, -100 / 2 + 100, 30, 5); // width: 10, height: 10

        ctx.stroke();
        ctx.restore();
    }
}