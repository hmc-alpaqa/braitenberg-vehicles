////////// LOVE //////////
function Vehicle3a(u, x, y) {
    let gyro = new Gyro(u, x, y, θ, Vehicles.VEHICLE3A);
    let sensor1 = new Sensor(gyro, new Vector(1, -2));
    let sensor2 = new Sensor(gyro, new Vector(1, 2));
    // wires sensor to same inhibitor
    let inhibitor1 = new Inhibitor(gyro, new Vector(-1, -2), [sensor2], -1, vehicle3StartingVelocity);
    let inhibitor2 = new Inhibitor(gyro, new Vector(-1, 2), [sensor1], -1, vehicle3StartingVelocity);
    let vehicle = new Vehicle(gyro, [sensor1, sensor2], [], [inhibitor1, inhibitor2]);
    return vehicle;
}

////////// EXPLORER //////////
function Vehicle3b(u, x, y) {
    let gyro = new Gyro(u, x, y, θ, Vehicles.VEHICLE3B);
    let sensor1 = new Sensor(gyro, new Vector(1, -2));
    let sensor2 = new Sensor(gyro, new Vector(1, 2));
    // wires sensor to same inhibitor
    let inhibitor1 = new Inhibitor(gyro, new Vector(-1, -2), [sensor1], -1, vehicle3StartingVelocity);
    let inhibitor2 = new Inhibitor(gyro, new Vector(-1, 2), [sensor2], -1, vehicle3StartingVelocity);
    let vehicle = new Vehicle(gyro, [sensor1, sensor2], [], [inhibitor1, inhibitor2]);
    return vehicle;
}