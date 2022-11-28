import Game from "../game";

import solveQuadratic from "../Utils/solveQuad";

export default class PlayerPhysics {
    constructor(obj) {
        this.parent = new Game();

        this.obj = obj;
        this.ground = this.parent.environment.ground;
        this.config = this.parent.config.physics;
    }

    exertForce() {
        const y1 = this.obj.calculateY(this.obj.x - 0.05);
        const y2 = this.obj.calculateY(this.obj.x + 0.05);

        const angle = Math.atan2(y2 - y1, 0.1);

        const fy = this.obj.mass * this.config.gravConstant * Math.pow(Math.sin(angle), 2);
        const fx = this.obj.mass * this.config.gravConstant * Math.sin(angle) * Math.cos(angle);

        this.obj.vx += fx / this.parent.time.dt - this.config.friction * this.obj.vx;
        this.obj.vy += fy / this.parent.time.dt - this.config.friction * this.obj.vy;

        this.checkForGround(fx, fy, angle);
    }

    checkForGround(fx, fy, angle) {
        const x = this.obj.x + fx * 25;
        const y = this.obj.calculateY(this.obj.x) - 10 + fy * 25;

        const bx = this.obj.x;
        const by = this.obj.calculateY(this.obj.x) - 10;

        const px = fx > 0 ? -(y - by) + bx : (y - by) + bx;
        const py = fx > 0 ? x - bx + by : -(x - bx) + by;

        this.parent.helpers.lines[0] = {
            x1: bx,
            y1: by,
            x2: x,
            y2: y,
            col: "red"
        };

        this.parent.helpers.lines[1] = {
            x1: bx,
            y1: by,
            x2: px,
            y2: py,
            col: "orange"
        }

        // const ap = -Math.PI / 2 - (angle - Math.PI / 2);

        // const lx = Math.sin(ap) * 10;
        // const ly = Math.cos(ap) * 10;

        // this.parent.helpers.drawPoint(bx + lx, by + ly, "blue");
        // this.parent.helpers.drawPoint(bx + lx, this.obj.calculateY(bx + lx), "green");

        // const round = val => Math.round(val * 1000) / 1000;

        // if (round(this.obj.y + 10) > round(this.obj.calculateY(bx + lx))) {
        //     this.obj.y = this.obj.calculateY(bx + lx) - 10;
        // }

        const between = this.obj.closestCurve(this.obj.x);

        const X0 = between[0].ex,
              X1 = between[1].cx,
              X2 = between[1].ex,
              Y0 = between[0].ey,
              Y1 = between[1].cy,
              Y2 = between[1].ey;

        const x1 = bx,
              x2 = px,
              y1 = by,
              y2 = py

        const q = y2 * (X0 - 2 * X1 + X2) - y1 * (X0 - 2 * X1 + X2),
              s = x1 * (Y0 - 2 * Y1 + Y2) - x2 * (Y0 - 2 * Y1 + Y2),
              r = y2 * (2 * X1 - 2 * X0) - y1 * (2 * X1 - 2 * X0),
              t = x1 * (2 * Y1 - 2 * Y0) - x2 * (2 * Y1 - 2 * Y0);

        const a = s + q,
              b = r + t,
              c = y2 * X0 - y1 * X0 + x1 * Y0 + x2 * Y0 + x1 * (y1 - y2) + y1 * (x2 - x1);

        const u = solveQuadratic(a, b, c);
        if (!isNaN(u[0])) console.log(u);
    }
}