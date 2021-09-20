function setup() {
    createCanvas(400, 400);
    noLoop();
}

function draw() {
    background(220);
    u = new Universe();
    // console.log(u)
    let pixelSize = 4 * MAP_RESOLUTION / MAP_SIZE;
    // draw a square for each cell in stimuli
    // console.log(u.stimuli)
    noStroke()
    for (i = 0; i < u.stimuli.length; i++) {
        for (j = 0; j < u.stimuli[i].length; j++) {
            // console.log(u.stimuli[i][j], j)
            fill(10000000000000000000000000000000 * u.stimuli[i][j], 50000000000000000000000000000000 * u.stimuli[i][j], 100000000000000000000000000000000 * u.stimuli[i][j])
            square(i * pixelSize, j * pixelSize, pixelSize);
        }
    }
}
