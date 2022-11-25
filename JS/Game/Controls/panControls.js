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
        }
    }

    scrollRight() {
        this.ground.x += this.config.scrollAmount;
        this.parent.c.translate(this.config.scrollAmount, 0);
    }

    scrollLeft() {
        this.ground.x -= this.config.scrollAmount;
        this.parent.c.translate(-this.config.scrollAmount, 0);
    }
}