import config from "./config";

import Time from "./Utils/time";
import Helpers from "./Utils/helpers";

import Environment from "./Environment/environment";
import Player from "./Player/player";

import EventEmitter from "events";

export default class Game extends EventEmitter {
    static instance;

    constructor(elm, ctx) {
        super();

        if (Game.instance) return Game.instance;
        Game.instance = this;

        this.elm = elm;
        this.c = ctx;

        this.init();
    }

    init() {
        this.resize();

        this.config = config;
        
        this.time = new Time();
        this.helpers = new Helpers();

        this.environment = new Environment();
        this.player = new Player();

        const simLoop = setInterval(_ => this.draw(), 1000 / this.config.general.fps);
    }

    resize() {
        const ratio = Math.max(window.devicePixelRatio || 1, 1);

        this.elm.width = this.elm.offsetWidth * ratio;
        this.elm.height = this.elm.offsetHeight * ratio;

        this.environment?.resize();
    }

    draw() {
        this.time.tick();

        this.c.save();
        this.c.setTransform(1, 0, 0, 1, 0, 0);
        this.c.clearRect(0, 0, this.elm.width, this.elm.height);
        this.c.restore();

        this.environment.draw();
        this.player.draw();
        this.helpers.draw();
    }
}