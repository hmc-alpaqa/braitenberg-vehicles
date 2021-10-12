// robot with a single sensor that moves faster the more intense the light is
class Vehicle {
    constructor(gyro, sensors=[], motorControllers=[], motors=[]) {
        this.gyro = gyro;
        this.sensors = sensors;
        this.motorControllers = motorControllers;
        this.motors = motors;
    }

    step(dt) {
        this.move(dt);
        this.rotate(dt);
    }

    move(dt) {
        let netForce = 0;

        for (i = 0; i < this.motors.length; i++) {
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
        // and the kinetic friction, perhaps we can add mu_k and mu_s separatley
        // or we could even add different terrtains with diffeerent mu_k and mu_s
        // let forceDirection = -1 * Math.sign(netForce);
        // let forceVector = forceDirection * friction
        // let netForceWithFriction = netForce + forceVector;
        // if the robot is stationary there's no friction

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
    }

    rotate(dt) {
        // find the torque generated by the motors
        // get the position of each motor
        // find the vector of the motor
        // find the torque of the motor
        this.gyro.α = 0

        for (i = 0; i < this.motors.length; i++) {
            let motor = this.motors[i];
            let dist = Math.sqrt(Math.pow(motor.offset.x, 2), Math.pow(motor.offset.y, 2));
            let theta = Math.atan(-motor.offset.y / Math.abs(motor.offset.x)); // angle of elevation of the motor from the x-axis
            // we multiply by -1 so the torque is in the theta-direction we want to rotate
            let motorForce = motor.getOutput();
            // if the robot is stationary there's no friction
            if (this.gyro.ω < 0.1) {
                motorForce = motorForce;
                // if friction is more than the net force, the robot doesnt move
            } else if (frictionMagnitude > motorForce) {
                motorForce = 0;
                // otherwise, vectorsum friction and net force
            } else {
                motorForce -= frictionMagnitude / this.motors.length;
            }

            let τ = -100 * motorForce * dist * Math.sin(theta); // τ = F r sin(θ)

            this.gyro.α += MOMENT_OF_INERTIA * τ * dt; // let moment of inertia be 1 so torque = angular accel
        }

        this.gyro.ω += this.gyro.α * dt;
        this.gyro.θ += this.gyro.ω * dt;
        this.gyro.θ %= 2 * Math.PI;
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