class MotorController extends Component {
    constructor(gyro, offset, inputs = [], a, b) {
        super(gyro, offset);
        this.inputs = inputs;
        this.a = a;
        this.b = b;
    }

    addSensor(sensor) {
        this.sensors.push(sensor);
        return this
    }

    calculateOutput() {
        let sum = 0
        for (let input of this.inputs) {
            sum += input.getOutput();
        }
        return a * sum + b; // the motors should never produce negative force
    }
}