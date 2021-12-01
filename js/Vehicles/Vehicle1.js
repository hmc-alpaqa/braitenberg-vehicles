function Vehicle1(u, x, y, θ) {
    let gyro = new Gyro(u, x, y, θ, Vehicles.VEHICLE1);
    let sensor = new Sensor(gyro, new Vector(0, -PIXEL_SIZE));
    // wires sensor to opposite motor
    let motor = new Motor(gyro, new Vector(0, PIXEL_SIZE), [sensor]);
    let vehicle = new Vehicle(gyro, [sensor], [], [motor]);
    return vehicle;
}