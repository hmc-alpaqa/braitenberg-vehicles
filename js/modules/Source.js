/**
 * Class representing a source.
 */
class Source {
    /**
     * Creates a source.
     * @param {Number} x the x-position of the source
     * @param {Number} y the y-position of the source
     * @param {Number} intensity the intensity of the source
     */
    constructor(x, y, intensity = 100) {
        this.r = new Vector(x, y); // position
        this.x = x;
        this.y = y;
        this.intensity = intensity;
    }

    /**
     * Returns the intensity of the source at at certain coordinate point.
     * @param {Number} x the x-position of the coordinate
     * @param {Number} y the y-position of the coordinate
     * @returns {Number} the intensity of the source at the coordinate
     */
    getIntensity(x, y) {
        let dist = (new Vector(this.r.x - x, this.r.y - y)).getMagnitude();
        return this.intensity / Math.pow(dist, 2);
    }

    /**
     * Moves the source to the specified x-position.
     * @param {Number} x the new x-position
     */
    setX(x) {
        this.x = x;
        this.r.x = x;
    }

    /**
     * Moves the source to the specified y-position.
     * @param {Number} y the new y-position
     */
    setY(y) {
        this.y = y;
        this.r.y = y;
    }
}