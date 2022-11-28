export default function solveQuadratic(a, b, c) {
    const r1 = (-b + Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
    const r2 = (-b - Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);

    return [r1, r2];
}