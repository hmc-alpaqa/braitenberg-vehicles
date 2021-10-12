function Coward(u, x, y) {
    let gyro = new Gyro(u, x, y);
    let sensor1 = new Sensor(gyro, new Vector(PIXEL_SIZE / 2, -PIXEL_SIZE));
    let sensor2 = new Sensor(gyro, new Vector(PIXEL_SIZE / 2, PIXEL_SIZE));
    // wires sensor to opposite motor
    let motorController1 = new MotorController(gyro, new Vector(0, 0), [sensor2]);
    let motorController2 = new MotorController(gyro, new Vector(0, 0), [sensor1]);
    let motor1 = new Motor(gyro, new Vector(-PIXEL_SIZE / 2, -PIXEL_SIZE), motorController1);
    let motor2 = new Motor(gyro, new Vector(-PIXEL_SIZE / 2, PIXEL_SIZE), motorController2);
    let vehicle = new Vehicle(gyro, [sensor1, sensor2], [motorController1, motorController2], [motor1, motor2]);
    return vehicle;
}

function Aggressive(u, x, y) {
    let gyro = new Gyro(u, x, y);
    let sensor1 = new Sensor(gyro, new Vector(PIXEL_SIZE / 2, -PIXEL_SIZE));
    let sensor2 = new Sensor(gyro, new Vector(PIXEL_SIZE / 2, PIXEL_SIZE));
    // wires sensor to opposite motor
    let motorController1 = new MotorController(gyro, new Vector(0, 0), [sensor1]);
    let motorController2 = new MotorController(gyro, new Vector(0, 0), [sensor2]);
    let motor1 = new Motor(gyro, new Vector(-PIXEL_SIZE, -PIXEL_SIZE), motorController1);
    let motor2 = new Motor(gyro, new Vector(-PIXEL_SIZE, PIXEL_SIZE), motorController2);
    let vehicle = new Vehicle(gyro, [sensor1, sensor2], [motorController1, motorController2], [motor1, motor2]);
    return vehicle;
}