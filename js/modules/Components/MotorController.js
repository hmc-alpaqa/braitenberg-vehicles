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

    getOutput() {
        let sum = 0
        for (let input of this.inputs) {
            sum += input.getOutput();
        }
        return this.f(sum); // the motors should never produce negative force
    }

    memoizedCopy(copiedComponents = {}) {
        if (this in copiedComponents) {
            return copiedComponents[this];
        } else {
            if (!this.gyro in copiedComponents) {
                copiedComponents[this.gyro] = this.gyro.copy();
            }
            let newCopy = new MotorController(copiedComponents[this.gyro], this.offset.copy(), this.inputs.map(input => input.copy(copiedComponents)), this.f);
            copiedComponents[this] = newCopy;
            return newCopy;
        }
    }
}