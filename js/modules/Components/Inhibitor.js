/**
 * Class representing an inhibitor. Multiplies the input by a constant, typically -1.
 * @extends Component
 */
class Inhibitor extends Component {
    /**
     * Creates an inhibitor
     * @param {Gyro} gyro gyro belonging to the vehicle the inhibitor is on
     * @param {Vector} offset position of the inhibitor relative to the center of the vehicle
     * @param {Component[]} inputs inputs to the inhibitor
     * @param {Number} multiplier constant to multiply the source input by
     * @param {Number} startingVelocity starting velocity of the vehicle
     */
    constructor(gyro, offset, inputs = [], multiplier, startingVelocity) {
        super(gyro, offset);
        this.inputs = inputs;
        this.multiplier = multiplier;
        this.startingVelocity = startingVelocity;
    }
    
    /**
     * Returns the inhibitor output
     * @returns {Number} inhibitor output
     */
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
