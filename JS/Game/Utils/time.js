export default class Time {
    constructor() {
        this.lastUpdate = Date.now();
        this.dt = null;
    }

    tick() {
        const now = Date.now();
        this.dt = now - this.lastUpdate;

        this.lastUpdate = now;
    }
}