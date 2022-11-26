export default class PhysicsObject {
    constructor(static, r, m, x, y, vx, vy, ax, ay) {
        this.static = static;
        this.r = r;
        this.m = m || 1;

        this.x = x || 0;
        this.y = y || 0;
        this.vx = vx || 0;
        this.vy = vy || 0;
        this.ax = ax || 0;
        this.ay = ay || 0;

        this.fx = 0;
        this.fy = 0;
    }

    move(dt) {
        if (this.static) return;

        this.vx += this.ax * dt;
        this.vy += this.ay * dt;

        this.x += this.vx * dt;
        this.y += this.vy * dt;
    }
}