/********* ABOUT VEHICLES INFORMATION *********/
aboutVehicles = [
    {
        header: "Vehicle 1",
        text: "Vehicle 1 has one sensor and one motor. The speed of the motor is proportional to the input received by the sensor. Braitenberg considers this vehicle to be <b>alive</b>."
    }, 
    {
        header: "Vehicle 2a",
        text: "Vehicle 2a has two sensors and two motors. Each sensor is connected to the motor on the same side. This vehicle tends to avoid the source unless the source is directly in front of it, in which case it will move in the direction of the source. Braitenberg considers this vehicle to be a <b>coward</b>."
    },
    {
        header: "Vehicle 2b",
        text: "Vehicle 2b has two sensors and two motors. Each sensor is connected to the motor on the opposite side. This vehicle tends to move towards the source in what could be described as an attacking motion. Braitenberg considers this vehicle <b>aggressive</b>."
    },
    {
        header: "Vehicle 2c",
        text: "Vehicle 2c has two sensors and two motors. Each sensor is connected to both of the motors. This results in behavior similar to that of Vehicle 1."
    },
    {
        header: "Vehicle 3a",
        text: "Vehicle 3a has two sensors, two motors, and two inhibitors. Each inhibitor is connected to the motor on the same side. This causes the vehicle to be attracted to the source. Braitenberg considers this vehicle to experience <b>love</b>."
    },
    {
        header: "Vehicle 3b",
        text: "Vehicle 3b has two sensors, two motors, and two inhibitors. Each inhibitor is connected to the motor on the opposite side. This causes the vehicle to speed up away from the source. Braitenberg considers this vehicle to be an <b>explorer</b>."
    },
    {
        header: "Vehicle 4a",
        text: "Vehicle 4a has two sensors and two motors. Each sensor is connected to the motor on the same side. Whereas in vehicles 1-3 there was a linear relationship between motor output and sensor input, the motor output of Vehicle 4a is related to the source input by a differentiable nonlinear function. The behavior of the vehicle depends on the selected function. Braitenberg considers this vehicle to have <b>instincts</b>."
    },
    {
        header: "Vehicle 4b",
        text: "Vehicle 4b has two sensors and two motors. Each sensor is connected to the motor on the same side. Like Vehicle 4a, there is a nonlinear mapping from sensor input to motor output. Unlike Vehicle 4a, the mapping of sensor input to motor output is defined by a nondifferentiable function rather than a differentiable one. Vehicle 4b should behave more decisively than Vehicle 4a, but the specific behavior of the vehicle is dependent on the function selected. Braitenberg considers this vehicle to have <b>will</b>."
    }
]

/********* DOM ELEMENTS *********/
let doc = document.documentElement;
let fullscreenButton = document.querySelector("#fullscreen-button");
let fullscreenMessage = document.querySelector("#fullscreen-message");
let aboutButton = document.querySelector("#about-button");
let aboutModal = document.querySelector("#about-modal");
let howToButton = document.querySelector("#how-to-button");
let howToModal = document.querySelector("#how-to-modal");
let closeModalButtons = document.querySelectorAll(".modal-close");

////////// ABOUT VEHICLES MODAL //////////
let aboutVehiclesModal = document.querySelector("#about-vehicles-modal");
let aboutVehiclesButton = document.querySelector("#about-vehicles-button");
let aboutVehiclesMenu = document.querySelector("#about-vehicles-menu");
let aboutVehiclesMenuItems = document.querySelectorAll(".about-vehicles-menu-item");
let aboutVehiclesContent = document.querySelector("#about-vehicles-content");
let vehicleHeader = document.querySelector("#vehicle-header");
let vehicleText = document.querySelector("#vehicle-text");
let aboutVehiclesMenuLink = document.querySelector("#about-vehicles-menu-link");
let nextVehicle = document.querySelector("#next-vehicle");
let previousVehicle = document.querySelector("#previous-vehicle");

////////// CONTROLS //////////
let startStopButton = document.querySelector("#start-stop-button");
let resetButton = document.querySelector("#reset-button");
let zoomSlider = document.querySelector("#zoom-slider");
let zoomLabel = document.querySelector("#zoom-label");
let speedButtons = document.querySelectorAll(".speed-button");

////////// VEHICLES //////////
let vehicleSelect = document.querySelector("#vehicle-select");
let addVehicleButton = document.querySelector("#add-vehicle-button");
let removeVehicleButton = document.querySelector("#remove-vehicle-button");
let removeAllVehiclesButton = document.querySelector("#remove-all-vehicles-button");
let vehicle4aSelect = document.querySelector("#vehicle-4a-select");
let vehicle4bSelect = document.querySelector("#vehicle-4b-select");
let startingVelocity = document.querySelector("#starting-velocity");
let velocitySlider = document.querySelector("#velocity-slider");
let velocityLabel = document.querySelector("#velocity-label");

