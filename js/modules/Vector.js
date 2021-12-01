/**
 * Simple abstraction for a vector. Should be used in all cases where a vector is needed.
 * especially were vector arithmetic is needed.
 * @class Vector
 * @constructor
 * @param {Number} x the x component of the vector
 * @param {Number} y the y component of the vector
 * 
 */
class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
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
        let theta = Math.atan2(this.y, this.x);
        if (theta >= 0) {
            return theta
        } else {
            return 2 * Math.PI + Math.atan2(this.y, this.x)
        }
    }

    /**
     * produces new object containing the same x, y coordinates of the vector
     * @returns {Vector} a new vector object with the same x, y coordinates of this vector
     */
    copy() {
        return new Vector(this.x, this.y);
    }

    add(vector) {
        return new Vector(this.x + vector.x, this.y + vector.y);
    }

    subtract(vector) {
        return new Vector(this.x - vector.x, this.y - vector.y);
    }

    multiply(scalar) {
        return new Vector(this.x * scalar, this.y * scalar);
    }
}
