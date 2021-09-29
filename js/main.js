function setup() {
    createCanvas(MAP_SIZE, MAP_SIZE);
    frameRate(FPS);
    rectMode(CENTER);
    angleMode(RADIANS);
    // gyro object contains x, y location and orientation
    // each sensor, controler, motor takes the gyro as a parameter to construct
    // robot object contains gyro, sensors, controlers, motors
    u = new Universe();
    g = new Gyro(u);
    sensors = [new Sensor(g, new Vector(10, -5))]
    motorcontrollers = [(new MotorController(g, new Vector(0, 0))).addSensor(sensors[0])]
    motors = [(new Motor(g, new Vector(-5, 5))).setMotorController(motorcontrollers[0])]

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
    renderer = new Renderer(r);
}

function draw() {
    background(220);
    // console.log(u)
    // draw a square for each cell in stimuli
    // console.log(u.stimuli)

    image(pg, 0, 0, MAP_SIZE, MAP_SIZE);

    renderer.renderAll()
    r.step(1 / FPS);
}

