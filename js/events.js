document.getElementById("add-vehicle").addEventListener("click", () => {
    addingRobot = true;
    // console.log(addingRobot);
})

function updateFriction(value) {
    frictionMagnitude = parseInt(value);
    document.getElementById("friction-label").innerHTML = `μ = ${frictionMagnitude}`;
}
// document.getElementById("friction-slider").addEventListener("oninput", () => {
//     friction = document.getElementById("friction-slider").value;
// })

// document.getElementById("friction-slider").addEventListener("onchange", () => {
//     friction = document.getElementById("friction-slider").value;
// })