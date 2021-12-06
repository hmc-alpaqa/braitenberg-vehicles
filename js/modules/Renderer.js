class Renderer {
    static sensorGraphicSetup() {
        sensorGraphic.line(0, SENSOR_SIZE / 2,
            SENSOR_SIZE, SENSOR_SIZE / 2);
        sensorGraphic.noFill();
        sensorGraphic.arc(SENSOR_SIZE * 1.5, SENSOR_SIZE / 2, 
                    SENSOR_SIZE, 0.5 * SENSOR_SIZE,
                    PI / 6, -PI / 6);
    }

    static motorGraphicSetup() {
        motorGraphic.noStroke();
        motorGraphic.fill(50, 50, 255);
        motorGraphic.square(0, 0, MOTOR_SIZE);
    }

    static renderVehicle(vehicle) {
        vehicleGraphic.clear();
        vehicleGraphic.noStroke();
        vehicleGraphic.fill(225, 225, 225);
        vehicleGraphic.square(MOTOR_SIZE, 0, VEHICLE_SIZE);
        vehicleGraphic.textAlign(CENTER);
        vehicleGraphic.text(vehicle.gyro.name, MOTOR_SIZE + VEHICLE_SIZE / 2, VEHICLE_SIZE / 2);
        for (let motor of vehicle.motors) {
            vehicleGraphic.image(motorGraphic, 0, motor.offset.y * PIXEL_SIZE + 0.5 * (VEHICLE_SIZE - MOTOR_SIZE));
        }

        for (let sensor of vehicle.sensors) {
            vehicleGraphic.image(sensorGraphic, MOTOR_SIZE + VEHICLE_SIZE, sensor.offset.y * PIXEL_SIZE + 0.5 * (VEHICLE_SIZE - SENSOR_SIZE));
        }
        translate(vehicle.gyro.r.x * PIXEL_SIZE, vehicle.gyro.r.y * PIXEL_SIZE);
        rotate(vehicle.gyro.θ);
        image(vehicleGraphic, -MOTOR_SIZE - VEHICLE_SIZE / 2, -VEHICLE_SIZE / 2);
        rotate(-vehicle.gyro.θ);
        translate(-vehicle.gyro.r.x * PIXEL_SIZE, -vehicle.gyro.r.y * PIXEL_SIZE);
    }

    static renderSource(source) {
        fill(255);
        circle(source.r.x * PIXEL_SIZE, source.r.y * PIXEL_SIZE, 20);
        fill(0);
        text(source.intensity, source.r.x * PIXEL_SIZE, source.r.y * PIXEL_SIZE);
    }

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
}