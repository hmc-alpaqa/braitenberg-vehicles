/**
 * Class representing the gyro of a veheicle. The gyro contains vehicle data such as position, angle of rotation, velocity, and acceleration.
 */
class Gyro {
    /**
     * Creates a gyro.
     * @param {Universe} universe the universe of the vehicle
     * @param {Number} x the x-position of the vehicle
     * @param {Number} y the y-position of the vehicle
     * @param {Number} theta the angle the vehicle is rotated from the x-axis, in radians
     */
    constructor(universe, x, y, theta) {
        this.universe = universe;
        this.r = new Vector(x, y);
        this.theta = theta; 
        this.v = new Vector(0, 0);
        this.a = new Vector(0, 0);
    }
}