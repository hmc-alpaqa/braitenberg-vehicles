/**
 * Class representing a motor controller. Modifies the input by some function.
 * @extends Component
 */
class MotorController extends Component {
    /**
     * Creates a motor controller
     * @param {Gyro} gyro gyro belonging to the vehicle the inhibitor is on
     * @param {Vector} offset position of the motor controller relative to the center of the vehicle
     * @param {Component[]} inputs inputs to the motor controller
     * @param {*} f function that modifies the motor controller input
     */
    constructor(gyro, offset, inputs = [], f) {
        super(gyro, offset);
        this.inputs = inputs;
        this.f = f;
    }

    /**
     * Returns the motor controller output
     * @returns {Number} motor controller output
     */
    getOutput() {
        let sum = 0
        for (let input of this.inputs) {
            sum += input.getOutput();
        }
        return this.f(sum); // the motors should never produce negative force
    }
}