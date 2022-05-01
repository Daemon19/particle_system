
let particleProps;
let particleSystem;

function setup() {
    createCanvas(windowWidth, windowHeight);

    particleProps = new ParticleProps(
        mouseX, mouseY, 25, 25,
        0, -3, 3, 6
    );
    particleSystem = new ParticleSystem;

    const sizeSlider = document.getElementById("sizeProp");
    setupSlider(sizeSlider, particleProps.size.w, function () {
        particleProps.size.set(this.value, this.value);
    });

    const lifetimeSlider = document.getElementById("lifetime");
    setupSlider(lifetimeSlider, particleProps.lifetime, function () {
        particleProps.lifetime = this.value;
    });

    const velSlider = document.getElementById("vel");
    setupSlider(velSlider, particleProps.vel.y, function () {
        particleProps.vel.y = parseInt(this.value);
    });

    const spreadXSlider = document.getElementById("spreadX");
    setupSlider(spreadXSlider, particleProps.velVariation.x, function () {
        particleProps.velVariation.x = parseInt(this.value);
    });

    const spreadYSlider = document.getElementById("spreadY");
    setupSlider(spreadYSlider, particleProps.velVariation.y, function () {
        particleProps.velVariation.y = parseInt(this.value);
    });
}

function draw() {
    background(0);
    particleProps.pos.set(mouseX, mouseY);
    for (let i = 0; i < 1; i++) {
        particleSystem.emit(particleProps);
    }
    particleSystem.update();
    particleSystem.draw();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function setupSlider(slider, initValue, onInput) {
    slider.value = initValue;
    slider.oninput = onInput;
}