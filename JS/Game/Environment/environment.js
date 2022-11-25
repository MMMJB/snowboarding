import Ground from "./ground";
import PanControls from "../Controls/panControls";

export default class Environment {
    constructor() {
        this.ground = new Ground();
        this.controls = new PanControls(this.ground);

        requestAnimationFrame(this.draw.bind(this));
    }

    draw() {
        this.ground.draw(this.ground.points);
    }

    resize() {
        if (window.innerWidth > this.ground.config.width + this.ground.config.curveWidth) {
            this.ground.generatePoints(this.ground.points.length + 1, this.ground.points);
            
            this.ground.setVariableConstants();
        }

        this.ground.draw(this.ground.points);
    }
}