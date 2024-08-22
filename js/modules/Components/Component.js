/**
 * Abstract class representing a vehicle component.
 * @prop {Gyro} gyro gyro belonging to the vehicle the inhibitor is on
 * @prop {Vector} offset position of the inhibitor relative to the center of the vehicle
 */
class Component {
    /**
     * Creates a component.
     * @param {Gyro} gyro gyro belonging to the vehicle the inhibitor is on
     * @param {Vector} offset position of the inhibitor relative to the center of the vehicle
     */
    constructor(gyro, offset) {
        if (this.constructor == Component) {
            throw new TypeError("Cannot construct Component instances directly");
        }

        this.gyro = gyro;
        this.offset = offset;
    }

    /**
     * Returns the output of the component. Must be implemented by child classes.
     */
    getOutput() {
        throw new Error("method 'getOutput()' must be implemented");
    }

    /**
     * Returns the position of the component.
     * @returns {Vector} the position of the component
     */
    getR() {
        let r = this.offset.getMagnitude();
        let theta = this.offset.getTheta();

        let rotateBy = this.gyro.theta

        let thetaEffective = theta + rotateBy

        let xEffective = r * Math.cos(thetaEffective)
        let yEffective = r * Math.sin(thetaEffective)

        return new Vector(
            this.gyro.r.x + xEffective,
            this.gyro.r.y + yEffective,
        )
    }
}