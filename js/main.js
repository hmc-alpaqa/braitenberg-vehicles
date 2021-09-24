function setup() {
    createCanvas(MAP_SIZE, MAP_SIZE);
    frameRate(FPS)
    // gyro object contains x, y location and orientation
    // each sensor, controler, motor takes the gyro as a parameter to construct
    // robot object contains gyro, sensors, controlers, motors
    u = new Universe();
    g = new Gyro(u);
    sensors = [new Sensor(g, 5, 0)]
    motorcontrollers = [(new MotorController(g, 0, 0)).addSensor(sensors[0])]
    motors = [(new Motor(g, -5, 0)).setMotorController(motorcontrollers[0])]

    r = new Robot1(g, sensors, motorcontrollers, motors);

    pg = createGraphics(MAP_SIZE, MAP_SIZE);
    pg.background(220);
    pg.noStroke();
    for (y = 0; y < u.stimuli.length; y++) {
        for (x = 0; x < u.stimuli[y].length; x++) {
            // console.log(u.stimuli[i][j])
            pg.square(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE);
            pg.fill(255 + 256 * u.stimuli[y][x], 255 - 256 * abs(u.stimuli[y][x]), 190 - 256 * u.stimuli[y][x])

        }
    }

}

function draw() {
    background(220);
    // console.log(u)
    // draw a square for each cell in stimuli
    // console.log(u.stimuli)

    image(pg, 0, 0, MAP_SIZE, MAP_SIZE);

    renderRobot(r);
    renderText(r);
    r.move(1 / FPS);

    
}

function renderRobot(robot) {
    // noStroke()
    fill(225, 225, 225);
    // render the body of the robot so that it is positioned at the center of the gyro
    square(
        robot.gyro.x * PIXEL_SIZE - ROBOT_SIZE / 2, // the - ROBOT_SIZE / 2 is to center the robot in the center of the gyro rather than draw the upper left corner at the center of the gyro
        robot.gyro.y * PIXEL_SIZE - ROBOT_SIZE / 2,
        ROBOT_SIZE
    );
    renderSensors(robot);
    renderMotors(robot);
}

function renderSensors(robot) {
    for (i = 0; i < robot.sensors.length; i++) {
        fill(0, 225, 0);
        square(
            robot.sensors[i].getX() * PIXEL_SIZE - SENSOR_SIZE / 2,
            robot.sensors[i].getY() * PIXEL_SIZE - SENSOR_SIZE / 2,
            SENSOR_SIZE);
    }
}

function renderMotors(robot) {
    for (i = 0; i < robot.motors.length; i++) {
        fill(0, 0, 225);
        square(
            robot.motors[i].getX() * PIXEL_SIZE - SENSOR_SIZE / 2,
            robot.motors[i].getY() * PIXEL_SIZE - SENSOR_SIZE / 2,
            SENSOR_SIZE);
    }
}

function renderText(robot) {
    text('x: ' + robot.gyro.x.toFixed(2), 10, 10)
    text('y: ' + robot.gyro.y.toFixed(2), 10, 30)
    text('vx: ' + robot.gyro.vx.toFixed(2), 80, 10)
    text('vy: ' + robot.gyro.vy.toFixed(2), 80, 30)

}