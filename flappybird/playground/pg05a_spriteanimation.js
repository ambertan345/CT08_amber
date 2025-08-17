  // write your codes here
let bird, floor;
let flapMidImg, bg, base;

let flapUpImg, flapDownImg;

let pipeImg;
let pipeGroup;

function preload(){
  flapMidImg = loadimage('assets/yellowbird-midflap.png');
  bg = loadImage('assests/background-day.png');
  base = loadImage('assets/base.png');
  flapUpImg = loadImage('assets/yellowbird-upflag.png');
  flapDownImg = loadImage('assets/yellowbird-downflap.png');

  bg = loadImage('assets/background-day.png');
  base = loadIMage('assets/base.png');

  pipeImg = loadImage('assets/pipe-green.png'); 
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

  pipeGroup = new Group()

}

function draw(){
  image(bg, 0, 0, width, height);

  if(kb.presses('space')) || mouse.presses{
    bird.vel.y = -15;
    bird.sleeping = false;
  }
  
  if (bird.vel.y < -1){
    bird.img = flapUpImg;
    bird.rotation = -1;

  }

  else if (bird.vel.y > 1){
    bird.img = flapDownImg;
    bird.rotation = 30;

  }

  else{
    bird.img = flapMidImg;
    bird.rotation = 0;
  }

  if(mouse.press()){
    new Sprite(mouse.x, mouse.y, 30, 30, 'dynamic');
  }

  fill("blue");
  textSize(14);
  text('vel.y: ' + bird.vel.y.toFixed(2), 10, 20);
  text('isMoving: ' + bird.isMoing, 10, 40);
  text('sleeping: ' + bird.sleeping, 10, 60);

}