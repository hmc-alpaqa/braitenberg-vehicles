class Inhibitor extends Component {
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

    getOutput() {
        let sum = 0
        for (let input of this.inputs) {
            sum += input.getOutput();
        }
        // the motors should never produce negative force
        if (sum > this.b) {
            sum = this.b;
        }
        return this.a * sum + this.b;
    }
}