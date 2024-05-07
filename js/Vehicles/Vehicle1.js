class Vehicle1 extends Vehicle {
    constructor(gyro, id) {
        let sensor = new Sensor(gyro, new Vector(0, 2));
        let motor = new Motor(gyro, new Vector(0, -2), [sensor]);
        super(gyro, Vehicles.VEHICLE1, id, [sensor], [motor]);
    }
}