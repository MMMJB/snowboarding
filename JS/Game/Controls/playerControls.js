import Game from "../game";

export default class PlayerControls {
    constructor() {
        this.parent = new Game();

        this.player = this.parent.player;
        this.config = this.player.config;

        window.onkeydown = e => {
            switch (e.key) {
                case "ArrowRight":
                    this.player.moveTo(this.player.x + this.config.moveAmount);
                    break;
                case "ArrowLeft":
                    this.player.moveTo(this.player.x - this.config.moveAmount);
                    break;
            }
        }
    }
}