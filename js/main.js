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
    velocityFunction = x => 100 * (Math.sin(x) + 1);
    addingVehicle = Vehicles.NONE;
    addingSource = false;
    removingSource = false;
    removingVehicle = false;

    vehicleLocked = false;
    sourceLocked = false;
    selectedVehicle = null;
    selectedSource = null;
    xOffset = 0;
    yOffset = 0;

    vehicle3StartingVelocity = 250;
    sourceIntensity = 100;

    pg = createGraphics(MAP_LENGTH, MAP_HEIGHT);
    pg.background(0, 0, 256);
    pg.noStroke();
    colors = ["crimson", "mediumseagreen", "gold", "deepskyblue", "white", "mediumvioletred", "darkgreen", "indigo", "hotpink", "yellowgreen", "lightblue"]
    colorsIndex = 0;

    sensorGraphic = createGraphics(PIXEL_SIZE * SENSOR_SIZE * 2, PIXEL_SIZE * SENSOR_SIZE);
    Renderer.sensorGraphicSetup();
    motorGraphic = createGraphics(PIXEL_SIZE * MOTOR_SIZE, PIXEL_SIZE * MOTOR_SIZE);
    Renderer.motorGraphicSetup();
    vehicleGraphic = createGraphics(PIXEL_SIZE * (VEHICLE_SIZE + (2 * SENSOR_SIZE) + MOTOR_SIZE), PIXEL_SIZE * VEHICLE_SIZE);
    θ = 0;
    sourceRenderFactor = 4;
}

function draw() {
    background(220);
    // draw a square for each cell in stimuli
    translate(MAP_LENGTH/2, MAP_HEIGHT/2);
    image(pg, -MAP_LENGTH/2, -MAP_HEIGHT/2, MAP_LENGTH, MAP_HEIGHT);
    newMouseX = mouseX-MAP_LENGTH/2;
    newMouseY = mouseY-MAP_HEIGHT/2;
    if (u.vehicles.length > 0) {
        let mostRecentVehicle = u.vehicles[u.vehicles.length - 1]
        Renderer.renderData(mostRecentVehicle);
        Renderer.drawPath(mostRecentVehicle);
    }
    for (let vehicle of u.vehicles) {
        Renderer.renderVehicle(vehicle);
        if (Math.abs(vehicle.x) > 0.75*MAP_LENGTH/DEFAULT_PIXEL_SIZE || Math.abs(vehicle.y) > 0.75*MAP_HEIGHT/DEFAULT_PIXEL_SIZE) {
            u.vehicles.splice(u.vehicles.indexOf(vehicle), 1);
        }
        updateVehicleCensus();
    }

    for (let source of u.sources) {
        Renderer.renderSource(source);
    }

    if (!simulationPaused) {
        for (let vehicle of u.vehicles) {
            vehicle.step(SPEED / FPS);
        }
    }

    if (addingVehicle) {
        switch (addingVehicle) {
            case Vehicles.VEHICLE1:
                vehicle = Vehicle1(u, newMouseX / PIXEL_SIZE, newMouseY / PIXEL_SIZE, θ);
                Renderer.renderVehicle(vehicle);
                break;
            case Vehicles.VEHICLE2A:
                vehicle = Vehicle2a(u, newMouseX / PIXEL_SIZE, newMouseY / PIXEL_SIZE, θ);
                Renderer.renderVehicle(vehicle);
                break;
            case Vehicles.VEHICLE2B:
                vehicle = Vehicle2b(u, newMouseX / PIXEL_SIZE, newMouseY / PIXEL_SIZE, θ);
                Renderer.renderVehicle(vehicle);
                break;
            case Vehicles.VEHICLE2C:
                vehicle = Vehicle2c(u, newMouseX / PIXEL_SIZE, newMouseY / PIXEL_SIZE, θ);
                Renderer.renderVehicle(vehicle);
                break;
            case Vehicles.VEHICLE3A:
                vehicle = Vehicle3a(u, newMouseX / PIXEL_SIZE, newMouseY / PIXEL_SIZE, θ);
                Renderer.renderVehicle(vehicle);
                break;
            case Vehicles.VEHICLE3B:
                vehicle = Vehicle3b(u, newMouseX / PIXEL_SIZE, newMouseY / PIXEL_SIZE, θ);
                Renderer.renderVehicle(vehicle);
                break;
            case Vehicles.VEHICLE4A:
                vehicle = Vehicle4a(u, newMouseX / PIXEL_SIZE, newMouseY / PIXEL_SIZE, θ);
                Renderer.renderVehicle(vehicle);
                break;
            case Vehicles.VEHICLE4B:
                vehicle = Vehicle4b(u, newMouseX / PIXEL_SIZE, newMouseY / PIXEL_SIZE, θ);
                Renderer.renderVehicle(vehicle);
                break;
        }
    }

    if (keyIsPressed && (keyCode === RIGHT_ARROW)) {
        θ += 0.05;
    } else if (keyIsPressed && (keyCode === LEFT_ARROW)) {
        θ -= 0.05;
    }
}

