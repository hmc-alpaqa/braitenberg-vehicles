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

        // let a = y / Math.abs(Math.cos(θ));
        // let b = Math.abs(Math.tan(θ)) / y;
        // b = isNaN(b) ? 0 : b;
        // let c = x - b;
        // let d = c * Math.abs(Math.sin(θ));
        // let xEffective = c * Math.abs(Math.cos(θ));
        // let yEffective = a + d;
        return new Vector(
            this.gyro.r.x + xEffective,
            this.gyro.r.y + yEffective,
        )
    }
}