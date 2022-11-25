import Game from "./Game/game";

const canvas = document.getElementById("display-canvas");
const c = canvas.getContext("2d");

window.onload = _ => {
    const game = new Game(canvas, c);

    window.onresize = _ => game.resize();
}