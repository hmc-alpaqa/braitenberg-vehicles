////////// LOVE //////////
function Vehicle3a(gyro, id) {
    let sensor1 = new Sensor(gyro, new Vector(1, -2));
    let sensor2 = new Sensor(gyro, new Vector(1, 2));
    // wires sensor to same inhibitor
    let inhibitor1 = new Inhibitor(gyro, new Vector(-1, -2), [sensor2], -1, vehicle3StartingVelocity);
    let inhibitor2 = new Inhibitor(gyro, new Vector(-1, 2), [sensor1], -1, vehicle3StartingVelocity);
    let vehicle = new Vehicle(gyro, Vehicles.VEHICLE3A, id, [sensor1, sensor2], [], [inhibitor1, inhibitor2]);
    return vehicle;
}

////////// EXPLORER //////////
function Vehicle3b(gyro) {
    let sensor1 = new Sensor(gyro, new Vector(1, -2));
    let sensor2 = new Sensor(gyro, new Vector(1, 2));
    // wires sensor to same inhibitor
    let inhibitor1 = new Inhibitor(gyro, new Vector(-1, -2), [sensor1], -1, vehicle3StartingVelocity);
    let inhibitor2 = new Inhibitor(gyro, new Vector(-1, 2), [sensor2], -1, vehicle3StartingVelocity);
    let vehicle = new Vehicle(gyro, Vehicles.VEHICLE3B, id, [sensor1, sensor2], [], [inhibitor1, inhibitor2]);
    return vehicle;
}