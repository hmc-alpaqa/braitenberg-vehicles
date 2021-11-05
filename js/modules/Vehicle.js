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

    copy() {
        return Vehicle(this.gyro, this.sensors, this.motorControllers, this.motors);
    }

    /**
     * Advances the vehicle's position and rotation by a small time step
     * @param {number} dt - The amount of time to advance the vehicle by
     */
    step(dt) {
        this.move(dt);
        this.rotate(dt);
    }

    /**
     * Uses an instantaneous approximation of the vehicle's motion to predict its
     * position some small time step in the future
     * @param {Number} dt - The amount of time to step the vehicle by
     */
    move(dt) {
        let netForce = 0;

        for (let i = 0; i < this.motors.length; i++) {
            let motor = this.motors[i];
            netForce += motor.getOutput();
        }

        // find the velocity vector's theta
        // create new friction force directed at theta + pi
        // set magnitude to force intensity:
        // resolve vector to x, y forces and add to net force
        // max netforce, 0
        let vTheta = Math.atan2(this.gyro.v.y, this.gyro.v.x);
        let frictionTheta = vTheta + Math.PI;
        let xFriction = frictionMagnitude * Math.cos(frictionTheta);
        let yFriction = frictionMagnitude * Math.sin(frictionTheta);


        // we're treating friction as both the max static friction
        // and the kinetic friction, perhaps we can add mu_k and mu_s separately
        // or we could even add different terrains with different mu_k and mu_s
        // let forceDirection = -1 * Math.sign(netForce);
        // let forceVector = forceDirection * friction
        // let netForceWithFriction = netForce + forceVector;
        // if the vehicle is stationary there's no friction

        let fx = Math.cos(-this.gyro.θ) * netForce;
        let fy = Math.sin(-this.gyro.θ) * netForce;

        if (Math.abs(this.gyro.v.getMagnitude()) < 1) {
            if (frictionMagnitude > netForce) {
                fx = 0;
                fy = 0;
                this.gyro.v.x = 0;
                this.gyro.v.y = 0;
            }
        } else {
            fx += xFriction;
            fy += yFriction;
        }

        // let mass be 1 so that force = acceleration
        this.gyro.a.x = fx;
        this.gyro.a.y = fy;

        this.gyro.v.x += dt * this.gyro.a.x;
        this.gyro.v.y += dt * this.gyro.a.y;

        this.gyro.r.x += dt * this.gyro.v.x;
        this.gyro.r.y += dt * this.gyro.v.y;

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