////////// SOURCES //////////
let addSourceButton = document.querySelector("#add-source-button");
let removeSourceButton = document.querySelector("#remove-source-button");
let removeAllSourcesButton = document.querySelector("#remove-all-sources-button");

/********* EVENT HANDLING *********/
////////// FULLSCREEN //////////
fullscreenButton.addEventListener("click", () => {
    doc.requestFullscreen().then(fullscreenMessage.style.display = "none");
});

document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
        document.exitFullscreen().then(fullscreenMessage.style.display = "block");
    }
});

////////// MODALS //////////
aboutButton.addEventListener("click", () => {
    aboutModal.style.display = "block";
});

howToButton.addEventListener("click", () => {
    howToModal.style.display = "block";
});

for (closeModalButton of closeModalButtons) {
    closeModalButton.addEventListener("click", () => {
        aboutModal.style.display = "none";
        aboutVehiclesModal.style.display = "none";
        howToModal.style.display = "none";
    });
}

////////// ABOUT VEHICLES MODAL //////////
aboutVehiclesButton.addEventListener("click", () => {
    aboutVehiclesModal.style.display = "block";
    aboutVehiclesMenu.style.display = "block";
    aboutVehiclesContent.style.display = "none";
});

for (aboutVehiclesMenuItem of aboutVehiclesMenuItems) {
    aboutVehiclesMenuItem.addEventListener("click", (e) =>{
        let i = parseInt(e.target.name);
        aboutVehiclesMenu.style.display = "none";
        aboutVehiclesContent.style.display = "block";
        vehicleHeader.name = i;
        vehicleHeader.innerText = aboutVehicles[i].header;
        vehicleText.innerHTML = aboutVehicles[i].text;
    });
}

aboutVehiclesMenuLink.addEventListener("click", () => {
    aboutVehiclesMenu.style.display = "block";
    aboutVehiclesContent.style.display = "none";
});

nextVehicle.addEventListener("click", () => {
    let i = (vehicleHeader.name + 1) % aboutVehicles.length;
    vehicleHeader.name = i;
    vehicleHeader.innerText = aboutVehicles[i].header;
    vehicleText.innerHTML = aboutVehicles[i].text;
});

previousVehicle.addEventListener("click", () => {
    let i = (aboutVehicles.length + vehicleHeader.name - 1) % aboutVehicles.length;
    vehicleHeader.name = i;
    vehicleHeader.innerText = aboutVehicles[i].header;
    vehicleText.innerHTML = aboutVehicles[i].text;
});

////////// ADD VEHICLE INPUT //////////
vehicleSelect.addEventListener("change", () => {
    if (addingVehicle != Vehicles.NONE) {
        addingVehicle = vehicleSelect.value;
    }
    if (vehicleSelect.value == Vehicles.VEHICLE3A || vehicleSelect.value == Vehicles.VEHICLE3B) {
        startingVelocity.style.display = "block";
    } else {
        startingVelocity.style.display = "none";
    }

    if (vehicleSelect.value == Vehicles.VEHICLE4A) {
        velocityFunction = VELOCITY_FUNCTIONS[vehicle4aSelect.value];
        vehicle4aSelect.style.display = "block";
    } else {
        vehicle4aSelect.style.display = "none";
    }

    if (vehicleSelect.value == Vehicles.VEHICLE4B) {
        velocityFunction = VELOCITY_FUNCTIONS[vehicle4bSelect.value];
        vehicle4bSelect.style.display = "block";
    } else {
        vehicle4bSelect.style.display = "none";
    }
});

////////// VELOCITY SLIDER //////////
velocitySlider.addEventListener("change", () => {
    velocityLabel.innerHTML = `Starting Velocity: ${velocitySlider.value}`;
    vehicle3StartingVelocity = parseInt(velocitySlider.value);
})

////////// ZOOM SLIDER //////////
zoomSlider.addEventListener("input", () => {
    zoomLabel.innerHTML = `Zoom: ${zoomSlider.value}`;
    MAP_RESOLUTION = parseInt(zoomSlider.value);
    PIXEL_SIZE = MAP_LENGTH / MAP_RESOLUTION;
    sourceRenderFactor = ZOOM_TO_SOURCE_RENDER_FACTOR * zoomSlider.value;
    Renderer.graphicsSetup();
    resetCanvas();
    generateTerrain();
    renderTerrain();
});

