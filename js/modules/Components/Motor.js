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

}