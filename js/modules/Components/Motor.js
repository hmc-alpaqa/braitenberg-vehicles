/**
 * Class representing a motor. Drives the motion of the vehicle.
 * @extends Component
 * 
*/
class Motor extends Component {
    /**
     * Creates a motor
     * @param {Gyro} gyro gyro belonging to the vehicle the inhibitor is on
     * @param {Vector} offset position of the motor relative to the center of the vehicle
     * @param {Component[]} inputs inputs to the motor
     */
    constructor(gyro, offset, inputs = []) {
        super(gyro, offset);
        this.inputs = inputs;
    }

    /**
     * Returns the motor output
     * @returns {Number} motor output
     */
    getOutput() {
        let sum = 0
        for (let i = 0; i < this.inputs.length; i++) {
            sum += this.inputs[i].getOutput();
        }
        return Math.min(Math.max(0, sum), 300); // caps min speed at 0 and max at 300
    }

}