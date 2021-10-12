class Renderer {

    static renderAll(robot) {
        Renderer.renderRobot(robot);
        Renderer.renderText(robot);
    }

    static renderRect(xTarget, yTarget, w, h, rotation) {
        translate(xTarget, yTarget);
        rotate(rotation);
        rect(0, 0, w, h);
        rotate(-rotation);
        translate(-xTarget, -yTarget);
    }

    static renderRobot(robot) {
        // noStroke()
        fill(225, 225, 225);
        // render the body of the robot so that it is positioned at the center of the gyro
        let xTarget = robot.gyro.r.x * PIXEL_SIZE;
        let yTarget = robot.gyro.r.y * PIXEL_SIZE;
        Renderer.renderRect(xTarget, yTarget, ROBOT_SIZE, ROBOT_SIZE, robot.gyro.θ)
        Renderer.renderSensors(robot);
        Renderer.renderMotors(robot);
    }

    static renderSensors(robot) {
        for (i = 0; i < robot.sensors.length; i++) {
            fill(0, 225, 0);
            Renderer.renderRect(
                robot.sensors[i].getR().x * PIXEL_SIZE,
                robot.sensors[i].getR().y * PIXEL_SIZE,
                SENSOR_SIZE,
                SENSOR_SIZE,
                robot.gyro.θ
            )
        }
    }

    static renderMotors(robot) {
        for (i = 0; i < robot.motors.length; i++) {
            fill(0, 0, 225);
            Renderer.renderRect(
                robot.motors[i].getR().x * PIXEL_SIZE,
                robot.motors[i].getR().y * PIXEL_SIZE,
                SENSOR_SIZE,
                SENSOR_SIZE,
                robot.gyro.θ
            )
        }
    }

    static drawPath(robot) {
        for (i = 1; i < robot.path.length; i++) {
            strokeWeight(robot.speeds[i].getMagnitude() / 10); // stroke weight is proportional to velocity
            stroke(0, 0, 0, 255 * (SECONDS_PATH_VISIBLE * FPS + i - robot.path.length) / (SECONDS_PATH_VISIBLE * FPS)); // dilute the path over time
            line(
                robot.path[i - 1].x * PIXEL_SIZE,
                robot.path[i - 1].y * PIXEL_SIZE,
                robot.path[i].x * PIXEL_SIZE,
                robot.path[i].y * PIXEL_SIZE
            );
        }
        strokeWeight(1);
        stroke(0, 0, 0);
    }

    static renderText(robot) {
        text('x: ' + robot.gyro.r.x.toFixed(2), 10, 10)
        text('y: ' + robot.gyro.r.y.toFixed(2), 10, 30)
        text('θ: ' + (robot.gyro.θ / 3.14).toFixed(2) + '	π', 10, 50)
        text('vx: ' + robot.gyro.v.x.toFixed(2), 80, 10)
        text('vy: ' + robot.gyro.v.y.toFixed(2), 80, 30)
        text('ω: ' + robot.gyro.ω.toFixed(2), 80, 50)
        text('ax: ' + robot.gyro.a.x.toFixed(2), 150, 10)
        text('ay: ' + robot.gyro.a.y.toFixed(2), 150, 30)
        text('α: ' + robot.gyro.α.toFixed(2), 150, 50)
    }
}