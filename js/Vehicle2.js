function Coward(u, x, y) {
    let gyro = new Gyro(u, x, y);
    let sensor1 = new Sensor(gyro, new Vector(5, -10));
    let sensor2 = new Sensor(gyro, new Vector(5, 10));
    // wires sensor to opposite motor
    let motorController1 = new MotorController(gyro, new Vector(0, 0), [sensor2]);
    let motorController2 = new MotorController(gyro, new Vector(0, 0), [sensor1]);
    let motor1 = new Motor(gyro, new Vector(-5, -10), motorController1);
    let motor2 = new Motor(gyro, new Vector(-5, 10), motorController2);
    let robot = new Robot1(gyro, [sensor1, sensor2], [motorController1, motorController2], [motor1, motor2]);
    return robot;
}

function Aggressive(u, x, y) {
    let gyro = new Gyro(u, x, y);
    let sensor1 = new Sensor(gyro, new Vector(5, -10));
    let sensor2 = new Sensor(gyro, new Vector(5, 10));
    // wires sensor to opposite motor
    let motorController1 = new MotorController(gyro, new Vector(0, 0), [sensor1]);
    let motorController2 = new MotorController(gyro, new Vector(0, 0), [sensor2]);
    let motor1 = new Motor(gyro, new Vector(-5, -10), motorController1);
    let motor2 = new Motor(gyro, new Vector(-5, 10), motorController2);
    let robot = new Robot1(gyro, [sensor1, sensor2], [motorController1, motorController2], [motor1, motor2]);
    return robot;
}