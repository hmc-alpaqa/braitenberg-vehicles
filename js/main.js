function setup() {
    canvas = createCanvas(MAP_LENGTH, MAP_HEIGHT);
    canvas.parent("canvas");
    frameRate(FPS);
    ellipseMode(CENTER);
    rectMode(CENTER);
    angleMode(RADIANS);
    // gyro object contains x, y location and orientation
    // each sensor, controller, motor takes the gyro as a parameter to construct
    // Vehicle object contains gyro, sensors, controllers, motors
    u = new Universe();
    velocityFunction = x => 100*(Math.sin(x) + 1);
    addingVehicle = Vehicles.NONE;
    addingSource = false;
    removingSource = false;
    vehicle3StartingVelocity = 250;
    sourceIntensity = 100;

    pg = createGraphics(MAP_LENGTH, MAP_HEIGHT);
    pg.background(120);
    pg.noStroke();

    sensorGraphic = createGraphics(PIXEL_SIZE * SENSOR_SIZE * 2, PIXEL_SIZE * SENSOR_SIZE);
    Renderer.sensorGraphicSetup();
    motorGraphic = createGraphics(PIXEL_SIZE * MOTOR_SIZE, PIXEL_SIZE * MOTOR_SIZE);
    Renderer.motorGraphicSetup();
    vehicleGraphic = createGraphics(PIXEL_SIZE * (VEHICLE_SIZE + (2 * SENSOR_SIZE) + MOTOR_SIZE), PIXEL_SIZE * VEHICLE_SIZE);
    θ = 0;
}

function draw() {
    background(220);
    // draw a square for each cell in stimuli
    image(pg, 0, 0, MAP_LENGTH, MAP_HEIGHT);
    if (u.vehicles.length > 0) {
        let mostRecentVehicle = u.vehicles[u.vehicles.length - 1]
        Renderer.renderData(mostRecentVehicle);
        Renderer.drawPath(mostRecentVehicle);
    }
    for (let vehicle of u.vehicles) {
        Renderer.renderVehicle(vehicle);
        // Renderer.drawPath(vehicle);
        if (vehicle.gyro.r.getMagnitude() > 2048) {
            u.removeVehicle(vehicle);
        }
    }

    for (let source of u.sources) {
        Renderer.renderSource(source);
    }

    if (!simulationPaused) {
        for (let vehicle of u.vehicles) {
            vehicle.step(1 / FPS);
        }
    }

    if (addingVehicle) {
        switch (addingVehicle) {
            case Vehicles.VEHICLE1:
                vehicle = Vehicle1(u, mouseX / PIXEL_SIZE, mouseY / PIXEL_SIZE, θ);
                Renderer.renderVehicle(vehicle);
                break;
            case Vehicles.VEHICLE2A:
                vehicle = Vehicle2a(u, mouseX / PIXEL_SIZE, mouseY / PIXEL_SIZE, θ);
                Renderer.renderVehicle(vehicle);
                break;
            case Vehicles.VEHICLE2B:
                vehicle = Vehicle2b(u, mouseX / PIXEL_SIZE, mouseY / PIXEL_SIZE, θ);
                Renderer.renderVehicle(vehicle);
                break;
            case Vehicles.VEHICLE2C:
                vehicle = Vehicle2c(u, mouseX / PIXEL_SIZE, mouseY / PIXEL_SIZE, θ);
                Renderer.renderVehicle(vehicle);
                break;
            case Vehicles.VEHICLE3A:
                vehicle = Vehicle3a(u, mouseX / PIXEL_SIZE, mouseY / PIXEL_SIZE, θ);
                Renderer.renderVehicle(vehicle);
                break;
            case Vehicles.VEHICLE3B:
                vehicle = Vehicle3b(u, mouseX / PIXEL_SIZE, mouseY / PIXEL_SIZE, θ);
                Renderer.renderVehicle(vehicle);
                break;
            case Vehicles.VEHICLE4A:
                vehicle = Vehicle4a(u, mouseX / PIXEL_SIZE, mouseY / PIXEL_SIZE, θ);
                Renderer.renderVehicle(vehicle);
                break;
        }
    }

    if (keyIsPressed && (keyCode === RIGHT_ARROW) && zoomSlider.value < 200) {
        θ += 0.05;
    } else if (keyIsPressed && (keyCode === LEFT_ARROW)) {
        θ -= 0.05;
    }
}

