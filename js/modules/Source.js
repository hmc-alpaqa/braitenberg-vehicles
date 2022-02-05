class Source {
    constructor(x, y, intensity = 100) {
        this.r = new Vector(x, y); // position
        this.x = x;
        this.y = y;
        this.intensity = intensity;
    }

    getIntensity(x, y) {
        let dist = (new Vector(this.r.x - x, this.r.y - y)).getMagnitude();
        return this.intensity / Math.pow(dist, 2);
    }

    setX(x) {
        this.x = x;
        this.r.x = x;
    }

    setY(y) {
        this.y = y;
        this.r.y = y;
    }
}