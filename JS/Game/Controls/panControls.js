import Game from "../game";

import lerp from "../Utils/lerp";

export default class PanControls {
    constructor(ground) {
        this.parent = new Game();
        this.ground = ground;

        this.config = this.parent.config.controls;
        this.dx = 0;

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
    }

    scrollLeft() {
        this.ground.x -= this.config.scrollAmount;
    }

    update() {
        this.dx = lerp(this.dx, this.ground.x, this.config.scrollInterp);
        this.dx = Math.floor(this.dx * 100) / 100;

        if (Math.abs(this.dx) > 0) this.parent.c.translate(this.ground.x - this.dx, 0);
    }
}