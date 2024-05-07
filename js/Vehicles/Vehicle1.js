class Vehicle1 extends Vehicle {
    constructor(gyro, id) {
        let sensors = [new Sensor(gyro, new Vector(0, 2))];
        let motorControllers = [];
        let motors = [new Motor(gyro, new Vector(0, -2), sensors)];
        super(gyro, Vehicles.VEHICLE1, id, sensors, motorControllers, motors);
    }
}