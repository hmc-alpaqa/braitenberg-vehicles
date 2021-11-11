////////// COWARD //////////
function Vehicle2a(u, x, y) {
    let gyro = new Gyro(u, x, y, θ);
    let sensor1 = new Sensor(gyro, new Vector(PIXEL_SIZE / 2, -PIXEL_SIZE));
    let sensor2 = new Sensor(gyro, new Vector(PIXEL_SIZE / 2, PIXEL_SIZE));
    // wires sensor to opposite motor
    let motor1 = new Motor(gyro, new Vector(-PIXEL_SIZE / 2, -PIXEL_SIZE), [sensor2]);
    let motor2 = new Motor(gyro, new Vector(-PIXEL_SIZE / 2, PIXEL_SIZE), [sensor1]);
    let vehicle = new Vehicle(gyro, [sensor1, sensor2], [], [motor1, motor2]);
    return vehicle;
}

////////// AGGRESSIVE //////////
function Vehicle2b(u, x, y) {
    let gyro = new Gyro(u, x, y, θ);
    let sensor1 = new Sensor(gyro, new Vector(PIXEL_SIZE / 2, -PIXEL_SIZE));
    let sensor2 = new Sensor(gyro, new Vector(PIXEL_SIZE / 2, PIXEL_SIZE));
    // wires sensor to same motor
    let motor1 = new Motor(gyro, new Vector(-PIXEL_SIZE / 2, -PIXEL_SIZE), [sensor1]);
    let motor2 = new Motor(gyro, new Vector(-PIXEL_SIZE / 2, PIXEL_SIZE), [sensor2]);
    let vehicle = new Vehicle(gyro, [sensor1, sensor2], [], [motor1, motor2]);
    return vehicle;
}

////////// LUXURIOUS VEHICLE 1 //////////
function Vehicle2c(u, x, y) {
    let gyro = new Gyro(u, x, y, θ);
    let sensor1 = new Sensor(gyro, new Vector(PIXEL_SIZE / 2, -PIXEL_SIZE));
    let sensor2 = new Sensor(gyro, new Vector(PIXEL_SIZE / 2, PIXEL_SIZE));
    // wires sensors to both motors
    let motor1 = new Motor(gyro, new Vector(-PIXEL_SIZE / 2, -PIXEL_SIZE), [sensor1, sensor2]);
    let motor2 = new Motor(gyro, new Vector(-PIXEL_SIZE / 2, PIXEL_SIZE), [sensor1, sensor2]);
    let vehicle = new Vehicle(gyro, [sensor1, sensor2], [], [motor1, motor2]);
    return vehicle;
}
