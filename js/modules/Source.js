class Source {
    constructor(x, y, intensity = 100) {
        this.r = new Vector(x, y); // position
        this.intensity = intensity;
    }

    getIntensity(x, y) {
        let dist = (new Vector(this.r.x - x, this.r.y - y)).getMagnitude();
        return this.intensity / Math.pow(dist, 2);
    }
}