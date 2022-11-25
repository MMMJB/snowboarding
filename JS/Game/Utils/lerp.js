export default function lerp(start, end, amt) {
    return start * (1 - amt) + end * amt;
}