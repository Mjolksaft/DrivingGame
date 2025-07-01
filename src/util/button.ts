import type { Vector2 } from "three";

export class Button {
    public position: Vector2;
    public width: number;
    public height: number;
    private func: () => void; 
    constructor (func: () => void, position: Vector2, width: number, height: number) {
        this.func = func;
        this.position = position;
        this.width = width;
        this.height = height;
    }

    callFunction(): void {
        this.func();
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        ctx.stroke();
    }   
}