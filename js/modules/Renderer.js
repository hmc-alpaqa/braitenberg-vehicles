/**
 * Helper class for rendering p5js objects.
 */
class Renderer {
    /**
     * Initializes the
     */
    static graphicsSetup() {
        sensorGraphic = createGraphics(PIXEL_SIZE * SENSOR_SIZE * 2, PIXEL_SIZE * SENSOR_SIZE);
        Renderer.sensorGraphicSetup();
        motorGraphic = createGraphics(PIXEL_SIZE * MOTOR_SIZE, PIXEL_SIZE * MOTOR_SIZE);
        Renderer.motorGraphicSetup();
        vehicleGraphic = createGraphics(PIXEL_SIZE * (VEHICLE_SIZE + (2 * SENSOR_SIZE) + MOTOR_SIZE), PIXEL_SIZE * VEHICLE_SIZE);
    }

    static sensorGraphicSetup() {
        sensorGraphic.line(0, PIXEL_SIZE * SENSOR_SIZE / 2,
            PIXEL_SIZE * SENSOR_SIZE, PIXEL_SIZE * SENSOR_SIZE / 2);
        sensorGraphic.noFill();
        sensorGraphic.arc(PIXEL_SIZE * SENSOR_SIZE * 1.5, PIXEL_SIZE * SENSOR_SIZE / 2, 
                    PIXEL_SIZE * SENSOR_SIZE, 0.5 * PIXEL_SIZE * SENSOR_SIZE,
                    PI / 6, -PI / 6);
    }

    static motorGraphicSetup() {
        motorGraphic.noStroke();
        motorGraphic.fill(0, 0, 0);
        motorGraphic.square(0, 0, MOTOR_SIZE * PIXEL_SIZE);
    }

    static renderVehicle(vehicle) {
        vehicleGraphic.clear();
        vehicleGraphic.noStroke();
        vehicleGraphic.fill(vehicle.color);
        vehicleGraphic.square(MOTOR_SIZE * PIXEL_SIZE, 0, VEHICLE_SIZE * PIXEL_SIZE);
        vehicleGraphic.fill(0);
        vehicleGraphic.textSize(VEHICLE_SIZE * PIXEL_SIZE / 2)
        vehicleGraphic.textAlign(CENTER);
        vehicleGraphic.text(vehicle.name, PIXEL_SIZE * (MOTOR_SIZE + VEHICLE_SIZE / 2), 0.7 * VEHICLE_SIZE * PIXEL_SIZE);
        for (let motor of vehicle.motors) {
            vehicleGraphic.image(motorGraphic, 0, PIXEL_SIZE * (motor.offset.y + 0.5 * (VEHICLE_SIZE - MOTOR_SIZE)));
        }

        for (let sensor of vehicle.sensors) {
            vehicleGraphic.image(sensorGraphic, PIXEL_SIZE * (MOTOR_SIZE + VEHICLE_SIZE), PIXEL_SIZE * (sensor.offset.x + 0.5 * (VEHICLE_SIZE - SENSOR_SIZE)));
        }
        push();
        translate(vehicle.x * PIXEL_SIZE, vehicle.y * PIXEL_SIZE);
        rotate(vehicle.theta);
        image(vehicleGraphic, PIXEL_SIZE * (-MOTOR_SIZE - VEHICLE_SIZE / 2), PIXEL_SIZE * -VEHICLE_SIZE / 2);
        pop();
    }

    static renderSource(source) {
        fill(255);
        circle(source.x * PIXEL_SIZE, source.y * PIXEL_SIZE, SOURCE_SIZE * PIXEL_SIZE);
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(4 * PIXEL_SIZE);
        text(source.intensity, source.x * PIXEL_SIZE, source.y * PIXEL_SIZE);
        textAlign(LEFT, BASELINE);
    }

    static renderData(vehicle) {
        push();
        translate(-MAP_LENGTH/2, -MAP_HEIGHT/2);
        textAlign(LEFT);
        text('x: ' + vehicle.x.toFixed(2), 10, 10)
        text('y: ' + vehicle.y.toFixed(2), 10, 30)
        text('θ: ' + (vehicle.gyro.theta/ 3.14).toFixed(2) + '	π', 10, 50)
        text(`FPS: ${frameRate().toFixed(0)}`, 10, 70);
        pop();
    }

    static drawTrailingPath(vehicle) {
        for (let i = 1; i < vehicle.path.length; i++) {
            strokeWeight(Math.min(VEHICLE_SIZE * PIXEL_SIZE, Math.max(1, 1000/vehicle.speeds[i].getMagnitude()))); // stroke weight is proportional to velocity
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

    static drawPath(path, speeds, colors) {
        for (let i = 1; i < path.length; i++) {
            strokeWeight(Math.min(VEHICLE_SIZE * PIXEL_SIZE, Math.max(1, 1000/speeds[i].getMagnitude()))); // stroke weight is proportional to velocity
            stroke(colors[i]);
            line(
                path[i - 1].x * PIXEL_SIZE,
                path[i - 1].y * PIXEL_SIZE,
                path[i].x * PIXEL_SIZE,
                path[i].y * PIXEL_SIZE
            );
        }
        strokeWeight(1);
        stroke(0, 0, 0);
    }
}