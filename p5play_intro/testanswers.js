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

    //                  x    y    w   h   collider
    floor = new Sprite(300, 200, 300, 35, "static")
    floor.width = 300
    floor.height = 35
    floor.y = 20
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
