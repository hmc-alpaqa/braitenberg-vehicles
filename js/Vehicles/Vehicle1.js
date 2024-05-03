function Vehicle1(gyro, id) {
    let sensor = new Sensor(gyro, new Vector(2, 0));
    // wires sensor to opposite motor
    let motor = new Motor(gyro, new Vector(-2, 0), [sensor]);
    let vehicle = new Vehicle(gyro, Vehicles.VEHICLE1, id, [sensor], [], [motor]);
    return vehicle;
}