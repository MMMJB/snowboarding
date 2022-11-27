import Game from "../game";

import PlayerControls from "../Controls/playerControls";
import PlayerPhysics from "./playerPhysics";

import getBezierPoint from "../Utils/bezierPoint";

export default class Player {
    constructor() {
        this.parent = new Game();

        this.c = this.parent.c;
        this.config = this.parent.config.player;
        this.ground = this.parent.environment.ground;

        this.mass = this.config.mass;

        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;

        this.parent.on("drawnPoints", p => {
            this.drawnPoints = p;

            if (!this.controls) {
                this.controls = new PlayerControls();
                this.moveTo(this.parent.elm.width / 2);

                this.physics = new PlayerPhysics(this);
            }
        });
    }

    calculateY(x) {
        const closest = this.drawnPoints.sort((a, b) => Math.abs(a.ex - x) - Math.abs(b.ex - x))
        const between = closest.slice(0, 2).sort((a, b) => a.ex - b.ex);

        const start = {x: between[0].ex, y: between[0].ey};
        const control = {x: between[1].cx, y: between[1].cy};
        const end = {x: between[1].ex, y: between[1].ey};
        const progress = (x - start.x) / (end.x - start.x);

        return getBezierPoint(start, control, end, progress).y;
    }

    moveTo(x) {
        this.x = x;
        this.y = this.calculateY(this.x) - this.config.size;
    }

    update() {
        this.physics.exertForce();

        this.x += this.vx;
        this.y += this.vy;

        if (this.y > this.calculateY(this.x) - this.config.size) {
            this.y = this.calculateY(this.x) - this.config.size;
            this.vy = this.parent.config.physics.gravConstant;
        }

        this.parent.environment.controls.scrollTo(-(this.x - window.innerWidth / 2) / 5.75);
    }

    draw() {
        this.update();
        
        this.c.beginPath();
        
        this.c.arc(this.x, this.y, this.config.size, 0, 2 * Math.PI);
        this.c.fillStyle = this.config.color;

        this.c.fill();
    }
}