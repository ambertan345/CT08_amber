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

}
function updateText() {
    userText = this.value();
    return 
}