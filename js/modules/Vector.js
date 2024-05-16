/**
 * Class representing a vector.
 * @prop {Number} x the x component of the vector
 * @prop {Number} y the y component of the vector
 */
class Vector {
    /**
     * Creates a vector.
     * @param {Number} x x component of the vector
     * @param {Number} y y component of the vector
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Initializes the vector based on polar coordinates.
     * @param {Number} magnitude magnitude of the vector
     * @param {Number} theta angle of the vector from the x-axis in radians
     * @returns {Vector} this vector
     */
    initFromPolar(magnitude, theta) {
        this.x = Math.cos(theta) * magnitude;
        // negate the y due to p5js coordinate system
        this.y = -Math.sin(theta) * magnitude;
        return this;
    }

    /**
     * Calculates the magnitude of this vector (the length of the vector).
     * @returns {Number} the magnitude of this vector
     */
    getMagnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * Calculates the angle of elevation of this vector in radians.
     * @returns {Number} the angle of elevation of this vector in radians
     */
    getTheta() {
        return Math.atan(this.y, this.x);
        // if (Math.sign(this.x) == Math.sign(-this.y) || this.y == 0 || this.x == 0) {
        //     return Math.atan2(-this.y, this.x)
        // } else {
        //     return Math.PI + Math.atan2(-this.y, this.x)
        // }
    }

    /**
     * Produces new object containing the same x, y coordinates of the vector
     * @returns {Vector} a new vector object with the same x, y coordinates of this vector
     */
    copy() {
        return new Vector(this.x, this.y);
    }

    /**
     * Returns the sum of a given vector and this vector.
     * @param {Vector} vector vector to be added
     * @returns {Vector} the sum of the vectors
     */
    add(vector) {
        return new Vector(this.x + vector.x, this.y + vector.y);
    }

    /**
     * Returns the difference between this vector and the given vector.
     * @param {Vector} vector vector to be subtracted
     * @returns the difference between this vector and the given vector
     */
    subtract(vector) {
        return new Vector(this.x - vector.x, this.y - vector.y);
    }

    /**
     * Return this vector multiplied by a scalar.
     * @param {Number} scalar scalar to multiply the vector by
     * @returns this vector multiplied by a scalar
     */
    multiply(scalar) {
        return new Vector(this.x * scalar, this.y * scalar);
    }
}
