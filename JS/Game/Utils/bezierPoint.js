export default function getBezierPoint(s, c, e, t) {
    const x = (1 - t) * (1 - t) * s.x + 2 * (1 - t) * t * c.x + t * t * e.x;
    const y = (1 - t) * (1 - t) * s.y + 2 * (1 - t) * t * c.y + t * t * e.y;

    return {x: x, y: y};
}