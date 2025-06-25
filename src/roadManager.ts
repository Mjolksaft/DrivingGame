import { SplineCurve } from "three/src/extras/curves/Curves.js";
import { Vector2 } from "three";
import { Road } from "./road"
import { rotateAround } from "./util";
import { pointShadow } from "three/tsl";

export class RoadManager {
    // handles the road logic 
    public roads: Road[] = [];

    private start: Vector2;
    public end: Vector2;
    private nextAngle: number = 0;

    constructor(start: Vector2) {
        this.start = start;

        this.end = new Vector2(800, 150);
        this.nextAngle += Math.PI / 2

        this.roads[0] = new Road(
            new SplineCurve([
                new Vector2(this.start.x, this.start.y),
                new Vector2(400, 200),
                new Vector2(this.end.x, this.end.y)
            ])
        )

        this.generateRoad();
    }

    public generateRoad(): void {
        let points: Vector2[];
        let angle = 0;
        let newEnd: Vector2;
        let randomNum = Math.floor(Math.random() * 3);

        if (randomNum == 2) {
            points = [
                new Vector2(this.end.x, this.end.y),
                new Vector2(this.end.x, this.end.y- 400), 
                new Vector2(this.end.x + 400, this.end.y - 450) 
            ]
            angle = Math.PI/2;
        } 
        else if (randomNum == 1) {
            points = [ 
                new Vector2(this.end.x, this.end.y),
                new Vector2(this.end.x, this.end.y - 400),
                new Vector2(this.end.x - 400, this.end.y - 450)
            ]
            angle = -Math.PI/2;
            
        } 
        else if (randomNum == 0) {
            points = [
                new Vector2(this.end.x, this.end.y),
                new Vector2(this.end.x, this.end.y - 800)
            ]
            angle = 0;
        }
        
        this.setRoad(angle, points!)
        this.start = this.end;
    
    }


    setRoad(angle: number, points: Vector2[]): void {
        let curve = null;

        // rotate points 90*
        for (let i = 1; i < points.length; i++) {
            const point = points[i];
            points[i] = rotateAround(point, points[0], this.nextAngle)
        }

        curve = new SplineCurve(points);
        this.nextAngle += angle
        this.end = points[points.length-1];

        this.roads[this.roads.length] = new Road(curve!);


    }
    public draw(ctx: CanvasRenderingContext2D): void {
        for (let i = 0; i < this.roads.length; i++) {
            const element = this.roads[i];
            element.draw(ctx);
        }
    }
}