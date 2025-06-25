import { Vector2 } from "three";

export class Car {
    public position: Vector2;
    public angle: number = 0.;
    public velocity: number = 0;
    public delta: number = Math.PI / 12;
    public wheelBase: number = 150;
    public acceleration: number = 0.;

    public readonly maxSpeed: number = 3;
    public readonly turnSpeed: number = 0.01;
    private readonly friction: number = 0.98;
    public readonly maxSteeringAngle: number = Math.PI / 5;

    constructor(position: Vector2) {
        this.position = position;
    }

    public update(): void {
        this.velocity += this.acceleration;

        this.velocity = Math.max(-this.maxSpeed, Math.min(this.velocity, this.maxSpeed));

        this.velocity *= this.friction;

        const angularVelocity = (this.velocity / this.wheelBase) * Math.tan(this.delta);
        this.angle += angularVelocity;

        this.angle = (this.angle + Math.PI) % (2 * Math.PI) - Math.PI;

        const dx = this.velocity * Math.cos(this.angle);
        const dy = this.velocity * Math.sin(this.angle);
        this.position.add(new Vector2(dx, dy));

        this.acceleration = 0;
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
