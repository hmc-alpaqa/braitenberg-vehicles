/********* ABOUT VEHICLES INFORMATION *********/
aboutVehicles = [
    {
        header: "Vehicle 1",
        text: "Vehicle 1 has one sensor and one motor. The speed of the motor is proportional to the input received by the sensor. Braitenberg considers this vehicle to be <b>alive</b>.",
        image: "./images/vehicles/vehicle1.png",
    }, 
    {
        header: "Vehicle 2a",
        text: "Vehicle 2a has two sensors and two motors. Each sensor is connected to the motor on the same side. This vehicle tends to avoid the source unless the source is directly in front of it, in which case it will move in the direction of the source. Braitenberg considers this vehicle to be a <b>coward</b>.",
        image: "./images/vehicles/vehicle2a.png",
    },
    {
        header: "Vehicle 2b",
        text: "Vehicle 2b has two sensors and two motors. Each sensor is connected to the motor on the opposite side. This vehicle tends to move towards the source in what could be described as an attacking motion. Braitenberg considers this vehicle <b>aggressive</b>.",
        image: "./images/vehicles/vehicle2b.png",
    },
    {
        header: "Vehicle 2c",
        text: "Vehicle 2c has two sensors and two motors. Each sensor is connected to both of the motors. This results in behavior similar to that of Vehicle 1.",
        image: "./images/vehicles/vehicle2c.png"
    },
    {
        header: "Vehicle 3a",
        text: "Vehicle 3a has two sensors, two motors, and two inhibitors. Each inhibitor is connected to the motor on the same side. This causes the vehicle to be attracted to the source. Braitenberg considers this vehicle to experience <b>love</b>.",
        image: "./images/vehicles/vehicle3a.png"
    },
    {
        header: "Vehicle 3b",
        text: "Vehicle 3b has two sensors, two motors, and two inhibitors. Each inhibitor is connected to the motor on the opposite side. This causes the vehicle to speed up away from the source. Braitenberg considers this vehicle to be an <b>explorer</b>.",
        image: "./images/vehicles/vehicle3b.png"
    },
    {
        header: "Vehicle 4a",
        text: "Vehicle 4a has two sensors and two motors. Each sensor is connected to the motor on the same side. Whereas in vehicles 1-3 there was a linear relationship between motor output and sensor input, the motor output of Vehicle 4a is related to the source input by a differentiable nonlinear function. The behavior of the vehicle depends on the selected function. Braitenberg considers this vehicle to have <b>instincts</b>.",
        image: "./images/vehicles/vehicle4.png"
    },
    {
        header: "Vehicle 4b",
        text: "Vehicle 4b has two sensors and two motors. Each sensor is connected to the motor on the same side. Like Vehicle 4a, there is a nonlinear mapping from sensor input to motor output. Unlike Vehicle 4a, the mapping of sensor input to motor output is defined by a nondifferentiable function rather than a differentiable one. Vehicle 4b should behave more decisively than Vehicle 4a, but the specific behavior of the vehicle is dependent on the function selected. Braitenberg considers this vehicle to have <b>will</b>.",
        image: "./images/vehicles/vehicle4.png"
    }
]

/********* TUTORIAL INFORMATION *********/

/********* ABOUT VEHICLES INFORMATION *********/
tutorials = [
    {
        header: "Adding Sources",
        video: "./videos/adding_sources.mp4",
    }, 
    {
        header: "Removing Sources",
        video: "./videos/removing_sources.mp4",
    }, 
    {
        header: "Adding Vehicles",
        video: "./videos/adding_vehicles.mp4",
    }, 
    {
        header: "Removing Vehicles",
        video: "./videos/removing_vehicles.mp4",
    }, 
    {
        header: "Controls",
        video: "./videos/controls.mp4",
    }, 
]


/********* DOM ELEMENTS *********/
let doc = document.documentElement;
let body = document.querySelector("body");
let fullscreenButton = document.querySelector("#fullscreen-button");
let fullscreenMessage = document.querySelector("#fullscreen-message");
let aboutButton = document.querySelector("#about-button");
let aboutModal = document.querySelector("#about-modal");
let closeModalButtons = document.querySelectorAll(".modal-close");

