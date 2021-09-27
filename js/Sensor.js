class Sensor {
    constructor(gyro, offset) {
        // sensor averages intensity of stimuli across field of view
        this.width = 4;
        this.length = 4;

        this.offset = offset
        this.gyro = gyro;
        this.theta = 0; // orientation of sensor
    }

    getValue() {
        // for (let r = 0; r < this.width; r++) {
        //     for (let c = 0; c < this.length; c++) {
        //         u[i][j] = 0;
        //     }
        // }    
        let y = Math.round(this.getY())
        let x = Math.round(this.getX())
        let grid = this.gyro.universe.stimuli
        if (y >= 0 && y < grid.length && x >= 0 && x < grid[y].length) {
            return this.gyro.universe.stimuli[y][x];
        } else {
            // if the location is outside the grid, return 0    
            return 0;
        }
    }

    getX() {
        return this.gyro.r.x + this.offset.x
    }

    getY() {
        return this.gyro.r.y + this.offset.y
    }

}