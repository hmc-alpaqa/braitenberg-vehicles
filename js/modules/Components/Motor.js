class Motor extends Component {
    constructor(gyro, offset, inputs = []) {
        super(gyro, offset);
        this.inputs = inputs;
    }

    addInput(input) {
        this.inputs.push(input);
        return this;
    }

    getOutput() {
        let sum = 0
        for (let i = 0; i < this.inputs.length; i++) {
            sum += this.inputs[i].getOutput();
        }
        return Math.min(Math.max(0, sum), 300);
    }

    memoizedCopy(copiedComponents = {}) {
        if (this in copiedComponents) {
            return copiedComponents[this];
        } else {
            if (!this.gyro in copiedComponents) {
                copiedComponents[this.gyro] = this.gyro.copy();
            }
            let newCopy = new Motor(copiedComponents[this.gyro], this.offset.copy(), this.inputs.map(input => input.copy(copiedComponents)));
            copiedComponents[this] = newCopy;
            return newCopy;
        }
    }
}