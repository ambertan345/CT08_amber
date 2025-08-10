  // write your codes here
let bird, floor;
let flapMidImg, bg, base;

function preload(){
  flapMidImg = loadimage('../assets/yellowbird-midflap.png');
  bg = loadImage('../assests/background-day.png');
  base = loadImage('../assets/base.png');
}

function setup(){
  new Canvas(400, 600)

  //bird sprite
  bird = new Sprite();
  bird.x = width/2
  bird.y = 200;
  bird.width = 30;
  bird.height = 30;
  bird.img = flapMidImg

  bird.collider = 'dynamic';
  bird.mass = 2;
  bird.drag = 0.02;
  bird.bounciness = 0.5;
  world.gravity.y = 10;

  floor = new Sprite();
  floor.x = 200;
  floor.y = height - 20;
  floor.width = 400;
  floor.height = 125;
  floor.collider = "static";
  floor.img = base

}

function draw(){
  image(bg, 0, 0, width, height);

  if(kb.presses('space')){
    bird.vel.y = -15;
    bird.sleeping = false;
  }

  if(mouse.press()){
    new Sprite(mouse.x, mouse.y, 30, 30, 'dynamic');
  }

  fill("blue");
  textSize(14);
  text('vel.y: ' + bird.vel.y.toFixed(2), 10, 20);
  text('isMoving: ' + bird.isMoing, 10, 40);
  text('')
}