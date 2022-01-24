class Gyro {
    constructor(universe, x, y, θ, name) {
        this.universe = universe;
        this.r = new Vector(x, y); // position
        this.θ = θ; // angle of positioning relative to the x-axis

        this.v = new Vector(0, 0);
        this.a = new Vector(0, 0);

        this.name = name;
    }
}