class Source {
    constructor(x, y, intensity = 100) {
        this.r = new Vector(x, y); // position
        this.intensity = intensity;
    }

    getIntensity() {
        return this.intensity;
    }
}