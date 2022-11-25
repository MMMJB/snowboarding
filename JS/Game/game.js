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
    }

    resize() {
        const ratio = Math.max(window.devicePixelRatio || 1, 1);

        this.elm.width = this.elm.offsetWidth * ratio;
        this.elm.height = this.elm.offsetHeight * ratio;

        this.environment?.resize();
    }
}