function mouseWheel(event) {
    if (parseInt(zoomSlider.value) <= 400 && parseInt(zoomSlider.value) >= 50) {
        zoomSlider.value = parseInt(zoomSlider.value) + event.delta;
        zoomLabel.innerText = `Zoom ${zoomSlider.value}`;
        MAP_RESOLUTION = parseInt(zoomSlider.value);
        PIXEL_SIZE = MAP_LENGTH / MAP_RESOLUTION;
        Renderer.graphicsSetup();
        renderTerrain();
    }
}

function mouseClicked() {
    if (mouseX > 0 && mouseY > 0 && mouseX < MAP_LENGTH && mouseY < MAP_HEIGHT) {
        if (addingSource) {
            u.addSource(new Source(newMouseX / PIXEL_SIZE, newMouseY / PIXEL_SIZE, sourceIntensity));
        } else if (removingSource) {
            let source = u.getNearestSource(newMouseX / PIXEL_SIZE, newMouseY / PIXEL_SIZE);
            if (source != null) {
                u.removeSource(newMouseX / PIXEL_SIZE, newMouseY / PIXEL_SIZE, source);
            }
        } else if (removingVehicle) {
            let vehicle = u.getNearestVehicle(newMouseX / PIXEL_SIZE, newMouseY / PIXEL_SIZE);
            if (vehicle != null) {
                u.removeVehicle(newMouseX / PIXEL_SIZE, newMouseY / PIXEL_SIZE, vehicle);
            }
        } else if (addingVehicle != Vehicles.NONE) {
            let vehicle;
            switch (addingVehicle) {
                case Vehicles.NONE:
                    return;
                case Vehicles.VEHICLE1:
                    vehicle = Vehicle1(u, newMouseX / PIXEL_SIZE, newMouseY / PIXEL_SIZE, θ);
                    break;
                case Vehicles.VEHICLE2A:
                    vehicle = Vehicle2a(u, newMouseX / PIXEL_SIZE, newMouseY / PIXEL_SIZE, θ);
                    break;
                case Vehicles.VEHICLE2B:
                    vehicle = Vehicle2b(u, newMouseX / PIXEL_SIZE, newMouseY / PIXEL_SIZE, θ);
                    break;
                case Vehicles.VEHICLE2C:
                    vehicle = Vehicle2c(u, newMouseX / PIXEL_SIZE, newMouseY / PIXEL_SIZE, θ);
                    break;
                case Vehicles.VEHICLE3A:
                    vehicle = Vehicle3a(u, newMouseX / PIXEL_SIZE, newMouseY / PIXEL_SIZE, θ);
                    break;
                case Vehicles.VEHICLE3B:
                    vehicle = Vehicle3b(u, newMouseX / PIXEL_SIZE, newMouseY / PIXEL_SIZE, θ);
                    break;
                case Vehicles.VEHICLE4A:
                    vehicle = Vehicle4a(u, newMouseX / PIXEL_SIZE, newMouseY / PIXEL_SIZE, θ);
                    break;
                case Vehicles.VEHICLE4B:
                    vehicle = Vehicle4b(u, newMouseX / PIXEL_SIZE, newMouseY / PIXEL_SIZE, θ);
                    break;
            }
            u.addVehicle(vehicle);
            colorsIndex = (colorsIndex + 1) % colors.length;
        }
    }
}

