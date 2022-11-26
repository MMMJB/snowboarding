import Game from "../game";

import { checkCollision, bounce } from "./collisions";
import PhysicsObject from "./physicsObj";

export default class PhysicsEngine {
    constructor(objects) {
        this.parent = new Game();

        this.config = this.parent.config.physics;
        this.time = this.parent.time;

        this.o = objects || [];
    }

    add(static, r, m, x, y, vx, vy, ax, ay) {
        this.o.push(new PhysicsObject(static, r, m, x, y, vx, vy, ax, ay));
    }

    update() {
        this.moveWithGravity(this.time.dt);
    }

    moveWithGravity(dt) {
        for (let o1 of this.o) {
            o1.fx = 0;
            o1.fy = 0;
        }

        for (let [i, o1] of this.o.entries()) {
            for (let [j, o2] of this.o.entries()) {
                if (i >= j) return;

                const dx = o2.x - o1.x;
                const dy = o2.y - o1.y;

                var r = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
                if (r < 1) r = 1;

                const f = (this.config.gravConstant * o1.m * o2.m) / Math.pow(r, 2);
                const fx = f * dx / r;
                const fy = f * dy / r;

                o1.fx += fx;
                o1.fy += fy;
                o2.fx += fx;
                o2.fy += fy;

                const collided = checkCollision(o1, o2);
                if (collided.collided) bounce(collided);
            }
        }

        for (let o1 of this.o) {
            const ax = o1.fx / o1.m;
            const ay = o1.fy / o1.m;

            o1.vx += ax * dt;
            o1.vy += ay * dt;

            o1.x += o1.vx * dt;
            o1.y += o1.vy * dt;
        }
    }
}