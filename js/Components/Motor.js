class Motor extends Component {
    constructor(gyro, offset, motorController) {
        super(gyro, offset);
        this.motorController = motorController; // TODO: default argument of null, but optionally passed arg
    }

    setMotorController(motorController) {
        this.motorController = motorController;
        return this;
    }

    getForce() {
        return this.motorController.calculateOutput();
    }

}