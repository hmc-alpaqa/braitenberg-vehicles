class Component {
    constructor(gyro, offset) {
        this.gyro = gyro;
        this.offset = offset;
    }


    getR() {
        let r = this.offset.getMagnitude();
        let θ = this.offset.getTheta();

        let rotateBy = this.gyro.θ

        let θEffective = θ + rotateBy

        let xEffective = r * Math.cos(θEffective)
        let yEffective = r * Math.sin(θEffective)

        return new Vector(
            this.gyro.r.x + xEffective,
            this.gyro.r.y + yEffective,
        )
    }
}