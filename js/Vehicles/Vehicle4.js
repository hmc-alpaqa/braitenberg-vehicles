class Vehicle4 extends Vehicle {
    constructor(gyro, name, id, velocityFunction) {
        let sensor1 = new Sensor(gyro, new Vector(1, -2));
        let sensor2 = new Sensor(gyro, new Vector(1, 2));
        let motorController1 = new MotorController(gyro, new Vector(-1, -2), [sensor1], velocityFunction);
        let motorController2 = new MotorController(gyro, new Vector(-1, -2), [sensor2], velocityFunction);
        let motor1 = new Motor(gyro, new Vector(-1, -2), [motorController1]);
        let motor2 = new Motor(gyro, new Vector(-1, 2), [motorController2]);
        super(gyro, name, id, [sensor1, sensor2], [motor1, motor2], [motorController1, motorController2]);
    }
}

////////// INSTINCTS //////////
class Vehicle4a extends Vehicle4 {
    constructor(gyro, id, velocityFunction) {
        super(gyro, Vehicles.VEHICLE4A, id, velocityFunction);
    }
}

////////// WILL //////////
class Vehicle4b extends Vehicle4 {
    constructor(gyro, id, velocityFunction) {
        super(gyro, Vehicles.VEHICLE4B, id, velocityFunction);
    }
}