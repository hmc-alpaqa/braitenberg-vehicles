/**
 * Abstract class representing a vehicle.
 * @prop {Gyro} gyro gyro belonging to the vehicle the sensor is on
 * @prop {Vehicles} type type of vehicle
 * @prop {Number} id id of vehicle
 * @prop {Sensor[]} sensors vehicle sensors
 * @prop {Motor[]} motors vehicle motors
 * @prop {MotorController[]} motorControllers vehicle motor controllers
 * @prop {Vector[]} path vehicle position history
 * @prop {Vector[]} speeds vehicle velocity history
 * @prop {String} color vehicle body color, represented in hexcode
 * @prop {String} currentColor vehicle current path color (in draw mode)
 * @prop {String[]} colors vehicle color history
 */
class Vehicle {
    /**
     * Creates a vehicle.
     * @param {Gyro} gyro gyro belonging to the vehicle the sensor is on
     * @param {Vehicles} type type of vehicle
     * @param {Number} id id of vehicle
     * @param {Sensor[]} sensors vehicle sensors
     * @param {Motor[]} motors vehicle motors
     * @param {MotorController[]} motorControllers vehicle motor controller
     */
    constructor(gyro, type, id, sensors = [], motors = [], motorControllers = [],) {
        if (this.constructor == Vehicle) {
            throw new TypeError("Cannot construct Vehicle instances directly");
        }
        this.gyro = gyro;
        this.type = type;
        this.id = id;
        this.sensors = sensors;
        this.motors = motors;
        this.motorControllers = motorControllers;

        // used for drawing path of vehicle
        this.path = [];
        this.speeds = [];
        this.color = colors[colorsIndex];
        this.currentColor = "#000000";
        this.colors = [];
    }

    /**
     * Returns the position vector of the vehicle.
     * @returns {Vector} the position of the vehicle
     */
    get r() {
        return this.gyro.r;
    }

    /**
     * Returns the x-position of the vehicle.
     * @returns {Number} the x-position of the vehicle
     */
    get x() {
        return this.gyro.r.x;
    }

    /**
     * Returns the y-position of the vehicle.
     * @returns {Number} the y-position of the vehicle
     */
    get y() {
        return this.gyro.r.y;
    }

    /**
     * Returns the angle in radians of the vehicle from the x-axis.
     * @returns {Number} the angle of the vehicle from the x-axis
     */
    get theta() {
        return this.gyro.theta;
    }

    /**
     * Moves the vehicle to the specified x-position.
     * @param {Number} x new x-position
     */
    setX(x) {
        this.gyro.r.x = x;
    }

    /**
     * Moves the vehicle to the specified y-position
     * @param {Number} y new y-position
     */
    setY(y) {
        this.gyro.r.y = y;
    }

    /**
     * Changes the vehicle's current color to the specified color.
     * @param {String} color new color
     */
    setCurrentColor(color) {
        this.currentColor = color;
    }

    copy() {
        return Vehicle(this.gyro, this.sensors, this.motorControllers, this.motors);
    }

    /**
     * Advances the vehicle's position and rotation by a small time step
     * @param {number} dt - The amount of time to advance the vehicle by
     */
    step(dt) {
        this.move(dt);
    }

    /**
     * Uses an instantaneous approximation of the vehicle's motion to predict its
     * position some small time step in the future
     * @param {Number} dt - The amount of time to step the vehicle by
     */
    move(dt) {
        if (this.motors.length === 1) {
            this.gyro.v = new Vector(0, 0).initFromPolar(this.motors[0].getOutput(), -this.gyro.theta);
            let step = this.gyro.v.multiply(dt);
            this.gyro.r = this.gyro.r.add(step);
        } else if (this.motors.length === 2) {
            // assume that there are only two motors and the motors both face parallel to the robot body
            this.gyro.v = new Vector(this.motors[0].getOutput(), this.motors[1].getOutput())
            let motorPos1 = this.motors[0].getR();
            let motorPos2 = this.motors[1].getR();
            // calculate distance traveled
            let step1 = this.gyro.v.x * dt;
            let step2 = this.gyro.v.y * dt;
            // convert polar coordinates and distance traveled to rectangular coordinates
            let stepVector1 = new Vector(step1 * Math.cos(this.gyro.theta), step1 * Math.sin(this.gyro.theta))
            let stepVector2 = new Vector(step2 * Math.cos(this.gyro.theta), step2 * Math.sin(this.gyro.theta))
            // use displacement vector and original motor coordinates to calculate new motor positions
            let motorFut1 = motorPos1.add(stepVector1);
            let motorFut2 = motorPos2.add(stepVector2);
            // calculate how much the vehicle has rotated
            let angleOfRotation = angle(motorPos1, motorPos2, motorFut1, motorFut2)
            // calculate relative position of midpoint between motors and vehicle body
            let midpoint = midPoint(motorPos1, motorPos2);
            let midpointOffset = this.gyro.r.subtract(midpoint);
            // calculate new position of vehicle body
            let pt = perpendicular(motorPos1, motorPos2, midpoint);
            let newMidpoint = intersection(motorFut1, motorFut2, midpoint, pt);
            this.gyro.r = newMidpoint.add(midpointOffset)
            // update gyro to reflect vehicle rotation
            this.gyro.theta += angleOfRotation;
        }
        // if in sandbox mode, position and velocity histories have a maximum size
        if(!drawMode) {
            if (this.path.length > SECONDS_PATH_VISIBLE * FPS) {
                this.path.shift();
                this.speeds.shift();
            }
        }
        // update vehicle histories
        this.path.push(this.gyro.r.copy());
        this.speeds.push(this.gyro.v.copy());
        this.colors.push(this.currentColor);
    }
}