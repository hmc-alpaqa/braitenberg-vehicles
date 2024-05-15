const u = new Universe();

let pg;
const colors = ["crimson", "mediumseagreen", "gold", "deepskyblue", "white", "mediumvioletred", "darkgreen", "indigo", "hotpink", "yellowgreen", "lightblue"];
let sourceRenderFactor = 4;
let colorsIndex = 0;

let velocityFunction = VELOCITY_FUNCTIONS["sinusoidal"];
let vehicleId = 0;
let currentAction = Actions.NONE;
let addingVehicle = Vehicles.NONE;

let showingVehicleTracker = false;
let vehicleLocked = false;
let sourceLocked = false;
let selectedVehicle = null;
let selectedSource = null;
let xOffset = 0;
let yOffset = 0;
let theta = 0;

let vehicle3StartingVelocity = 250;
let sourceIntensity = 100;

let drawMode = false;

let vehicleColorPickerDisplay;
let sensorGraphic;
let motorGraphic;
let vehicleGraphic;

function setup() {
    const canvas = createCanvas(MAP_LENGTH, MAP_HEIGHT);
    canvas.parent("canvas");
    frameRate(FPS);
    ellipseMode(CENTER);
    rectMode(CENTER);
    angleMode(RADIANS);
    vehicleColorPickerDisplay = select("#vehicle-color-picker");

    pg = createGraphics(MAP_LENGTH, MAP_HEIGHT);
    pg.background(0, 0, 256);
    pg.noStroke();

    sensorGraphic = createGraphics(PIXEL_SIZE * SENSOR_SIZE * 2, PIXEL_SIZE * SENSOR_SIZE);
    Renderer.sensorGraphicSetup();
    motorGraphic = createGraphics(PIXEL_SIZE * MOTOR_SIZE, PIXEL_SIZE * MOTOR_SIZE);
    Renderer.motorGraphicSetup();
    vehicleGraphic = createGraphics(PIXEL_SIZE * (VEHICLE_SIZE + (2 * SENSOR_SIZE) + MOTOR_SIZE), PIXEL_SIZE * VEHICLE_SIZE);
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
        if (!drawMode) {
            Renderer.drawTrailingPath(mostRecentVehicle);
        }
    }
    
    for (vehicle of u.vehicles) {
        u.paths.set(vehicle.id, vehicle.path);
        u.speeds.set(vehicle.id, vehicle.speeds);
        u.colors.set(vehicle.id, vehicle.colors);
    }

    if (drawMode) {
        renderPaths();
    }
    for (let vehicle of u.vehicles) {
        Renderer.renderVehicle(vehicle);
        if (Math.abs(vehicle.x) > 0.75*MAP_LENGTH/DEFAULT_PIXEL_SIZE || Math.abs(vehicle.y) > 0.75*MAP_HEIGHT/DEFAULT_PIXEL_SIZE) {
            u.vehicles.splice(u.vehicles.indexOf(vehicle), 1);
        }
        updateVehicleCensus();
        if (showingVehicleTracker) {
            updateVehicleTracker();
        }
    }

    for (let source of u.sources) {
        Renderer.renderSource(source);
    }

    if (!simulationPaused) {
        for (let vehicle of u.vehicles) {
            vehicle.step(SPEED / FPS);
        }
    }

    if (addingVehicle != Vehicles.NONE) {
        let gyro = new Gyro(u, newMouseX / PIXEL_SIZE, newMouseY / PIXEL_SIZE, theta);
        if (addingVehicle != Vehicles.VEHICLE4A && addingVehicle != Vehicles.VEHICLE4B) {
            eval(`vehicle = new Vehicle${addingVehicle}(gyro, id=vehicleId);`);
        } else {
            eval(`vehicle = new Vehicle${addingVehicle}(gyro, id=vehicleId, velocityFunction);`)
        }
        Renderer.renderVehicle(vehicle);
    }

    if (keyIsPressed && (keyCode === RIGHT_ARROW)) {
        theta += 0.05;
    } else if (keyIsPressed && (keyCode === LEFT_ARROW)) {
        theta -= 0.05;
    }
}

