function setup() {
    createCanvas(MAP_SIZE, MAP_SIZE);
    frameRate(FPS);
    rectMode(CENTER);
    angleMode(RADIANS);
    // gyro object contains x, y location and orientation
    // each sensor, controler, motor takes the gyro as a parameter to construct
    // robot object contains gyro, sensors, controlers, motors
    u = new Universe();
    g = new Gyro(u, 70, 110);
    addingRobot = false;

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
    renderers = [];
}

function draw() {
    background(220);
    // console.log(u)
    // draw a square for each cell in stimuli
    // console.log(u.stimuli)

    image(pg, 0, 0, MAP_SIZE, MAP_SIZE);
    if (renderers.length > 0) {
        renderers[0].renderText();

    }
    for (let renderer of renderers) {
        renderer.renderRobot();
    }
    for (let robot of u.robots) {
        robot.step(1 / FPS);
    }
}

function mouseClicked() {
    if (addingRobot) {
        console.log(mouseX, mouseY)
        let gyro = new Gyro(u, mouseX / PIXEL_SIZE, mouseY / PIXEL_SIZE);
        let sensor = new Sensor(gyro, new Vector(5, 5));
        let motorController = new MotorController(gyro, new Vector(0, 0), [sensor]);
        let motor = new Motor(gyro, new Vector(-5, -5), motorController);
        let robot = new Robot1(gyro, [sensor], [motorController], [motor]);
        renderers.push(new Renderer(robot));
        u.addRobot(robot);
    }
}

