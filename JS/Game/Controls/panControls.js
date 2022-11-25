import Game from "../game";

export default class PanControls {
    constructor(ground) {
        this.parent = new Game();
        this.ground = ground;

        this.config = this.parent.config.controls;

        this.init();
    }

    init() {
        this.parent.elm.onwheel = e => {
            if (e.deltaY < 0) this.scrollRight();
            else this.scrollLeft();

            this.parent.c.clearRect(0, 0, window.innerWidth, window.innerHeight);
            this.parent.c.setTransform(1, 0, 0, 1, this.ground.x, 0);
            
            this.ground.draw(this.ground.points);
        }
    }

    scrollRight() {
        this.ground.x += this.config.scrollAmount;
    }

    scrollLeft() {
        this.ground.x -= this.config.scrollAmount;
    }
}