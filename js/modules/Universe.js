class Universe {
    // creates a universe
    constructor() {
        this.sources = [];
        this.vehicles = [];
        this.stimuli = [];
        for (let i = 0; i < MAP_RESOLUTION; i++) {
            let row = []
            for (let j = 0; j < Math.round(MAP_RESOLUTION / ASPECT_RATIO); j++) {
                row.push(0);
            }
            this.stimuli.push(row);
        }
    }

    draw() {
        let pixelSize = MAP_RESOLUTION / (MAP_LENGTH * MAP_HEIGHT);
        // draw a square for each cell in stimuli
        for (i = 0; i < this.stimuli; i++) {
            for (j = 0; j < this.stimuli[i]; j++) {
                square(i * pixelSize, j * pixelSize, pixelSize);
            }
        }
    }

    addVehicle(vehicle) {
        this.vehicles.push(vehicle);
    }

    removeVehicle(vehicle) {
        let index = this.vehicles.indexOf(vehicle);
        if (index > -1) {
            this.vehicles.splice(index, 1);
        }
    }

    addSource(source) {
        this.sources.push(source);
    }

    getNearestSource(x, y) {
        let mousePos = new Vector(x, y);
        let smallestDist = (this.sources[0].r.subtract(mousePos)).getMagnitude() ;
        let closestSource = this.sources[0]
        for (let source of this.sources) {
            dist = (source.r.subtract(mousePos)).getMagnitude()
            if (dist < smallestDist) {smallestDist = dist}
            closestSource = source;
        }
        return closestSource; 
    }

    removeSource(mouseX, mouseY, source) {
        if ((mouseX <= source.r.x + SOURCE_SIZE / 2) && (mouseX >= source.r.x - SOURCE_SIZE / 2)
            && (mouseY <= source.r.y + SOURCE_SIZE / 2) && (mouseY >= source.r.y - SOURCE_SIZE / 2)) {
            let index = this.sources.indexOf(source);
            if (index > -1) {
                this.sources.splice(index, 1);
            }
            resetCanvas();
            Renderer.graphicsSetup();
            generateTerrain();
            renderTerrain();
        }
    }

    getStimulus(x, y) {
        let sum = 0;
        for (let source of this.sources) {
            sum += source.getIntensity(x, y);
        }
        return sum;
    }


}