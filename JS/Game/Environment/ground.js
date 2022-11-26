import Game from "../game";

import drawPoint from "../Utils/drawPoint";
import getBezierPoint from "../Utils/bezierPoint";

export default class Ground {
    constructor() {
        this.parent = new Game();

        this.c = this.parent.c;
        this.elm = this.parent.elm;
        this.config = this.parent.config.ground;

        this.x = 0;
        this.drawnPoints = [];

        this.setVariableConstants();
    }

    setVariableConstants() {
        this.config.numPoints = Math.ceil(window.innerWidth * this.config.numCurves);
        this.config.curveWidth = window.innerWidth / this.config.numPoints;
        this.config.width = this.elm.width;
    }

    draw(p) {
        const c = this.c;

        const points = p || this.generatePoints(this.config.numPoints);
        const drawnPoints = [];

        c.beginPath();
        c.moveTo(points[0].x, points[0].y);

        for (var i = 1; i < points.length - 2; i++) {
            let ex = (points[i].x + points[i + 1].x) / 2;
            let ey = (points[i].y + points[i + 1].y) / 2;

            drawnPoints.push({
                cx: points[i].x,
                cy: points[i].y,
                ex: ex,
                ey: ey
            })
        }

        drawnPoints.push({
            cx: points[i].x,
            cy: points[i].y,
            ex: points[i + 1].x,
            ey: points[i + 1].y
        })

        drawnPoints.forEach(p => c.quadraticCurveTo(p.cx, p.cy, p.ex, p.ey));

        c.stroke();

        // drawnPoints.forEach(p => {
        //     drawPoint(c, p.cx, p.cy, "green")
        //     drawPoint(c, p.ex, p.ey, "blue")
        // })

        if (this.drawnPoints.length !== drawnPoints.length) this.parent.emit("drawnPoints", drawnPoints);
        this.drawnPoints = drawnPoints;
    }

    generatePoints(num, start, reverse) {
        const max = (1 - this.config.maxY) * this.elm.height;
        const min = (1 - this.config.minY) * this.elm.height;
        const increment = this.elm.width / this.config.numPoints;

        var points = start || [];

        for (let i = 0; i < num + 1; i++) {
            const pos = points.filter(p => p.x >= 0).length;
            const neg = points.filter(p => p.x < 0).length;

            const x = !reverse ? pos * increment : (neg + 1) * -increment;
            const y = Math.floor(Math.random() * (max - min)) + min;
        
            if (!reverse) points.push({x: x, y: y});
            else points.unshift({x: x, y: y});
        }

        this.points = points;
        return points;
    }

    update() {
        if (!this.points) return;

        const transform = this.c.getTransform().e;

        if (-transform + this.elm.width > this.points[this.points.length - 1].x) this.generatePoints(1, this.points);
        else if (-transform < this.points[0].x) this.generatePoints(1, this.points, true);
    }

    resize() {
        this.setVariableConstants();
    }
}