////////// ABOUT VEHICLES MODAL //////////
let aboutVehiclesModal = document.querySelector("#about-vehicles-modal");
let aboutVehiclesButton = document.querySelector("#about-vehicles-button");
let aboutVehiclesMenu = document.querySelector("#about-vehicles-menu");
let aboutVehiclesMenuItems = document.querySelectorAll(".about-vehicles-menu-item");
let aboutVehiclesContent = document.querySelector("#about-vehicles-content");
let vehicleHeader = document.querySelector("#vehicle-header");
let vehicleText = document.querySelector("#vehicle-text");
let vehicleImage = document.querySelector("#vehicle-image");
let aboutVehiclesMenuLink = document.querySelector("#about-vehicles-menu-link");
let nextVehicle = document.querySelector("#next-vehicle");
let previousVehicle = document.querySelector("#previous-vehicle");

////////// TUTORIAL MODAL //////////
let tutorialModal = document.querySelector("#tutorial-modal");
let tutorialButton = document.querySelector("#tutorial-button");
let tutorialMenu = document.querySelector("#tutorial-menu");
let tutorialMenuItems = document.querySelectorAll(".tutorial-menu-item");
let tutorialContent = document.querySelector("#tutorial-content");
let tutorialHeader = document.querySelector("#tutorial-header");
let tutorialVideo = document.querySelector("#tutorial-video")
let tutorialMenuLink = document.querySelector("#tutorial-menu-link");
let nextTutorial = document.querySelector("#next-tutorial");
let previousTutorial = document.querySelector("#previous-tutorial");

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
let totalVehicles = document.querySelector("#total-vehicles");
let vehicleTracker = document.querySelector("#vehicle-tracker");
let vehicleTrackerToggle = document.querySelector("#vehicle-tracker-toggle");
let vehicleColorPicker = document.querySelector("#vehicle-color-picker");

////////// SOURCES //////////
let sourceIntensityInput = document.querySelector("#source-intensity-input");
let addSourceButton = document.querySelector("#add-source-button");
let removeSourceButton = document.querySelector("#remove-source-button");
let removeAllSourcesButton = document.querySelector("#remove-all-sources-button");

////////// MODES //////////
let sandboxModeButton = document.querySelector("#sandbox-mode-button");
let drawModeButton = document.querySelector("#draw-mode-button");

/********* EVENT HANDLING *********/
////////// FULLSCREEN //////////
fullscreenButton.addEventListener("click", () => {
    let fullScreenMessage = document.querySelector("#fullscreen-message")
    doc.requestFullscreen().then(body.removeChild(fullScreenMessage));
});

document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
        let fullscreenMessage = `
                <div id="fullscreen-message">
                    <h1 style="margin-top: 20%">To use this app, you must enter fullscreen mode. This is different from making your browser window fullscreen.</h1>
                    <h1>You can enter fullscreen mode by pressing the button below.</h1>
                    <button id="fullscreen-button">Fullscreen</button>
                </div>`
        body.insertAdjacentHTML("afterbegin", fullscreenMessage);
        let fullscreenButton = document.querySelector("#fullscreen-button");
        fullscreenButton.addEventListener("click", () => {
            let fullScreenMessage = document.querySelector("#fullscreen-message")
            doc.requestFullscreen().then(body.removeChild(fullScreenMessage));
        });
    }
});

////////// MODALS //////////
aboutButton.addEventListener("click", () => {
    aboutModal.style.display = "block";
    // when clicking a modal, the user should stop adding vehicles and sources
    unclickVehicleSourceButtons();
});

for (closeModalButton of closeModalButtons) {
    closeModalButton.addEventListener("click", () => {
        aboutModal.style.display = "none";
        aboutVehiclesModal.style.display = "none";
        tutorialModal.style.display = "none";
    });
}

////////// ABOUT VEHICLES MODAL //////////
aboutVehiclesButton.addEventListener("click", () => {
    aboutVehiclesModal.style.display = "block";
    aboutVehiclesMenu.style.display = "block";
    aboutVehiclesContent.style.display = "none";
    // when clicking a modal, the user should stop adding vehicles and sources
    unclickVehicleSourceButtons();
});

