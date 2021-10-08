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
    addingVehicle = Vehicles.VEHICLE1;
    updateFriction(document.getElementById("friction-slider").value);

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
    // draw a square for each cell in stimuli
    image(pg, 0, 0, MAP_SIZE, MAP_SIZE);
    if (renderers.length > 0) {
        renderers[renderers.length - 1].renderText();
    }
    for (let renderer of renderers) {
        renderer.renderRobot();
    }
    if (!simulationPaused) {
        for (let robot of u.robots) {
            robot.step(1 / FPS);
        }
    }
}

function mouseClicked() {
    let vehicle;
    if (mouseX > 0 && mouseY > 0) {
        switch (addingVehicle) {
            case Vehicles.VEHICLE1:
                vehicle = Vehicle1(u, mouseX / PIXEL_SIZE, mouseY / PIXEL_SIZE);
                break;
            case Vehicles.VEHICLE2A:
                vehicle = Coward(u, mouseX / PIXEL_SIZE, mouseY / PIXEL_SIZE);
                break;
            case Vehicles.VEHICLE2B:
                vehicle = Aggressive(u, mouseX / PIXEL_SIZE, mouseY / PIXEL_SIZE);
                break;
        }
        renderers.push(new Renderer(vehicle));
        u.addRobot(vehicle);
    }
}

