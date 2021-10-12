class Renderer {
    constructor(robot) {
        this.robot = robot;
    }

    renderAll() {
        this.renderRobot();
        this.renderText();
    }

    renderRect(xTarget, yTarget, w, h, rotation) {
        translate(xTarget, yTarget);
        rotate(rotation);
        rect(0, 0, w, h);
        rotate(-rotation);
        translate(-xTarget, -yTarget);
    }

    renderRobot() {
        // noStroke()
        fill(225, 225, 225);
        // render the body of the robot so that it is positioned at the center of the gyro
        let xTarget = this.robot.gyro.r.x * PIXEL_SIZE;
        let yTarget = this.robot.gyro.r.y * PIXEL_SIZE;
        this.renderRect(xTarget, yTarget, ROBOT_SIZE, ROBOT_SIZE, this.robot.gyro.θ)
        this.renderSensors();
        this.renderMotors();
    }

    renderSensors() {
        for (i = 0; i < this.robot.sensors.length; i++) {
            fill(0, 225, 0);
            this.renderRect(
                this.robot.sensors[i].getR().x * PIXEL_SIZE,
                this.robot.sensors[i].getR().y * PIXEL_SIZE,
                SENSOR_SIZE,
                SENSOR_SIZE,
                this.robot.gyro.θ
            )
        }
    }

    renderMotors() {
        for (i = 0; i < this.robot.motors.length; i++) {
            fill(0, 0, 225);
            this.renderRect(
                this.robot.motors[i].getR().x * PIXEL_SIZE,
                this.robot.motors[i].getR().y * PIXEL_SIZE,
                SENSOR_SIZE,
                SENSOR_SIZE,
                this.robot.gyro.θ
            )
        }
    }

    renderText() {
        text('x: ' + this.robot.gyro.r.x.toFixed(2), 10, 10)
        text('y: ' + this.robot.gyro.r.y.toFixed(2), 10, 30)
        text('θ: ' + (this.robot.gyro.θ / 3.14).toFixed(2) + '	π', 10, 50)
        text('vx: ' + this.robot.gyro.v.x.toFixed(2), 80, 10)
        text('vy: ' + this.robot.gyro.v.y.toFixed(2), 80, 30)
        text('ω: ' + this.robot.gyro.ω.toFixed(2), 80, 50)
        text('ax: ' + this.robot.gyro.a.x.toFixed(2), 150, 10)
        text('ay: ' + this.robot.gyro.a.y.toFixed(2), 150, 30)
        text('α: ' + this.robot.gyro.α.toFixed(2), 150, 50)
    }
}