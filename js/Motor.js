class Motor {
    constructor(gyro, xOffset, yOffset) {
        this.gyro = gyro;
        this.xOffset = xOffset;
        this.yOffset = yOffset;

        this.motorController = null;
    }

    setMotorController(motorController) {
        this.motorController = motorController;
        return this;
    }

    getForce() {
        return this.motorController.calculateOutput();
    }

    getX() {
        return this.gyro.x + this.xOffset;
    }

    getY() {
        return this.gyro.y + this.yOffset;
    }


}