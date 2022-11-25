import Game from "../game";

import Ground from "./ground";
import PanControls from "../Controls/panControls";

export default class Environment {
    constructor() {
        this.parent = new Game();

        this.ground = new Ground();
        this.controls = new PanControls(this.ground);
    }

    draw() {
        this.controls.update();
        this.ground.update();
        
        this.ground.draw(this.ground.points);
    }

    resize() {
        this.ground.resize();
        this.ground.draw(this.ground.points);
    }
}