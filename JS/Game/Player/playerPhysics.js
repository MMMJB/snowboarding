import Game from "../game";

export default class PlayerPhysics {
    constructor(obj) {
        this.parent = new Game();

        this.obj = obj;
        this.ground = this.parent.environment.ground;
        this.config = this.parent.config.physics;
    }

    exertForce() {
        if (this.y >= this.obj.calculateY(this.x) - this.config.size) {
            this.obj.vy += this.config.gravConstant / this.parent.time.dt;
            return;
        }

        const y1 = this.obj.calculateY(this.obj.x - 0.05);
        const y2 = this.obj.calculateY(this.obj.x + 0.05);

        const angle = Math.atan2(y2 - y1, 0.1);

        const fy = this.config.gravConstant * Math.pow(Math.sin(angle), 2);
        const fx = this.config.gravConstant * Math.sin(angle) * Math.cos(angle);

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

        const ap = -Math.PI / 2 - (angle - Math.PI / 2);

        const lx = Math.sin(ap) * 10;
        const ly = Math.cos(ap) * 10;

        this.parent.helpers.drawPoint(bx + lx, by + ly, "blue");
        if (this.obj.y + 10 > this.obj.calculateY(bx + lx)) {
            this.obj.y = this.obj.calculateY(bx + lx) - 10;
            this.obj.vy = this.config.gravConstant;
        }
    }
}