function mousePressed() {
    if (!addingSource && !removingSource && !removingVehicle && addingVehicle == Vehicles.NONE) {
        let mousePos = new Vector(newMouseX / PIXEL_SIZE, newMouseY / PIXEL_SIZE)
        let nearestSourceDist = 1000000;
        let nearestVehicleDist = 1000000;
        if (u.sources.length > 0) {
            nearestSourceDist = (u.getNearestSource(mousePos.x, mousePos.y).r.subtract(mousePos)).getMagnitude();
        }
        if(u.vehicles.length > 0) {
            nearestVehicleDist = (u.getNearestVehicle(mousePos.x, mousePos.y).r.subtract(mousePos)).getMagnitude();
        }
        if ((nearestVehicleDist <= nearestSourceDist) && (u.getNearestVehicle(mousePos.x, mousePos.y != null))) {
            let vehicle = u.getNearestVehicle(mousePos.x, mousePos.y);
            if (u.overVehicle(mousePos.x, mousePos.y, vehicle)) {
                selectedVehicle = vehicle;
                vehicleLocked = true;
                sourceLocked = false;
                xOffset =  mousePos.x - selectedVehicle.x;
                yOffset = mousePos.y - selectedVehicle.y;
            } else {
                vehicleLocked = false;
                selectedVehicle = null;
            }
        } else if (u.getNearestSource(mousePos.x, mousePos.y) != null) {
            let source = u.getNearestSource(mousePos.x, mousePos.y);
            if (u.overSource(mousePos.x, mousePos.y, source)) {
                selectedSource = source;
                sourceLocked = true;
                vehicleLocked = false;
                xOffset =  mousePos.x - selectedSource.x;
                yOffset = mousePos.y - selectedSource.y;
            } else {
                sourceLocked = false;
                selectedSource = null;
            }
        }
    }
}

function mouseDragged() {
    if (vehicleLocked && selectedVehicle != null) {
        selectedVehicle.setX(newMouseX / PIXEL_SIZE - xOffset);
        selectedVehicle.setY(newMouseY / PIXEL_SIZE - yOffset);
    } else if (sourceLocked && selectedSource != null) {
        selectedSource.setX(newMouseX / PIXEL_SIZE - xOffset);
        selectedSource.setY(newMouseY / PIXEL_SIZE - yOffset);
        rerender();
    }
}

function mouseReleased() {
    vehicleLocked = false;
    selectedVehicle = null;
    selectedSource = null;
}

function generateTerrain() {
    u.stimuli = [];
    for (let y = -MAP_HEIGHT/2/PIXEL_SIZE; y < Math.floor(MAP_HEIGHT/2/PIXEL_SIZE); y++) {
        let row = [];
        for (let x = -MAP_LENGTH/2/PIXEL_SIZE; x < Math.floor(MAP_LENGTH/2/PIXEL_SIZE); x++) {
            row.push(u.getStimulus(x, y));
        }
        u.stimuli.push(row);
    }
}

function resetCanvas() {
    pg.fill(0, 0, 256);
    pg.rect(0, 0, MAP_LENGTH, MAP_HEIGHT);
}

function rerender() {
    resetCanvas();
    Renderer.graphicsSetup();
    generateTerrain();
    renderTerrain();
}

function renderTerrain() {
    for (let y = 0; y < u.stimuli.length; y+= Math.round(Math.sqrt(sourceRenderFactor))) {
        for (let x = 0; x < u.stimuli[y].length; x+= Math.round(Math.sqrt(sourceRenderFactor))) {
            let intensity = u.stimuli[y][x]
            let r, g, b;
            if (intensity <= 0.5) {
                r = 0;
                g = (-1024 * intensity) * (intensity-1);
                b = 256;
            } else {
                r = 256;
                g = (-1024 * intensity) * (intensity-1);
                b = 0;
            }
            pg.fill(r,g,b);
            pg.square(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE * sourceRenderFactor);
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
    pg.background(0, 0, 256);
    pg.noStroke();
}