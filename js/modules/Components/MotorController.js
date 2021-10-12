class MotorController extends Component {
    constructor(gyro, offset, inputs = [], f) {
        super(gyro, offset);
        this.inputs = inputs;
        this.f = f;
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
        return this.f(sum); // the motors should never produce negative force
    }
}