function mouseClicked() {
    if (mouseX > 0 && mouseY > 0 && mouseX < MAP_LENGTH && mouseY < MAP_HEIGHT) {
        let source;
        switch (currentAction) {
            case Actions.ADDING_SOURCE:
                u.addSource(new Source(newMouseX / PIXEL_SIZE, newMouseY / PIXEL_SIZE, sourceIntensity));
                break;
            case Actions.REMOVING_SOURCE:
                source = u.getNearestSource(newMouseX / PIXEL_SIZE, newMouseY / PIXEL_SIZE);
                if (source != null) {
                    u.removeSource(newMouseX / PIXEL_SIZE, newMouseY / PIXEL_SIZE, source);
                }
                break;
            case Actions.ADDING_VEHICLE:
                if (addingVehicle != Vehicles.NONE) {
                    let vehicle;
                    let gyro = new Gyro(u, newMouseX / PIXEL_SIZE, newMouseY / PIXEL_SIZE, theta);
                    console.log(gyro.theta);
                    if (addingVehicle != Vehicles.VEHICLE4A && addingVehicle != Vehicles.VEHICLE4B) {
                        eval(`vehicle = new Vehicle${addingVehicle}(gyro, id=vehicleId);`);
                    } else {
                        eval(`vehicle = new Vehicle${addingVehicle}(gyro, id=vehicleId, velocityFunction);`);
                    }
                    u.addVehicle(vehicle);
                    if (showingVehicleTracker) {
                        updateVehicleTracker();
                    }
                    vehicleId++;
                    colorsIndex = (colorsIndex + 1) % colors.length;
                }
                break;
            case Actions.REMOVING_VEHICLE: {
                let vehicle = u.getNearestVehicle(newMouseX / PIXEL_SIZE, newMouseY / PIXEL_SIZE);
                if (vehicle != null) {
                    u.removeVehicle(newMouseX / PIXEL_SIZE, newMouseY / PIXEL_SIZE, vehicle);
                }
                break;
            }
        }
        if (drawMode) {
            let mousePos = new Vector(newMouseX / PIXEL_SIZE, newMouseY / PIXEL_SIZE)
            let vehicle = u.getNearestVehicle(mousePos.x, mousePos.y);
            if (u.overVehicle(mousePos.x, mousePos.y, vehicle)) {
                vehicleColorPickerDisplay.position(mouseX, mouseY);
                vehicleColorPickerDisplay.value(vehicle.currentColor);
                vehicleColorPickerDisplay.style("visibility", "visible");
                selectedVehicle = vehicle;
            }
        }
    }
}

function mousePressed() {
    if (currentAction == Actions.NONE) {
        let mousePos = new Vector(newMouseX / PIXEL_SIZE, newMouseY / PIXEL_SIZE)
        let nearestSourceDist = 1000000;
        let nearestVehicleDist = 1000000;
        if (u.sources.length > 0) {
            nearestSourceDist = (u.getNearestSource(mousePos.x, mousePos.y).r.subtract(mousePos)).getMagnitude();
        }
        if(u.vehicles.length > 0) {
            nearestVehicleDist = (u.getNearestVehicle(mousePos.x, mousePos.y).r.subtract(mousePos)).getMagnitude();
        }
        if (!drawMode) {
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
    if (!drawMode) {
        vehicleLocked = false;
        selectedVehicle = null;
        selectedSource = null;
    }
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

function renderPaths() {
    for (let i = 0; i < u.paths.size; i++) {
        Renderer.drawPath(u.paths.get(i), u.speeds.get(i), u.colors.get(i));
    }
}

function rerender() {
    resetCanvas();
    Renderer.graphicsSetup();
    generateTerrain();
    renderTerrain();
    renderPaths();
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

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function resetUniverse() {
    u.reset();
    vehicleId = 0;
    renderers = [];
    simulationPaused = true;
    updateVehicleCensus();
    resetVehicleTracker();
    pg.background(0, 0, 256);
    pg.noStroke();
}