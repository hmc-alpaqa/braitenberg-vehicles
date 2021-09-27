class Motor {
    constructor(gyro, offset) {
        this.gyro = gyro;
        this.offset = offset;

        this.motorController = null; // TODO: default argument of null, but optionally passed arg
    }

    setMotorController(motorController) {
        this.motorController = motorController;
        return this;
    }

    getForce() {
        return this.motorController.calculateOutput();
    }

    getX() {
        return this.gyro.r.x + this.offset.x;
    }

    getY() {
        return this.gyro.r.y + this.offset.y;
    }
}