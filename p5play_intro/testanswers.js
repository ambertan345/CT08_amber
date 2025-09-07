// variables
let floor;
let ball;

function setup() {
    console.log("called once");
    //          w    h
    new Canvas(600, 400);
    background("blue");

    // let abc = new Sprite();
    // abc.diameter = 50;

    //abc.y = 50;
    world.gravity.y = 1

    floor = new Sprite()
    floor.w = 300
    floor.h = 35
    floor.y
    floor.collider = "static"
}

//forever block
function draw() {
    background("blue"); //erase background

    if (mouse.presses()) {
        let b = new Sprite( mouseX, mouseY );
        b.diameter = 15;
    }
}
