// let inputText;
// let userText = "Your Text Here";
// let colorPicker;

// function setup() {
//     createCanvas(600, 400);

//     // inputText = createInput();
//     // inputText.position(200, height - 80);
//     // inputText.input(updateText);
//     inputText = createInput();
//     inputText.position(width/2 - 80, height - 150);
//     inputText.input(updateText);

//     colorPicker = createColorPicker("#63c1a6ff");
//     colorPicker.position =(120, 32);
// }
// function draw() {
//     background(colorPicker.value());

//     textSize(16);
//     textAlign(LEFT);
//     fill(0);
//     text("Pick a color", 20, 50)

//     fill(255);
//     rect(50, 100, 500, 160, 25);

//     fill(0);
//     textSize(28);
//     textAlign(CENTER, CENTER);
//     text(userText, width/2, 180);

// }
// function updateText() {
//     userText = this.value();
//     // return 
// }



// let inputText;
// let userText = 'Your text here';
// let submitButton;

// function setup() {
//     createCanvas(200, 200);
//     background(220);
//     inputText = createInput()
//     inputText.position(width/2 - 180, height - 180);
//     // inputText.input(updateText);

//     submitButton = createButton("Show");
//     submitButton.mousePressed(displayInput);
//     submitButton.position(inputText.x + inputText.width + 10, inputText.y);

// }

// function displayInput() {
//     background(220);
//     const inputValue = inputText.value();
//     textSize(60);
//     textAlign(CENTER, CENTER);
//     text(inputValue, 200, 100);
    
// }

let noun;
let verb;
let adjective;
let adverb;
let place;

function setup() {
    createCanvas(600, 600);
    background(220);

    noun = createInput("hello");
    noun.position(width/2, height - 180);

    verb = createInput("hello");
    verb.position(width/2, height - 180);

    adjective = createInput("hello");
    adjective.position(width/2, height - 180);

    noun = createInput("hello");
    noun.position(width/2, height - 180);

    noun = createInput("hello");
    noun.position(width/2, height - 180);

}
