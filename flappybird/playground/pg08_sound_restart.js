  // write your codes here
let bird, floor;
let flapMidImg, bg, base;

let flapUpImg, flapDownImg;

let pipeImg;//pipe image
let pipeGroup;// to organise
let bottomPipe, topPipe; //bottom first, then top pipe

let score = 200;

function preload(){
  flapMidImg = loadImage('assets/yellowbird-midflap.png');
  bg = loadImage('assets/background-day.png');
  base = loadImage('assets/base.png');
  flapUpImg = loadImage('assets/yellowbird-upflap.png');
  flapDownImg = loadImage('assets/yellowbird-downflap.png');

  bg = loadImage('assets/background-day.png');
  base = loadImage('assets/base.png');

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

  for (let pipe of pipeGroup) {
    let pipeRightEdge = pipe.x + pipe.w/2;
    let birdLeftEdge = bird.x - bird.w/2;

    if (pipe.passed == false && pipeRightEdge < bird) {
      pipe.passed = true;
      pointSound.play();
      score++;
    }
  }

  if (bird.collides(pipeGroup) || bird.collides(floor) || bird.collides(sky)){
    failSound.play();
    gameoverLabel = new Sprite(width/2, height/2, 192, 42);
    gameoverLabel.img = gameoverImg
    gameoverLabel.layer 
    gameoverLabel.x = camera.xPos

    bgSound.stop();
    noLoop();

    setTimeout(() => {
        score = 0;
        startGame = false;

        pipeGroup.removeAll()
        bird.vel.x = 0;
        bird.vel.y = 0;
        bird.rotation = 0;
        bird.collider = 'static';
        bird.y = 200;

        gameoverLabel.remove();
        startScreenLabel.visible = true;
        startScreenLabel.x = bird.x;

        loop();
    },3000);
  }
}



function spawnPipePair(){
  let gap = 60;
  let midY = random(250, height-250);
  //
  // bottomPipe = new Sprite(bird.x + 400, midY +gap+200, 52, 320, "static");
  // bottomPipe.img = pipeImg;

  pipeGroup.add(bottomPipe);

  topPipe = new Sprite(bird.x + 400, midY -gap-200, 52, 320, "static");
  topPipe.img = pipeImg;
  topPipe.rotation = 180; //semi-circle turn

//   pipeGroup.add(topPipe);

//   pipeGroup.layer = 0; //back most layer

  topPipe.passed = false

  //create the bottom pipe sprite
  bottomPipe = new Sprite(bird.x + 400, midY + gap / 2 + 200, 52, 320, 'static')
  bottomPipe.img = pipe;

  pipe
}

function drawScore(x, y, score, digitWidth, digitHeight) {

  //clear all old digit sprites
  scoreDigits.removeAll();
  let scoreStr = str(score);
  let totalWidth = scoreStr.length * digitWidth;
  let startX = x - totalWidth / 2;
  for (let i = 0; i < scoreStr.length; i++) {
    let digit = int(scoreStr[i]);

    let xPos = startX + i * digitWidth;

    let digitSprite = new scoreDigits.Sprite(xPos, y, digitWidth, digitHeight);

    digitSprite.img = numberImages[digit];
  }

  moveGroup(scoreDigitd,camera.x,24);

}

function moveGroup(group,targetX,spacing) {
  let totalWidth = (group.length - 1) * spacing;

  let startX = targetX - totalWidth/2;

  for (let i = 0; i < group.length; i++) {
    group[i].x = startX + i * spacing;
  }

}
