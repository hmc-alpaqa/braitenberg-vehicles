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

    calculateOutput() {
        let sum = 0
        for (let input of this.inputs) {
            sum += input.getOutput();
        }
        return a * sum + b; // the motors should never produce negative force
    }

    memoizedCopy(copiedComponents = {}) {
        if (this in copiedComponents) {
            return copiedComponents[this];
        } else {
            if (!this.gyro in copiedComponents) {
                copiedComponents[this.gyro] = this.gyro.copy();
            }
            let newCopy = new Inhibitor(copiedComponents[this.gyro], this.offset.copy(), this.inputs.map(input => input.copy(copiedComponents)), a, b);
            copiedComponents[this] = newCopy;
            return newCopy;
        }
    }
}