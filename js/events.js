document.getElementById("add-vehicle").addEventListener("click", () => {
    addingVehicle = document.getElementById("vehicle-select").value;
})

function updateFriction(value) {
    frictionMagnitude = parseInt(value);
    document.getElementById("friction-label").innerHTML = `μ = ${frictionMagnitude}`;
}