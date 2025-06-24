import { Vector2 } from "three";

export class Car {
    public position: Vector2;
    public velocity: Vector2 = new Vector2(0, 0);
    public acceleration: number = 0;
    public angle: number = 0.5;
    public direction: Vector2 = new Vector2(1, 0);

    public readonly maxSpeed: number = 2;
    public readonly turnSpeed: number = 0.01;
    private readonly friction: number = 0.99;

    constructor(position: Vector2) {
        this.position = position;
    }

    public update(): void {
        this.direction.set(Math.cos(this.angle), Math.sin(this.angle));

        // Movement logic
        this.position.add(this.velocity);
        this.velocity.add(this.direction.clone().multiplyScalar(this.acceleration));
        this.velocity.clampLength(0, this.maxSpeed);
        this.velocity.multiplyScalar(this.friction);

        this.acceleration = 0; // Reset after applying
    }


    public getPosition(): Vector2 {
        return this.position.clone();
    }

    public setPosition(position: Vector2): void {
        this.position.copy(position);
    }


    public draw(ctx: CanvasRenderingContext2D): void {
        if (!ctx) throw new Error('Canvas context is not available.');

        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.angle);

        // Chassis
        ctx.fillStyle = 'blue';
        ctx.fillRect(-75, -50, 150, 100);

        // Cabin
        ctx.fillStyle = 'darkblue';
        ctx.fillRect(-25, -45, 90, 90);

        // Headlights
        ctx.fillStyle = 'yellow';
        ctx.fillRect(-75, -50, 10, 10);
        ctx.fillRect(-75, 40, 10, 10);

        // Taillights
        ctx.fillStyle = 'red';
        ctx.fillRect(65, -50, 10, 10);
        ctx.fillRect(65, 40, 10, 10);
        ctx.fillRect(0, 0, 5, 5);

        // Wheels
        ctx.fillStyle = 'black';
        ctx.fillRect(-65, -55, 30, 5);
        ctx.fillRect(-65, 105 - 55, 30, 5);
        ctx.fillRect(35, -55, 30, 5);
        ctx.fillRect(35, 105 - 55, 30, 5);
        
        ctx.restore();
    }
}
