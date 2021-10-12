class Motor extends Component {
    constructor(gyro, offset, inputs=[]) {
        super(gyro, offset);
        this.inputs = inputs;
    }

    addInput(input) {
        this.inputs.push(input);
        return this;
    }

    getForce() {
        return this.motorController.calculateOutput();
    }

}