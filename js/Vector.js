class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getMagnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    getTheta() {
        if (Math.sign(this.x) == Math.sign(this.y)) {
            return Math.atan2(this.x, this.y)
        } else {
            return Math.PI + Math.atan2(this.x, this.y)
        }
    }
}