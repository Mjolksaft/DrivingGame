import { SplineCurve } from "three/src/extras/curves/Curves.js";

export class Road {
    width: number = 300;
    height: number = 300;
    curve: SplineCurve;

    constructor(curve: SplineCurve) {

        this.curve = curve;
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