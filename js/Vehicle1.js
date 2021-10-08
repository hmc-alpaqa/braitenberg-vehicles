function Vehicle1(u, x, y) {
    let gyro = new Gyro(u, x, y);
    let sensor = new Sensor(gyro, new Vector(0, -PIXEL_SIZE));
    // wires sensor to opposite motor
    let motorController = new MotorController(gyro, new Vector(0, 0), [sensor]);
    let motor = new Motor(gyro, new Vector(0, PIXEL_SIZE), motorController);
    let vehicle = new Robot1(gyro, [sensor], [motorController], [motor]);
    return vehicle;
}