for (aboutVehiclesMenuItem of aboutVehiclesMenuItems) {
    aboutVehiclesMenuItem.addEventListener("click", (e) =>{
        let i = parseInt(e.target.name);
        aboutVehiclesMenu.style.display = "none";
        aboutVehiclesContent.style.display = "block";
        vehicleHeader.name = i;
        vehicleHeader.innerText = aboutVehicles[i].header;
        vehicleText.innerHTML = aboutVehicles[i].text;
        vehicleImage.src = aboutVehicles[i].image;
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
    vehicleImage.src = aboutVehicles[i].image;
});

previousVehicle.addEventListener("click", () => {
    let i = (aboutVehicles.length + vehicleHeader.name - 1) % aboutVehicles.length;
    vehicleHeader.name = i;
    vehicleHeader.innerText = aboutVehicles[i].header;
    vehicleText.innerHTML = aboutVehicles[i].text;
    vehicleImage.src = aboutVehicles[i].image
});

////////// TUTORIALS MODAL //////////

tutorialButton.addEventListener("click", () => {
    tutorialModal.style.display = "block";
    tutorialMenu.style.display = "block";
    tutorialContent.style.display = "none";
    // when clicking a modal, the user should stop adding vehicles and sources
    unclickVehicleSourceButtons();
});

for (tutorialMenuItem of tutorialMenuItems) {
    tutorialMenuItem.addEventListener("click", (e) =>{
        let i = parseInt(e.target.name);
        tutorialMenu.style.display = "none";
        tutorialContent.style.display = "block";
        tutorialHeader.name = i;
        tutorialHeader.innerText = tutorials[i].header;
        tutorialVideo.src = tutorials[i].video;
    });
}

tutorialMenuLink.addEventListener("click", () => {
    tutorialMenu.style.display = "block";
    tutorialContent.style.display = "none";
});

nextTutorial.addEventListener("click", () => {
    let i = (tutorialHeader.name + 1) % tutorials.length;
    tutorialHeader.name = i;
    tutorialHeader.innerText = tutorials[i].header;
    tutorialVideo.src = tutorials[i].video;
});

previousTutorial.addEventListener("click", () => {
    let i = (tutorials.length + tutorialHeader.name - 1) % tutorials.length;
    tutorialHeader.name = i;
    tutorialHeader.innerText = tutorials[i].header;
    tutorialVideo.src = tutorials[i].video;
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

////////// VEHICLE CENSUS ///////////
const updateVehicleCensus = () => {
    totalVehicles.innerText = `Total Vehicles: ${u.vehicles.length}`;
}

////////// VEHICLE TRACKER //////////
const resetVehicleTracker = () => {
    vehicleTracker.innerHTML = "";
}

const updateVehicleTracker = () => {
    resetVehicleTracker();
    for (vehicle of u.vehicles) {
        vehicleTracker.insertAdjacentHTML("beforeend", `
            <div>
                <p><b>id:</b> ${vehicle.id} <b>type:</b> ${vehicle.type} <b>x:</b> ${vehicle.x.toFixed(0)} <b>y:</b> ${vehicle.y.toFixed(0)} <b>θ:</b> ${vehicle.theta.toFixed(2)}
            </div>
        `);
    }
}

////////// VEHICLE TRACKER TOGGLE //////////
vehicleTrackerToggle.addEventListener("change", () => {
    if (this.checked) {
        updateVehicleTracker();
    } else {
        resetVehicleTracker();
    }
    showingVehicleTracker = !showingVehicleTracker;
});

////////// VEHICLE COLOR PICKER //////////
vehicleColorPicker.addEventListener("change", (e) => {
    selectedVehicle.setCurrentColor(e.target.value);
})

vehicleColorPicker.addEventListener("blur", () => {
    console.log("test");
    vehicleColorPicker.style.visibility = "hidden";
})

////////// ZOOM SLIDER //////////
zoomSlider.addEventListener("input", () => {
    zoomLabel.innerHTML = `Zoom: ${zoomSlider.value}`;
    MAP_RESOLUTION = parseInt(zoomSlider.value);
    PIXEL_SIZE = MAP_LENGTH / MAP_RESOLUTION;
    sourceRenderFactor = ZOOM_TO_SOURCE_RENDER_FACTOR * zoomSlider.value;
    rerender();
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
        currentAction = Actions.NONE;
        addVehicleButton.classList.remove("clicked");
    } else {
        unclickVehicleSourceButtons();
        currentAction = Actions.ADDING_VEHICLE;
        addingVehicle = vehicleSelect.value;
        addVehicleButton.classList.add("clicked");
    }
});

////////// REMOVE VEHICLE BUTTON //////////
removeVehicleButton.addEventListener("click", () => {
    if (currentAction == Actions.REMOVING_VEHICLE) {
        currentAction = Actions.NONE;
        removeVehicleButton.classList.remove("clicked");
    } else {
        unclickVehicleSourceButtons();
        currentAction = Actions.REMOVING_VEHICLE;
        removeVehicleButton.classList.add("clicked");
    }
})

////////// REMOVE ALL VEHICLES BUTTON //////////
removeAllVehiclesButton.addEventListener("click", () => {
    vehicleColorPicker.style.visibility = "hidden";
    unclickVehicleSourceButtons();
    u.vehicles = [];
    updateVehicleCensus();
    resetVehicleTracker();
})

////////// VELOCITY FUNCTION SELECTS //////////
vehicle4aSelect.addEventListener("change", () => {
    velocityFunction = VELOCITY_FUNCTIONS[vehicle4aSelect.value];
});

vehicle4bSelect.addEventListener("change", () => {
    velocityFunction = VELOCITY_FUNCTIONS[vehicle4bSelect.value];
})

////////// SOURCE INTENSITY INPUT //////////
sourceIntensityInput.addEventListener("input", () => {
    unclickVehicleSourceButtons();
})

////////// ADD SOURCE BUTTON //////////
addSourceButton.addEventListener("click", () => {
    sourceIntensity = sourceIntensityInput.value;
    if (currentAction == Actions.ADDING_SOURCE) {
        currentAction = Actions.NONE;
        addSourceButton.classList.remove("clicked");
    } else if (sourceIntensity > 0 && sourceIntensity <= 1000) {
        unclickVehicleSourceButtons();
        currentAction = Actions.ADDING_SOURCE;
        addSourceButton.classList.add("clicked");
    } else {
        alert("Please enter an intensity between 0 and 1000");
    }

});

////////// REMOVE SOURCE BUTTON //////////
removeSourceButton.addEventListener("click", () => {
    if (currentAction == Actions.REMOVING_SOURCE) {
        currentAction = Actions.NONE;
        removeSourceButton.classList.remove("clicked");
    } else {
        unclickVehicleSourceButtons();
        currentAction = Actions.REMOVING_SOURCE;
        removeSourceButton.classList.add("clicked");
    }
});

////////// REMOVE ALL SOURCES ///////////
removeAllSourcesButton.addEventListener("click", () => {
    u.sources = [];
    unclickVehicleSourceButtons();
    resetCanvas();
    generateTerrain();
    renderTerrain();
})

////////// SANDBOX MODE BUTTON //////////
sandboxModeButton.addEventListener("click", () => {
    drawModeButton.classList.remove("clicked");
    sandboxModeButton.classList.add("clicked");
    drawMode = false;
    vehicleColorPicker.style.visibility = "hidden";
})

////////// DRAW MODE BUTTON //////////
drawModeButton.addEventListener("click", () => {
    sandboxModeButton.classList.remove("clicked");
    drawModeButton.classList.add("clicked");
    drawMode = true;
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

const pauseSimulation = () => {
    simulationPaused = true;
    startStopButton.classList.remove("clicked");
    startStopButton.innerText = "Start";
}

const unpauseSimulation = () => {
    simulationPaused = false;
    startStopButton.classList.add("clicked");
    startStopButton.innerText = "Stop";
}

////////// RESET BUTTON //////////
resetButton.addEventListener("click", () => {
    if (!simulationPaused) {
        startStopButton.innerText = "Start";
        startStopButton.classList.remove("clicked");
    }
    vehicleColorPicker.style.visibility = "hidden";
    document.querySelector("#speed-button-1").checked = true;
    SPEED = document.querySelector("#speed-button-1").value;
    unclickVehicleSourceButtons();
    zoomLabel.innerHTML = "Zoom: 400";
    zoomSlider.value = 400;
    MAP_RESOLUTION = 400;
    PIXEL_SIZE = MAP_LENGTH / MAP_RESOLUTION;
    Renderer.graphicsSetup();
    resetUniverse();
});

const unclickVehicleSourceButtons = () => {
    currentAction = Actions.NONE;
    addingVehicle = Vehicles.NONE;
    addVehicleButton.classList.remove("clicked");
    removeVehicleButton.classList.remove("clicked");
    addSourceButton.classList.remove("clicked");
    removeSourceButton.classList.remove("clicked");
}