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

    generatePoints(num, start) {
        const max = (1 - this.config.maxY) * this.elm.height;
        const min = (1 - this.config.minY) * this.elm.height;
        const increment = this.elm.width / num;

        var points = start || [];

        for (let i = points.length; i < num + 2; i++) {
            const x = i * increment;
            const y = Math.floor(Math.random() * (max - min)) + min;
        
            points.push({x: x, y: y});
        }

        this.points = points;
        return points;
    }
}