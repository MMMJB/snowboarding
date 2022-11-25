import Game from "../game";

export default class Ground {
    constructor() {
        this.parent = new Game();

        this.c = this.parent.c;
        this.elm = this.parent.elm;
        this.config = this.parent.config.ground;

        this.x = 0;

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

        c.beginPath();
        c.moveTo(points[0].x, points[0].y);

        for (var i = 1; i < points.length - 2; i++) {
            let xc = (points[i].x + points[i + 1].x) / 2;
            let yc = (points[i].y + points[i + 1].y) / 2;

            c.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }

        c.quadraticCurveTo(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);

        c.stroke();
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

        if (-transform + this.elm.width > this.points[this.points.length - 1].x) {
            console.log("Generating new curve to the right.");
            this.generatePoints(1, this.points);
        } else if (-transform < this.points[0].x) {
            console.log("Generating new curve to the left.");
            this.generatePoints(1, this.points, true);
        }
    }

    resize() {
        this.setVariableConstants();
    }
}