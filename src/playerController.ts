export class PlayerController {
    private speed: number;
    private direction: number;

    constructor(initialSpeed: number = 0, initialDirection: number = 0) {
        this.speed = initialSpeed;
        this.direction = initialDirection;
    }

    accelerate(amount: number): void {
        this.speed += amount;
    }

    brake(amount: number): void {
        this.speed = Math.max(0, this.speed - amount);
    }

    turn(angle: number): void {
        this.direction += angle;
    }

    getSpeed(): number {
        return this.speed;
    }

    getDirection(): number {
        return this.direction;
    }
}