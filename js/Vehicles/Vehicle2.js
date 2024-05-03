////////// COWARD //////////
function Vehicle2a(gyro, id) {
    let sensor1 = new Sensor(gyro, new Vector(1, -2));
    let sensor2 = new Sensor(gyro, new Vector(1, 2));
    // wires sensor to opposite motor
    let motor1 = new Motor(gyro, new Vector(-1, -2), [sensor2]);
    let motor2 = new Motor(gyro, new Vector(-1, 2), [sensor1]);
    let vehicle = new Vehicle(gyro, Vehicles.VEHICLE2A, id, [sensor1, sensor2], [], [motor1, motor2]);
    return vehicle;
}

////////// AGGRESSIVE //////////
function Vehicle2b(gyro, id) {
    let sensor1 = new Sensor(gyro, new Vector(1, -2));
    let sensor2 = new Sensor(gyro, new Vector(1, 2));
    // wires sensor to same motor
    let motor1 = new Motor(gyro, new Vector(-1, -2), [sensor1]);
    let motor2 = new Motor(gyro, new Vector(-1, 2), [sensor2]);
    let vehicle = new Vehicle(gyro, Vehicles.VEHICLE2B, id, [sensor1, sensor2], [], [motor1, motor2]);
    return vehicle;
}

////////// LUXURIOUS VEHICLE 1 //////////
function Vehicle2c(gyro, id) {
    let sensor1 = new Sensor(gyro, new Vector(1, -2));
    let sensor2 = new Sensor(gyro, new Vector(1, 2));
    // wires sensors to both motors
    let motor1 = new Motor(gyro, new Vector(-1, -2), [sensor1, sensor2]);
    let motor2 = new Motor(gyro, new Vector(-1, 2), [sensor1, sensor2]);
    let vehicle = new Vehicle(gyro, Vehicles.VEHICLE2C, id, [sensor1, sensor2], [], [motor1, motor2]);
    return vehicle;
}
