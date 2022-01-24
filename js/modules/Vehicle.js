/**
 * The blueprint class for all vehicles. Specific vehicles can be designed
 * by adding a specific configuration of components to this blueprint.
 */
class Vehicle {
    constructor(gyro, sensors = [], motorControllers = [], motors = []) {
        this.gyro = gyro;
        this.sensors = sensors;
        this.motorControllers = motorControllers;
        this.motors = motors;

        // used for drawing path of vehicle
        this.path = [];
        this.speeds = [];
    }

    get x() {
        return this.gyro.r.x;
    }

    get y() {
        return this.gyro.r.y;
    }

    get θ() {
        return this.gyro.θ;
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
            this.gyro.v = new Vector(0, 0).initFromPolar(this.motors[0].getOutput(), this.gyro.θ);
            let step = this.gyro.v.multiply(dt);
            this.gyro.r = this.gyro.r.add(step);
        }
        else if (this.motors.length === 2) {
            // assume that there are only two motors and the motors both face parallel to the robot body
            this.gyro.v = new Vector(this.motors[0].getOutput(), this.motors[1].getOutput())
            let motorPos1 = this.motors[0].getR();
            let motorPos2 = this.motors[1].getR();
            let step1 = this.gyro.v.x * dt;
            let step2 = this.gyro.v.y * dt;
            let stepVector1 = new Vector(step1 * Math.cos(this.gyro.θ), step1 * Math.sin(this.gyro.θ))
            let stepVector2 = new Vector(step2 * Math.cos(this.gyro.θ), step2 * Math.sin(this.gyro.θ))
            let motorFut1 = motorPos1.add(stepVector1); // future position of the motors
            let motorFut2 = motorPos2.add(stepVector2);

            let angleOfRotation = angle(motorPos1, motorPos2, motorFut1, motorFut2)
            let midpoint = midPoint(motorPos1, motorPos2);
            let midpointOffset = this.gyro.r.subtract(midpoint);
            let pt = perpendicular(motorPos1, motorPos2, midpoint);
            let newMidpoint = intersection(motorFut1, motorFut2, midpoint, pt);
            this.gyro.r = newMidpoint.add(midpointOffset)
            this.gyro.θ += angleOfRotation;
        }

        if (this.path.length > SECONDS_PATH_VISIBLE * FPS) {
            this.path.shift();
            this.speeds.shift();
        }
        this.path.push(this.gyro.r.copy());
        this.speeds.push(this.gyro.v.copy());
    }


    addSensor(sensor) {
        this.sensors.push(sensor);
    }

    addMotorController(motorController) {
        this.motorControllers.push(motorController);
    }

    addMotor(motor) {
        this.motors.push(motor);
    }
}