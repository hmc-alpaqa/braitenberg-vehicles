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



function wave(x, y, t) {
    function u(x, y, t, m, n) {
        return Math.sin(m * Math.PI * x) * Math.sin(n * Math.PI * y) * Math.cos(t)
    }

    let out = 0;
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 6; j++) {
            if (random() < 0.5) { // randomly generate wave numbers
                out += u(x, y, t, j + 1, i + 1);
            }
        }
    }
    return out;
}

// generates terrain based off the wave function
function generateTerrain(n) {
    arr = [];
    for (i = 0; i < n; i++) {
        row = []
        for (j = 0; j < n; j++) {
            row.push(wave(i, j, 3.14 / 2))
        }
        arr.push(row)
    }
    return arr
}
