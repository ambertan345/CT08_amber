let inputText;
let userText = "Your Text Here";
let colorPicker;

function setup() {
    createCanvas(600, 400);

    // inputText = createInput();
    // inputText.position(200, height - 80);
    // inputText.input(updateText);

    colorPicker = createColorPicker("#63c1a6ff");
    colorPicker.position =(120, 32);
}
function draw() {
    background(colorPicker.value());

    textSize(16);
    textAlign(LEFT);
    fill(0);
    text("Pick a color", 20, 50)

    fill(0);
    rect()

    // fill(0);
    // textSize(28);
    // textAlign(CENTER, CENTER);
    // text(userText, width/2, 180);

}
function updateText() {
    // userText = this.value();
    // return 
}