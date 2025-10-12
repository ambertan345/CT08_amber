let inputText;
let userText = "Your Text Here";

function setup() {
    createCanvas(600, 400);

    inputText = createInput();
    inputText.position(200, height - 80);
    inputText.input(updateText);

    colorPicker = createColorPicker("#63c1a6ff");
    colorPicker.position =(120, 32);
}
function draw() {
    background(colorPicker.value());

    textSIze(16);
    textAlign(LEFT);
    fill(0);
    text("Pick a color")
}
function updateText() {
    userText = this.value();
    return 
}