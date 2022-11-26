export default function drawPoint(c, x, y, col) {
    c.beginPath();
    
    c.arc(x, y, 3, 0, 2 * Math.PI);
    c.fillStyle = col;
    c.fill();
}