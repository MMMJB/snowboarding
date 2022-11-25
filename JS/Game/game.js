import config from "./config";

import Environment from "./Environment/environment";

export default class Game {
    static instance;

    constructor(elm, ctx) {
        if (Game.instance) return Game.instance;
        Game.instance = this;

        this.elm = elm;
        this.c = ctx;

        this.init();
    }

    init() {
        this.resize();

        this.config = config;
        this.environment = new Environment();

        const simLoop = setInterval(_ => this.draw(), 1000 / this.config.general.fps);
    }

    resize() {
        const ratio = Math.max(window.devicePixelRatio || 1, 1);

        this.elm.width = this.elm.offsetWidth * ratio;
        this.elm.height = this.elm.offsetHeight * ratio;

        this.environment?.resize();
    }

    draw() {
        this.c.save();
        this.c.setTransform(1, 0, 0, 1, 0, 0);
        this.c.clearRect(0, 0, this.elm.width, this.elm.height);
        this.c.restore();

        this.environment.draw();
    }
}