function mouseWheel(event) {
    if (parseInt(zoomSlider.value) <= 200 && parseInt(zoomSlider.value) >= 50) {
        zoomSlider.value = parseInt(zoomSlider.value) + event.delta;
        zoomLabel.innerText = `Zoom ${zoomSlider.value}`;
        MAP_RESOLUTION = parseInt(zoomSlider.value);
        PIXEL_SIZE = MAP_LENGTH / MAP_RESOLUTION;
        Renderer.graphicsSetup();
    }
}

function mouseClicked() {
    let vehicle;
    if (mouseX > 0 && mouseY > 0 && mouseX < MAP_LENGTH && mouseY < MAP_HEIGHT) {
        if (addingSource) {
            u.addSource(new Source(mouseX / PIXEL_SIZE, mouseY / PIXEL_SIZE, sourceIntensity));
            generateTerrain();
            renderTerrain();
        } else if (removingSource) {
            let source = u.getSource(mouseX / PIXEL_SIZE, mouseY / PIXEL_SIZE);
            if (source) {
                u.removeSource(source);
                generateTerrain();
                renderTerrain();
            }
        } else {
            switch (addingVehicle) {
                case Vehicles.NONE:
                    return;
                case Vehicles.VEHICLE1:
                    vehicle = Vehicle1(u, mouseX / PIXEL_SIZE, mouseY / PIXEL_SIZE, θ);
                    break;
                case Vehicles.VEHICLE2A:
                    vehicle = Vehicle2a(u, mouseX / PIXEL_SIZE, mouseY / PIXEL_SIZE, θ);
                    break;
                case Vehicles.VEHICLE2B:
                    vehicle = Vehicle2b(u, mouseX / PIXEL_SIZE, mouseY / PIXEL_SIZE, θ);
                    break;
                case Vehicles.VEHICLE2C:
                    vehicle = Vehicle2c(u, mouseX / PIXEL_SIZE, mouseY / PIXEL_SIZE, θ);
                    break;
                case Vehicles.VEHICLE3A:
                    vehicle = Vehicle3a(u, mouseX / PIXEL_SIZE, mouseY / PIXEL_SIZE, θ);
                    break;
                case Vehicles.VEHICLE3B:
                    vehicle = Vehicle3b(u, mouseX / PIXEL_SIZE, mouseY / PIXEL_SIZE, θ);
                    break;
                case Vehicles.VEHICLE4A:
                    vehicle = Vehicle4a(u, mouseX / PIXEL_SIZE, mouseY / PIXEL_SIZE, θ);
                    break;
            }
            u.addVehicle(vehicle);
        }
    }
}

function generateTerrain() {
    for (let y = 0; y < MAP_RESOLUTION; y++) {
        for (let x = 0; x < MAP_RESOLUTION / ASPECT_RATIO; x++) {
            u.stimuli[y][x] = u.getStimulus(x, y);
        }
    }
}

function renderTerrain() {
    for (let y = 0; y < u.stimuli.length; y++) {
        for (let x = 0; x < u.stimuli[y].length; x++) {
            pg.fill(255 + 256 * u.stimuli[y][x], 255 - 256 * abs(u.stimuli[y][x]), 190 - 256 * u.stimuli[y][x])
            pg.square(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE);
        }
    }
}

function resetUniverse() {
    u.vehicles = [];
    u.sources = [];
    renderers = [];
    simulationPaused = true;
    u.stimuli = [];
    for (let i = 0; i < MAP_RESOLUTION; i++) {
        let row = []
        for (let j = 0; j < MAP_RESOLUTION; j++) {
            row.push(0);
        }
        u.stimuli.push(row);
    }
    pg.background(120);
    pg.noStroke();
}