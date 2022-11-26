import Game from "../game";

export default class Helpers {
    constructor(points, lines) {
        this.parent = new Game();

        this.c = this.parent.c;
        
        this.points = points || [];
        this.lines = lines || [];
    }

    draw() {
        this.points.forEach(p => this.drawPoint(p.x, p.y, p.col));
        this.lines.forEach(l => this.drawLine(l.x1, l.y1, l.x2, l.y2, l.col));
    }

    drawPoint(x, y, col) {
        this.c.beginPath();
    
        this.c.arc(x, y, 3, 0, 2 * Math.PI);
        
        this.c.fillStyle = col;
        this.c.fill();

        this.c.fillStyle = "black";
    }

    drawLine(x1, y1, x2, y2, col) {
        this.c.beginPath();
    
        this.c.moveTo(x1, y1);
        this.c.lineTo(x2, y2);
        
        this.c.strokeStyle = col;
        this.c.stroke();

        this.c.strokeStyle = "black";
    }
}