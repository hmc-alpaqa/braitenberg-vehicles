/**
 * Container class for storing information about vehicles, sources, and stimuli.
 */
class Universe {
    /**
     * Creates a new universe.
     */
    constructor() {
        this.sources = [];
        this.vehicles = [];
        this.stimuli = [];
        this.paths = new Map();
        this.speeds = new Map();
        this.colors = new Map();
        for (let i = 0; i < MAP_RESOLUTION; i++) {
            let row = []
            for (let j = 0; j < Math.round(MAP_RESOLUTION / ASPECT_RATIO); j++) {
                row.push(0);
            }
            this.stimuli.push(row);
        }
    }

    /**
     * Resets the universe to the initial blank configuration.
     */
    reset() {
        this.sources = [];
        this.vehicles = [];
        this.stimuli = [];
        this.paths.clear();
        this.speeds.clear();
        this.colors.clear();
        for (let i = 0; i < MAP_RESOLUTION; i++) {
            let row = []
            for (let j = 0; j < MAP_RESOLUTION; j++) {
                row.push(0);
            }
            u.stimuli.push(row);
        }
    }

    /**
     * Draws the universe.
     */
    draw() {
        let pixelSize = MAP_RESOLUTION / (MAP_LENGTH * MAP_HEIGHT);
        // draw a square for each cell in stimuli
        for (i = 0; i < this.stimuli; i++) {
            for (j = 0; j < this.stimuli[i]; j++) {
                square(i * pixelSize, j * pixelSize, pixelSize);
            }
        }
    }

    /**
     * Adds a source to the universe.
     * @param {Source} source the source to be added
     */
    addSource(source) {
        this.sources.push(source);
        rerender();
    }

    /**
     * Adds a vehicle to the universe.
     * @param {Vehicle} vehicle the vehicle to be added
     */
    addVehicle(vehicle) {
        this.vehicles.push(vehicle);
    }

    /**
     * Adds multiple vehicles to the universe.
     * @param {Vehicle[]} vehicles the array of vehicles to be added
     */
    addVehicles(vehicles) {
        this.vehicles = this.vehicles.concat(vehicles);
    }

    /**
     * Removes the specified vehicles from the universe.
     * @param {Vehicles[]} vehicles the array of vehicles to be removed
     */
    killVehicles(vehicles) {
        this.vehicles = this.vehicles.filter(e => !vehicles.includes(e)); 
    }

    /**
     * Removes the specified sources from the universe.
     * @param {Sources[]} sources the array of sources to be removed
     */
    killSources(sources) {
        this.sources = this.sources.filter(e => !sources.includes(e));
        rerender();
    }

    /**
     * Returns the nearest vehicle at the specified coordinate, or null if there are no vehicles.
     * @param {Number} x x-position of the coordinate
     * @param {Number} y y-position of the coordinate
     * @returns {Vehicle|null} the nearest vehicle, or null if there are none
     */
    getNearestVehicle(x, y) {
        if (this.vehicles.length > 0) {
            let mousePos = new Vector(x, y);
            let smallestDist = (this.vehicles[0].r.subtract(mousePos)).getMagnitude() ;
            let closestVehicle = this.vehicles[0]
            for (let vehicle of this.vehicles) {
                dist = (vehicle.r.subtract(mousePos)).getMagnitude();
                if (dist < smallestDist) {
                    smallestDist = dist
                    closestVehicle = vehicle;
                }
            }
            return closestVehicle; 
        }
        return null;
    }

    /**
     * Returns whether or not the specified mouse coordinates are over the specified vehicle
     * @param {Number} mouseX the x-position of the mouse
     * @param {Number} mouseY the y-position of the mouse
     * @param {Vehicle} vehicle the specified vehicle
     * @returns {Boolean} whether or not the mouse is over the vehicle
     */
    overVehicle(mouseX, mouseY, vehicle) {
        return (mouseX <= vehicle.x + VEHICLE_SIZE / 2) && (mouseX >= vehicle.x - VEHICLE_SIZE / 2)
        && (mouseY <= vehicle.y + VEHICLE_SIZE / 2) && (mouseY >= vehicle.y - VEHICLE_SIZE / 2);
    }

    /**
     * Removes a vehicle at specified mouse coordinates
     * @param {Number} mouseX the x-position of the mouse
     * @param {Number} mouseY the y-position of the mouse
     * @param {Vehicle} vehicle the vehicle to be removed
     */
    removeVehicle(mouseX, mouseY, vehicle) {
        if (this.overVehicle(mouseX, mouseY, vehicle)) {
            let index = this.vehicles.indexOf(vehicle);
            if (index > -1) {
                this.vehicles.splice(index, 1);
            }
            updateVehicleCensus();
            rerender();
        }
    }

    /**
     * Returns the nearest source at the specified coordinate, or null if there are no sources.
     * @param {Number} x x-position of the coordinate
     * @param {Number} y y-position of the coordinate
     * @returns {Source|null} the nearest source, or null if there are none
     */
    getNearestSource(x, y) {
        if (this.sources.length > 0) {
            let mousePos = new Vector(x, y);
            let smallestDist = (this.sources[0].r.subtract(mousePos)).getMagnitude() ;
            let closestSource = this.sources[0]
            for (let source of this.sources) {
                dist = (source.r.subtract(mousePos)).getMagnitude()
                if (dist < smallestDist) {
                    smallestDist = dist
                    closestSource = source;
                }
            }
            return closestSource; 
        } 
        return null;
    }

    /**
     * Returns whether or not the specified mouse coordinates are over the specified source
     * @param {Number} mouseX the x-position of the mouse
     * @param {Number} mouseY the y-position of the mouse
     * @param {Source} source the specified source
     * @returns {Boolean} whether or not the mouse is over the source
     */
    overSource(mouseX, mouseY, source) {
        return (mouseX <= source.x + SOURCE_SIZE / 2) && (mouseX >= source.x - SOURCE_SIZE / 2)
        && (mouseY <= source.y + SOURCE_SIZE / 2) && (mouseY >= source.y - SOURCE_SIZE / 2);
    }

    /**
     * Removes a source at specified mouse coordinates
     * @param {Number} mouseX the x-position of the mouse
     * @param {Number} mouseY the y-position of the mouse
     * @param {Source} source the source to be removed
     */
    removeSource(mouseX, mouseY, source) {
        if (this.overSource(mouseX, mouseY, source)) {
            let index = this.sources.indexOf(source);
            if (index > -1) {
                this.sources.splice(index, 1);
            }
            rerender();
        }
    }

    /**
     * Returns the sum of the source intensities at a given coordinate point.
     * @param {Number} x the x-position of the coordinate
     * @param {Number} y the y-position of the coordinate
     * @returns the sum of the source intensities at the point
     */
    getStimulus(x, y) {
        let sum = 0;
        for (let source of this.sources) {
            sum += source.getIntensity(x, y);
        }
        return sum;
    }
}