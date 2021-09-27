class MotorController {
    constructor(gyro, offset) {
        this.gyro = gyro;
        this.offset = offset;
        this.sensors = []
    }

    addSensor(sensor) {
        this.sensors.push(sensor);
        return this
    }

    calculateOutput() {
        let sum = 0
        for (i = 0; i < sensors.length; i++) {
            sum += 100 * this.sensors[i].getValue();
        }
        return Math.max(sum, 0) // the motors should never produce negative force
    }
}