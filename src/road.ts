import { SplineCurve } from "three/src/extras/curves/Curves.js";
import { Vector2 } from "three";

export class Road {
    x: number;
    y: number;
    width: number;
    height: number;
    curve: SplineCurve;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        // create a spline for the road
        this.curve = new SplineCurve([ // 800 600
            new Vector2(300, 650),
            new Vector2(350, 200),
            new Vector2(800, 100)

        ]);
    }
    
    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.strokeStyle = 'white';
        this.curve.getPoints(50).forEach((point, index) => { // take the position minus the camera position
            if (index === 0) {
                ctx.moveTo(point.x, point.y);
            } else {
                ctx.lineTo(point.x, point.y);
            }
        });
        ctx.lineWidth = this.width;
        ctx.stroke();
    }
}