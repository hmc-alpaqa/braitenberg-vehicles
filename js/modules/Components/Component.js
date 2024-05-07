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
        let angle = this.offset.getTheta();

        let rotateBy = this.gyro.angle

        let angleEffective = angle + rotateBy

        let xEffective = r * Math.cos(angleEffective)
        let yEffective = r * Math.sin(angleEffective)

        return new Vector(
            this.gyro.r.x + xEffective,
            this.gyro.r.y + yEffective,
        )
    }
}