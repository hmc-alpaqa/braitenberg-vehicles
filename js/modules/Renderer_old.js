/**
 * The static class that handles rendering of the vehicles and their related
 * entities, forces, and stats
 * @class Renderer
 * @static 
 */
class Renderer {
    /**
     * Renders the body of the vehicle at the current position and rotation, then calls
     * helpers to render the vehicle's constituent parts
     * @param {Vehicle} vehicle 
     */
    static renderVehicle(vehicle) {
        fill(225, 225, 225);
        // renders the body of the vehicle so that it is positioned at the center of the gyro
        let xTarget = vehicle.gyro.r.x * PIXEL_SIZE;
        let yTarget = vehicle.gyro.r.y * PIXEL_SIZE;
        Renderer.renderRect(xTarget, yTarget, VEHICLE_SIZE, VEHICLE_SIZE, vehicle.gyro.θ)
        fill(0);
        textAlign(CENTER);
        // shh don't question the magic number
        // renders the label for the vehicle
        Renderer.renderText(vehicle.gyro.name, xTarget, yTarget + 3, vehicle.gyro.θ);
        Renderer.renderSensors(vehicle);
        Renderer.renderMotors(vehicle);
    }

    static renderSensors(vehicle) {
        for (let sensor of vehicle.sensors) {
            stroke(0);
            // the sensor consists of a line and an arc
            Renderer.renderLine(
                sensor.getR().x * PIXEL_SIZE - (SENSOR_SIZE * Math.cos(vehicle.gyro.θ)) / 2,
                sensor.getR().y * PIXEL_SIZE - (SENSOR_SIZE * Math.sin(vehicle.gyro.θ)) / 2,
                SENSOR_SIZE,
                vehicle.gyro.θ
            );
            noFill();
            Renderer.renderArc(
                sensor.getR().x * PIXEL_SIZE + SENSOR_SIZE * Math.cos(vehicle.gyro.θ),
                sensor.getR().y * PIXEL_SIZE + SENSOR_SIZE * Math.sin(vehicle.gyro.θ),
                SENSOR_SIZE,
                0.5 * SENSOR_SIZE,
                Math.PI / 6,
                -1 * Math.PI / 6,
                vehicle.gyro.θ,
            )
        }
    }

    static renderMotors(vehicle) {
        for (let i = 0; i < vehicle.motors.length; i++) {
            fill(0, 0, 225);
            Renderer.renderRect(
                vehicle.motors[i].getR().x * PIXEL_SIZE,
                vehicle.motors[i].getR().y * PIXEL_SIZE,
                SENSOR_SIZE,
                SENSOR_SIZE,
                vehicle.gyro.θ
            )
        }
    }

    /**
     * Draws the path that the vehicle has taken over the course of the past
     * SECONDS_PATH_VISIBLE seconds of simulation. The path will be thicker
     * corresponding to times the vehicle had a greater velocity
     * @param {Vehicle} vehicle 
     */
    static drawPath(vehicle) {
        for (let i = 1; i < vehicle.path.length; i++) {
            strokeWeight(vehicle.speeds[i].getMagnitude() / 10); // stroke weight is proportional to velocity
            stroke(0, 0, 0, 255 * (SECONDS_PATH_VISIBLE * FPS + i - vehicle.path.length) / (SECONDS_PATH_VISIBLE * FPS)); // dilute the path over time
            line(
                vehicle.path[i - 1].x * PIXEL_SIZE,
                vehicle.path[i - 1].y * PIXEL_SIZE,
                vehicle.path[i].x * PIXEL_SIZE,
                vehicle.path[i].y * PIXEL_SIZE
            );
        }
        strokeWeight(1);
        stroke(0, 0, 0);
    }


    /**
     * Data dashboard rendering the position, velocity, and acceleration of the vehicle
     * both linearly and angularly at the current time
     * @param {Vehicle} vehicle - the vehicle to render the stats of
     */
    static renderData(vehicle) {
        textAlign(LEFT);
        text('x: ' + vehicle.gyro.r.x.toFixed(2), 10, 10)
        text('y: ' + vehicle.gyro.r.y.toFixed(2), 10, 30)
        text('θ: ' + (vehicle.gyro.θ / 3.14).toFixed(2) + '	π', 10, 50)
        text('vx: ' + vehicle.gyro.v.x.toFixed(2), 80, 10)
        text('vy: ' + vehicle.gyro.v.y.toFixed(2), 80, 30)
        text('ω: ' + vehicle.gyro.ω.toFixed(2), 80, 50)
        text('ax: ' + vehicle.gyro.a.x.toFixed(2), 150, 10)
        text('ay: ' + vehicle.gyro.a.y.toFixed(2), 150, 30)
        text('α: ' + vehicle.gyro.α.toFixed(2), 150, 50)
    }

    static renderSource(source) {
        fill(255);
        circle(source.r.x * PIXEL_SIZE, source.r.y * PIXEL_SIZE, 20);
        fill(0);
        text(source.intensity, source.r.x * PIXEL_SIZE, source.r.y * PIXEL_SIZE);
    }

    /**
     * Helper function to render text at a given position with a given rotation
     * this is helpful for rendering the vehicle's name at an angle
     * @param {string} renderedText
     * @param {number} xTarget - the x position of the text
     * @param {number} yTarget - the y position of the text
     * @param {number} rotation - the rotation of the text
     */
    static renderText(renderedText, xTarget, yTarget, rotation) {
        translate(xTarget, yTarget);
        rotate(rotation);
        text(renderedText, 0, 0);
        rotate(-rotation);
        translate(-xTarget, -yTarget);
    }

    /**
     * Helper function to render an arc at a given position with a given rotation
     * this is helpful for rendering the vehicle's sensors at an angle
     * @param {number} xTarget - the x position of the arc
     * @param {number} yTarget - the y position of the arc
     * @param {number} w - the width of the arc
     * @param {number} h - the height of the arc
     * @param {number} start - the start angle of the arc
     * @param {number} stop - the end angle of the arc
     * @param {number} rotation - the rotation of the arc
     */

    static renderArc(xTarget, yTarget, w, h, start, stop, rotation) {
        translate(xTarget, yTarget);
        rotate(rotation);
        arc(0, 0, w, h, start, stop);
        rotate(-rotation);
        translate(-xTarget, -yTarget);
    }

    /**
     * Helper function to render a line at a given position with a given rotation
     * this is helpful for rendering the vehicle's sensors an angle
     * @param {number} xTarget - the x position of the line
     * @param {number} yTarget - the y position of the line
     * @param {number} length - the length of the line
     * @param {number} rotation - the rotation of the line
     */
    static renderLine(xTarget, yTarget, length, rotation) {
        line(xTarget, yTarget, xTarget + length * Math.cos(rotation), yTarget + length * Math.sin(rotation));
    }

    /**
     * Helper function to render a rectangle at a given position with a given rotation
     * this is helpful for rendering the vehicle and its motors at an angle
     * @param {number} xTarget - the x position of the rectangle
     * @param {number} yTarget - the y position of the rectangle
     * @param {number} w - the width of the rectangle
     * @param {number} h - the height of the rectangle
     * @param {number} rotation - the rotation of the rectangle
     */

    static renderRect(xTarget, yTarget, w, h, rotation) {
        translate(xTarget, yTarget);
        rotate(rotation);
        rect(0, 0, w, h);
        rotate(-rotation);
        translate(-xTarget, -yTarget);
    }

}
