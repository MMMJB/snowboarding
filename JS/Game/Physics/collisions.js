export { checkCollision, bounce };

function checkCollision(o1, o2) {
    const dx = o2.x - o1.x;
    const dy = o2.y - o1.y;
    const d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    
    if (d < o1.r + o2.r) {
        return {
            collisionInfo: new Collision(o1, o2, dx, dy, d),
            collided: true
        }
    }

    return {
        collisionInfo: null,
        collided: false
    }
}

function bounce(info) {
    const nx = info.dx / info.d;
    const ny = info.dy / info.d;
    const s = info.o1.r + info.o2.r;

    info.o1.x -= nx * (s / 2);
    info.o1.y -= ny * (s / 2);

    info.o2.x += nx * (s / 2);
    info.o2.y += ny * (s / 2);

    const k = -2 * ((info.o2.vx - info.o1.vx) * nx + (info.o2.vy - info.o1.vy) * ny) / (1 / info.o1.m + 1 / info.o2.m);

    info.o1.vx -= k * nx / info.o1.m;
    info.o1.vy -= k * ny / info.o1.m;

    info.o2.vx -= k * nx / info.o2.m;
    info.o2.vy -= k * ny / info.o2.m;
}

class Collision {
    constructor(o1, o2, dx, dy, d) {
        this.o1 = o1;
        this.o2 = o2;

        this.dx = dx;
        this.dy = dy;
        this.d = d;
    }
}