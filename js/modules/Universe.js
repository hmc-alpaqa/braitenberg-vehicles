class Universe {
    // creates a universe
    constructor() {
        this.stimuli = generateTerrain(MAP_RESOLUTION)
        this.robots = []
    }

    draw() {
        let pixelSize = MAP_RESOLUTION / MAP_SIZE;
        // draw a square for each cell in stimuli
        for (i = 0; i < this.stimuli; i++) {
            for (j = 0; j < this.stimuli[i]; j++) {
                square(i * pixelSize, j * pixelSize, pixelSize);
            }
        }
    }

    addRobot(robot) {
        this.robots.push(robot);
    }


}