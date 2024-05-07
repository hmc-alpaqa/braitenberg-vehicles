////////// COWARD //////////
class Vehicle2a extends Vehicle {
    constructor(gyro, id) {
        let sensor1 = new Sensor(gyro, new Vector(1, -2));
        let sensor2 = new Sensor(gyro, new Vector(1, 2));
        // wires sensor to opposite motor
        let motor1 = new Motor(gyro, new Vector(-1, -2), [sensor2]);
        let motor2 = new Motor(gyro, new Vector(-1, 2), [sensor1]);
        super(gyro, Vehicles.VEHICLE2A, id, [sensor1, sensor2], [motor1, motor2]);
    }
}

////////// AGGRESSIVE //////////
class Vehicle2b extends Vehicle {
    constructor(gyro, id) {
        let sensor1 = new Sensor(gyro, new Vector(1, -2));
        let sensor2 = new Sensor(gyro, new Vector(1, 2));
        // wires sensor to same motor
        let motor1 = new Motor(gyro, new Vector(-1, -2), [sensor1]);
        let motor2 = new Motor(gyro, new Vector(-1, 2), [sensor2]);
        super(gyro, Vehicles.Vehicle2B, id, [sensor1, sensor2], [motor1, motor2]);
    }
}

////////// LUXURIOUS VEHICLE 1 //////////
class Vehicle2c extends Vehicle {
    constructor(gyro, id) {
        let sensor1 = new Sensor(gyro, new Vector(1, -2));
        let sensor2 = new Sensor(gyro, new Vector(1, 2));
        // wires sensors to both motors
        let motor1 = new Motor(gyro, new Vector(-1, -2), [sensor1, sensor2]);
        let motor2 = new Motor(gyro, new Vector(-1, 2), [sensor1, sensor2]);
        super(gyro, Vehicles.Vehicle2C, id, [sensor1, sensor2], [motor1, motor2]);
    }
}