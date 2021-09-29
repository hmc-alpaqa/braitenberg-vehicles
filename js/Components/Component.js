class Component {
    constructor(gyro, offset) {
        this.gyro = gyro;
        this.offset = offset;
    }

    getR() {
        let x = this.offset.x
        let y = this.offset.y
        let θ = this.gyro.θ
        let a = x / Math.tan(this.gyro.θ);
        let b = y - a;
        let xEffective = b * Math.sin(θ);
        let c = b * Math.cos(θ);
        let d = x / Math.sin(θ);
        let yEffective = c + d;
        return new Vector(
            this.gyro.r.x + xEffective,
            this.gyro.r.y + yEffective,
        )
    }
}