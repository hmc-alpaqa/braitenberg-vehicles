class Source {
    constructor(x, y, intensity = 100) {
        this.r = new Vector(x, y); // position
        this.intensity = intensity;
    }

    getIntensity(x, y) {
        let dist = (new Vector(x - this.r.x, y - this.r.y)).getMagnitude();
        return this.intensity / Math.pow(dist, 2);
    }
}