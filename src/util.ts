import { SplineCurve, Vector2 } from "three";

/**
 * Finds the closest t on a line segment to a given point.
 */

export function findClosest(curve: SplineCurve, position: Vector2): number {
    let bestT = 0;
    let minDistSq = Infinity;

    // Coarse search
    const coarseStep = 0.05;
    for (let t = 0; t <= 1; t += coarseStep) {
        const pt = curve.getPoint(t);
        const distSq = pt.distanceToSquared(position);
        if (distSq < minDistSq) {
            minDistSq = distSq;
            bestT = t;
        }
    }

    // Fine search around bestT // can remove if gettign too slow
    const fineStep = 0.001;
    const searchRadius = 0.05;
    const startT = Math.max(0, bestT - searchRadius);
    const endT = Math.min(1, bestT + searchRadius);

    for (let t = startT; t <= endT; t += fineStep) {
        const pt = curve.getPoint(t);
        const distSq = pt.distanceToSquared(position);
        if (distSq < minDistSq) {
            minDistSq = distSq;
            bestT = t;
        }
    }

    return bestT; 
}


/**
 * Rotate around another vector
 */

export function rotateAround(point: Vector2, center: Vector2, angle: number): Vector2 {
    const s = Math.sin(angle);
    const c = Math.cos(angle);

        
    // Translate point to origin
    const px = point.x - center.x;
    const py = point.y - center.y;
    
    // Rotate
    const xnew = px * c - py * s;
    const ynew = px * s + py * c;

    // Translate back
    return new Vector2(xnew + center.x, ynew + center.y);
}
