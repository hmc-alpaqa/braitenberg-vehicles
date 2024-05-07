////////// LOVE //////////
class Vehicle3a extends Vehicle {
    constructor(gyro, id) {
        let sensor1 = new Sensor(gyro, new Vector(1, -2));
        let sensor2 = new Sensor(gyro, new Vector(1, 2));
        // wires sensor to same inhibitor
        let inhibitor1 = new Inhibitor(gyro, new Vector(-1, -2), [sensor2], -1, vehicle3StartingVelocity);
        let inhibitor2 = new Inhibitor(gyro, new Vector(-1, 2), [sensor1], -1, vehicle3StartingVelocity);
        super(gyro, Vehicles.VEHICLE3A, id, [sensor1, sensor2], [inhibitor1, inhibitor2]);
    }
}

////////// EXPLORER //////////
class Vehicle3b extends Vehicle {
    constructor(gyro, id) {
        let sensor1 = new Sensor(gyro, new Vector(1, -2));
        let sensor2 = new Sensor(gyro, new Vector(1, 2));
        // wires sensor to same inhibitor
        let inhibitor1 = new Inhibitor(gyro, new Vector(-1, -2), [sensor1], -1, vehicle3StartingVelocity);
        let inhibitor2 = new Inhibitor(gyro, new Vector(-1, 2), [sensor2], -1, vehicle3StartingVelocity);
        super(gyro, Vehicles.VEHICLE3B, id, [sensor1, sensor2], [inhibitor1, inhibitor2]);
    }
}