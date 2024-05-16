/**
 * Class representing a sensor. Detects stimuli from the sources.
 * @extends Component
 */
class Sensor extends Component {
    /**
     * Creates a sensor
     * @param {Gyro} gyro gyro belonging to the vehicle the sensor is on
     * @param {Number} offset position of the sensor relative to the center of the vehicle
     */
    constructor(gyro, offset) {
        super(gyro, offset);
    }

    /**
     * Returns the stimulus sensed at the sensor
     * @returns {Number} sensor output
     */
    getOutput() { 
        let y = Math.round(this.getR().y);
        let x = Math.round(this.getR().x);
        return 100 * this.gyro.universe.getStimulus(x, y);
    }

}