////////// INSTINCTS //////////
function Vehicle4a(u, x, y) {
    let gyro = new Gyro(u, x, y, θ);
    let sensor1 = new Sensor(gyro, new Vector(PIXEL_SIZE / 2, -PIXEL_SIZE));
    let sensor2 = new Sensor(gyro, new Vector(PIXEL_SIZE / 2, PIXEL_SIZE));
    // wires sensor to same motor
    let motorController1 = new MotorController(gyro, new Vector(-PIXEL_SIZE / 2, -PIXEL_SIZE), [sensor1], velocityFunction);
    let motorController2 = new MotorController(gyro, new Vector(-PIXEL_SIZE / 2, -PIXEL_SIZE), [sensor2], velocityFunction);
    let motor1 = new Motor(gyro, new Vector(-PIXEL_SIZE / 2, -PIXEL_SIZE), [motorController1]);
    let motor2 = new Motor(gyro, new Vector(-PIXEL_SIZE / 2, PIXEL_SIZE), [motorController2]);
    let vehicle = new Vehicle(gyro, [sensor1, sensor2], [motorController1, motorController2], [motor1, motor2]);
    return vehicle;
}