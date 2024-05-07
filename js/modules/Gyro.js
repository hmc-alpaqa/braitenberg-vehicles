class Gyro {
    constructor(universe, x, y, angle) {
        this.universe = universe;
        this.r = new Vector(x, y); // position
        this.angle = angle; // angle of positioning relative to the x-axis

        this.v = new Vector(0, 0);
        this.a = new Vector(0, 0);
    }
}