zoomSlider.addEventListener("mouseup", () => {
    document.activeElement.blur();
})

////////// SPEED ADJUSTER //////////
for (speedButton of speedButtons) {
    speedButton.addEventListener("change", () => {
        SPEED = document.querySelector("input[name='speed']:checked").value;
    })
}

////////// ADD VEHICLE BUTTON //////////
addVehicleButton.addEventListener("click", () => {
    if (addingVehicle != Vehicles.NONE) {
        addingVehicle = Vehicles.NONE;
        addVehicleButton.classList.remove("clicked");
    } else {
        addingSource = false;
        removingSource = false;
        addingVehicle = vehicleSelect.value;
        removingVehicle = false;
        addVehicleButton.classList.add("clicked");
        removeVehicleButton.classList.remove("clicked");
        addSourceButton.classList.remove("clicked");
        removeSourceButton.classList.remove("clicked");
    }
});

////////// REMOVE VEHICLE BUTTON //////////
removeVehicleButton.addEventListener("click", () => {
    if (removingVehicle) {
        removingVehicle = false;
        removeVehicleButton.classList.remove("clicked");
    } else {
        addingVehicle = Vehicles.NONE;
        removingVehicle = true;
        addingSource = false;
        removingSource = false;
        addVehicleButton.classList.remove("clicked");
        removeVehicleButton.classList.add("clicked");
        addSourceButton.classList.remove("clicked");
        removeSourceButton.classList.remove("clicked");
    }
})

////////// REMOVE ALL VEHICLES BUTTON //////////
removeAllVehiclesButton.addEventListener("click", () => {
    u.vehicles = [];
})

////////// VELOCITY FUNCTION SELECTS //////////
vehicle4aSelect.addEventListener("change", () => {
    velocityFunction = VELOCITY_FUNCTIONS[vehicle4aSelect.value];
});

vehicle4bSelect.addEventListener("change", () => {
    velocityFunction = VELOCITY_FUNCTIONS[vehicle4bSelect.value];
})

////////// ADD SOURCE BUTTON //////////
addSourceButton.addEventListener("click", () => {
    sourceIntensity = document.querySelector("#source-intensity-input").value;
    if (addingSource) {
        addingSource = false;
        addSourceButton.classList.remove("clicked");
    } else if (sourceIntensity > 0 && sourceIntensity <= 1000) {
        addingVehicle = Vehicles.NONE;
        addingSource = true;
        removingSource = false;
        removingVehicle = false;
        addVehicleButton.classList.remove("clicked");
        removeVehicleButton.classList.remove("clicked");
        addSourceButton.classList.add("clicked");
        removeSourceButton.classList.remove("clicked");
    } else {
        alert("Please enter an intensity above 0 and under 1000.");
    }

});

////////// REMOVE SOURCE BUTTON //////////
removeSourceButton.addEventListener("click", () => {
    if (removingSource) {
        removingSource = false;
        removeSourceButton.classList.remove("clicked");
    } else {
        addingVehicle = Vehicles.NONE;
        removingVehicle = false;
        addingSource = false;
        removingSource = true;
        addVehicleButton.classList.remove("clicked");
        removeVehicleButton.classList.remove("clicked");
        addSourceButton.classList.remove("clicked");
        removeSourceButton.classList.add("clicked");
    }
});

////////// REMOVE ALL SOURCES ///////////
removeAllSourcesButton.addEventListener("click", () => {
    u.sources = [];
    resetCanvas();
    generateTerrain();
    renderTerrain();
})

////////// START/STOP BUTTON //////////
let simulationPaused = true;
startStopButton.addEventListener("click", () => {
    if (simulationPaused) {
        startStopButton.innerText = "Stop";
        startStopButton.classList.add("clicked");
    } else {
        startStopButton.innerText = "Start"
        startStopButton.classList.remove("clicked");
    }
    simulationPaused = !simulationPaused;
});

////////// RESET BUTTON //////////
resetButton.addEventListener("click", () => {
    if (!simulationPaused) {
        startStopButton.innerText = "Start";
        addVehicleButton.classList.remove("clicked");
        addSourceButton.classList.remove("clicked");
        removeSourceButton.classList.remove("clicked");
        removeVehicleButton.classList.remove("clicked");
        startStopButton.classList.remove("clicked");
    }
    zoomLabel.innerHTML = "Zoom: 100";
    zoomSlider.value = 100;
    MAP_RESOLUTION = 100;
    PIXEL_SIZE = MAP_LENGTH / MAP_RESOLUTION;
    Renderer.graphicsSetup();
    resetUniverse();
});