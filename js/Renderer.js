class Renderer {
    constructor(robot) {
        this.robot = robot;
    }

    renderAll() {
        this.renderRobot();
        this.renderText();
    }

    renderRobot() {
        // noStroke()
        fill(225, 225, 225);
        // render the body of the robot so that it is positioned at the center of the gyro
        square(
            this.robot.gyro.r.x * PIXEL_SIZE - ROBOT_SIZE / 2, // the - ROBOT_SIZE / 2 is to center the robot in the center of the gyro rather than draw the upper left corner at the center of the gyro
            this.robot.gyro.r.y * PIXEL_SIZE - ROBOT_SIZE / 2,
            ROBOT_SIZE
        );
        this.renderSensors();
        this.renderMotors();
    }

    renderSensors() {
        for (i = 0; i < this.robot.sensors.length; i++) {
            fill(0, 225, 0);
            square(
                this.robot.sensors[i].getX() * PIXEL_SIZE - SENSOR_SIZE / 2,
                this.robot.sensors[i].getY() * PIXEL_SIZE - SENSOR_SIZE / 2,
                SENSOR_SIZE);
        }
    }

    renderMotors() {
        for (i = 0; i < this.robot.motors.length; i++) {
            fill(0, 0, 225);
            square(
                this.robot.motors[i].getR().x * PIXEL_SIZE - SENSOR_SIZE / 2,
                this.robot.motors[i].getR().y * PIXEL_SIZE - SENSOR_SIZE / 2,
                SENSOR_SIZE);
        }
    }

    renderText() {
        text('x: ' + this.robot.gyro.r.x.toFixed(2), 10, 10)
        text('y: ' + this.robot.gyro.r.y.toFixed(2), 10, 30)
        text('θ: ' + this.robot.gyro.θ.toFixed(2), 10, 50)
        text('vx: ' + this.robot.gyro.v.x.toFixed(2), 80, 10)
        text('vy: ' + this.robot.gyro.v.y.toFixed(2), 80, 30)
        text('ω: ' + this.robot.gyro.ω.toFixed(2), 80, 50)
        text('ax: ' + this.robot.gyro.a.x.toFixed(2), 150, 10)
        text('ay: ' + this.robot.gyro.a.y.toFixed(2), 150, 30)
        text('α: ' + this.robot.gyro.α.toFixed(2), 150, 50)
    }
}