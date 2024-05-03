////////// INSTINCTS //////////
function Vehicle4a(gyro, id) {
    let sensor1 = new Sensor(gyro, new Vector(1, -2));
    let sensor2 = new Sensor(gyro, new Vector(1, 2));
    // wires sensor to same motor
    let motorController1 = new MotorController(gyro, new Vector(-1, -2), [sensor1], velocityFunction);
    let motorController2 = new MotorController(gyro, new Vector(-1, -2), [sensor2], velocityFunction);
    let motor1 = new Motor(gyro, new Vector(-1, -2), [motorController1]);
    let motor2 = new Motor(gyro, new Vector(-1, 2), [motorController2]);
    let vehicle = new Vehicle(gyro, Vehicles.VEHICLE4A, id, [sensor1, sensor2], [motorController1, motorController2], [motor1, motor2]);
    return vehicle;
}

////////// WILL //////////
function Vehicle4b(gyro, id) {
    let sensor1 = new Sensor(gyro, new Vector(1, -2));
    let sensor2 = new Sensor(gyro, new Vector(1, 2));
    // wires sensor to same motor
    let motorController1 = new MotorController(gyro, new Vector(-1, -2), [sensor1], velocityFunction);
    let motorController2 = new MotorController(gyro, new Vector(-1, -2), [sensor2], velocityFunction);
    let motor1 = new Motor(gyro, new Vector(-1, -2), [motorController1]);
    let motor2 = new Motor(gyro, new Vector(-1, 2), [motorController2]);
    let vehicle = new Vehicle(gyro, Vehicles.VEHICLE4B, id, [sensor1, sensor2], [motorController1, motorController2], [motor1, motor2]);
    return vehicle;
}