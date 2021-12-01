class Inhibitor extends Component {
    constructor(gyro, offset, inputs = [], multiplier, startingVelocity) {
        super(gyro, offset);
        this.inputs = inputs;
        this.multiplier = multiplier;
        this.startingVelocity = startingVelocity;
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
        if (sum > this.startingVelocity) {
            sum = this.startingVelocity;
        }
        return this.multiplier * sum + this.startingVelocity;
    }
}
