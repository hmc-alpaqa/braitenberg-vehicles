// import random from 'random-js'
// function generateRandomArray(n, variance) {
//     arr = [[]]
//     // set a random starting value at the upper left corner
//     arr[0][0] = random()

//     // populate the first row with small random changes to the element on the 
//     for (i = 1; i < n; i++) {
//         arr[0].push(arr[i - 1] + random(-variance, variance))
//     }

//     for (i = 1; i < n; i++) {
//         row = []
//         for (j = 0; j < n; j++) {
//             row
//         }
//         this.stimuli.push(row)
//     }
// }



function wave(x, y) {
    function u(x, y, m, n) {
        return Math.sin(m * Math.PI * x / 2) * Math.sin(n * Math.PI * y / 2)
    }

    let out = 0;
    for (var i = 0; i < 1; i++) {
        for (var j = 0; j < 2; j++) {
            if (random() < 1) { // randomly generate wave numbers
                out += u(x, y, j + 1, i + 1);
                // console.log(i, j)
            }
        }
    }
    return out;
}

// generates terrain based off the wave function
function generateTerrain(n) {
    arr = [];
    max = 0;
    for (i = 0; i < n; i++) {
        row = []
        for (j = 0; j < n; j++) {
            let radius = n / 2;
            let xcor = 1.0 * j / radius;
            let ycor = 1.0 * i / radius;
            let intensity = wave(xcor, ycor)
            row.push(intensity);
            if (intensity > max) {
                max = intensity;
            }
        }
        arr.push(row)
    }

    // normalize the array
    for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
            arr[i][j] = arr[i][j] / max;
        }
    }

    return arr
}
