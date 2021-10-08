class MotorController extends Component {
    constructor(gyro, offset, sensors=[]) {
        super(gyro, offset);
        this.sensors = sensors;
    }

    addSensor(sensor) {
        this.sensors.push(sensor);
        return this
    }

    calculateOutput() {
        let sum = 0
        for (let sensor of this.sensors) {
            sum += 100 * sensor.getValue();
        }
        return Math.max(sum, 0) // the motors should never produce negative force
    }
}