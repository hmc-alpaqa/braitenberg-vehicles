class Motor extends Component {
    constructor(gyro, offset) {
        super(gyro, offset);

        this.motorController = null; // TODO: default argument of null, but optionally passed arg
    }

    setMotorController(motorController) {
        this.motorController = motorController;
        return this;
    }

    getForce() {
        return this.motorController.calculateOutput();
    }

}