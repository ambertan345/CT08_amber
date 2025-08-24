  // write your codes here
let bird, floor;
let flapMidImg, bg, base;

let flapUpImg, flapDownImg;

let pipeImg;//pipe image
let pipeGroup;// to organise
let bottomPipe, topPipe; //bottom first, then top pipe

function preload(){
  flapMidImg = loadImage('assets/yellowbird-midflap.png');
  bg = loadImage('assets/background-day.png');
  base = loadImage('assets/base.png');
  flapUpImg = loadImage('assets/yellowbird-upflap.png');
  flapDownImg = loadImage('assets/yellowbird-downflap.png');

  bg = loadImage('assets/background-day.png');
  base = loadImage('assets/base.png');

  pipeImg = loadImage('assets/pipe-green.png'); 

  gameoverImg = loadImage('assets/gameover.png');
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

    

  if ( kb.presses('space') || mouse.presses()) {
    bird.vel.y = -5;
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

  //birdmovemtn
  bird.x = bird.x + 3;
  camera.x = bird.x;
  floor.x = bird.x;

  if (frameCount === 1) {
    spawnPipePair(); //custom founctionw
  }

  else if(frameCount % 120 ==0) {
    spawnPipePair();
  }

  if (bird.collides(pipeGroup) || bird.collides(floor) ) {
    noLoop();
  }

  // if(mouse.press()){
  //   new Sprite(mouse.x, mouse.y, 30, 30, 'dynamic');
  // }

  fill("blue");
  textSize(14);
  text('vel.y: ' + bird.vel.y.toFixed(2), 10, 20);
  text('isMoving: ' + bird.isMoing, 10, 40);
  text('sleeping: ' + bird.sleeping, 10, 60);

  bird.x += 3;
  camera.x = bird.x;
  floor.x = bird.x;

  if (bird.collides(pipeGroup) || bird.collides(floor)){
    gameoverLabel = new sprite(width/2, height/2, 192, 42)
    gameoverLabel.img = 
    gameoverLabel
  }


}



function spawnPipePair(){
  let gap = 60;
  let midY = random(250, height-250);
  //
  bottomPipe = new Sprite(bird.x + 400, midY +gap+200, 52, 320, "static");
  bottomPipe.img = pipeImg;

  pipeGroup.add(bottomPipe);

  topPipe = new Sprite(bird.x + 400, midY -gap-200, 52, 320, "static");
  topPipe.img = pipeImg;
  topPipe.rotation = 180; //semi-circle turn

  pipeGroup.add(topPipe);

  pipeGroup.layer = 0; //back most layer
}
