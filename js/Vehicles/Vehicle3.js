////////// LOVE //////////
function Vehicle3a(u, x, y) {
    let gyro = new Gyro(u, x, y, θ);
    let sensor1 = new Sensor(gyro, new Vector(PIXEL_SIZE / 2, -PIXEL_SIZE));
    let sensor2 = new Sensor(gyro, new Vector(PIXEL_SIZE / 2, PIXEL_SIZE));
    // wires sensor to same inhibitor
    let inhibitor1 = new Inhibitor(gyro, new Vector(-PIXEL_SIZE / 2, -PIXEL_SIZE), [sensor2], -1, 300);
    let inhibitor2 = new Inhibitor(gyro, new Vector(-PIXEL_SIZE / 2, PIXEL_SIZE), [sensor1], -1, 300);
    let vehicle = new Vehicle(gyro, [sensor1, sensor2], [], [inhibitor1, inhibitor2]);
    return vehicle;
}