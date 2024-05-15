class Component {
    constructor(gyro, offset) {
        this.gyro = gyro;
        this.offset = offset;
    }

    getOutput() {
        throw new Error('The getOutput() method must be implemented by any children of the Component class');
    }

    getR() {
        let r = this.offset.getMagnitude();
        let theta = this.offset.getTheta();

        let rotateBy = this.gyro.theta

        let thetaEffective = theta + rotateBy

        let xEffective = r * Math.cos(thetaEffective)
        // must negate due to p5js coordinates
        let yEffective = r * Math.sin(thetaEffective)

        return new Vector(
            this.gyro.r.x + xEffective,
            this.gyro.r.y + yEffective,
        )
    }
}