////////// COWARD //////////
function Vehicle2a(u, x, y) {
    let gyro = new Gyro(u, x, y, θ, Vehicles.VEHICLE2A);
    let sensor1 = new Sensor(gyro, new Vector(1, -2));
    let sensor2 = new Sensor(gyro, new Vector(1, 2));
    // wires sensor to opposite motor
    let motor1 = new Motor(gyro, new Vector(-1, -2), [sensor2]);
    let motor2 = new Motor(gyro, new Vector(-1, 2), [sensor1]);
    let vehicle = new Vehicle(gyro, [sensor1, sensor2], [], [motor1, motor2]);
    return vehicle;
}

////////// AGGRESSIVE //////////
function Vehicle2b(u, x, y) {
    let gyro = new Gyro(u, x, y, θ, Vehicles.VEHICLE2B);
    let sensor1 = new Sensor(gyro, new Vector(1, -2));
    let sensor2 = new Sensor(gyro, new Vector(1, 2));
    // wires sensor to same motor
    let motor1 = new Motor(gyro, new Vector(-1, -2), [sensor1]);
    let motor2 = new Motor(gyro, new Vector(-1, 2), [sensor2]);
    let vehicle = new Vehicle(gyro, [sensor1, sensor2], [], [motor1, motor2]);
    return vehicle;
}

////////// LUXURIOUS VEHICLE 1 //////////
function Vehicle2c(u, x, y) {
    let gyro = new Gyro(u, x, y, θ, Vehicles.VEHICLE2C);
    let sensor1 = new Sensor(gyro, new Vector(1, -2));
    let sensor2 = new Sensor(gyro, new Vector(1, 2));
    // wires sensors to both motors
    let motor1 = new Motor(gyro, new Vector(-1, -2), [sensor1, sensor2]);
    let motor2 = new Motor(gyro, new Vector(-1, 2), [sensor1, sensor2]);
    let vehicle = new Vehicle(gyro, [sensor1, sensor2], [], [motor1, motor2]);
    return vehicle;
}
