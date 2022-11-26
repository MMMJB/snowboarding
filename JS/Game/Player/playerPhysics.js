import Game from "../game";

export default class PlayerPhysics {
    constructor(obj) {
        this.parent = new Game();

        this.obj = obj;
        this.ground = this.parent.environment.ground;
        this.config = this.parent.config.physics;
    }

    calcGroundForce() {
        const y1 = this.obj.calculateY(this.obj.x - 0.05);
        const y2 = this.obj.calculateY(this.obj.x + 0.05);

        const angle = Math.atan2(y2 - y1, 0.1);

        const fy = this.config.gravConstant * Math.pow(Math.sin(angle), 2);
        const fx = Math.sin(angle) * Math.cos(angle);

        this.obj.vx += fx / this.parent.time.dt - this.config.friction * this.obj.vx;
        this.obj.vy += fy / this.parent.time.dt - this.config.friction * this.obj.vy;

        // this.parent.helpers.lines[0] = {
        //     x1: this.obj.x,
        //     y1: this.obj.calculateY(this.obj.x) - 10,
        //     x2: this.obj.x + fx * 25,
        //     y2: this.obj.calculateY(this.obj.x) - 10 + fy * 25,
        //     col: "red"
        // };
    }
}