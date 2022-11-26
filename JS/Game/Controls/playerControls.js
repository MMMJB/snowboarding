import Game from "../game";

export default class PlayerControls {
    constructor() {
        this.parent = new Game();

        this.player = this.parent.player;
        this.environment = this.parent.environment;
        this.config = this.parent.config.player;

        window.onkeydown = e => {
            switch (e.key) {
                case "ArrowRight":
                    this.player.vx += this.config.moveAmount;
                    this.parent.c.translate(-this.config.moveAmount, 0);

                    break;
                case "ArrowLeft":
                    this.player.vx -= this.config.moveAmount;
                    this.parent.c.translate(this.config.moveAmount, 0);

                    break;
            }
        }
    }
}