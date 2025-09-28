  // write your codes here
let bird, floor, sky;
let flapMidImg, bg, base;

let flapUpImg, flapDownImg;

let pipe;//pipe image
let pipeGroup;// to organise
let bottomPipe, topPipe; //bottom first, then top pipe
let gameoverImg; // declare variable for image
let gameoverLabel; // declare variable for game over sprite
let startGame = false;

let score = 200;
let numberImages = []; // store number/score images
let scoreDigits; // group for storing the different numbers
let flapSound, pointSound, failSound;
let bgSound;


function preload(){
  flapMidImg = loadImage('assets/yellowbird-midflap.png');
  bg = loadImage('assets/background-day.png');
  base = loadImage('assets/base.png');
  flapUpImg = loadImage('assets/yellowbird-upflap.png');
  flapDownImg = loadImage('assets/yellowbird-downflap.png');

  pipe = loadImage('assets/pipe-green.png'); 
  
  gameoverImg = loadImage('assets/gameover.png');
  startScreenImg = loadImage('assets/message.png');

  for (let i = 0; i < 10; i++){
      numberImages[i] = loadImage('assets/' + i +'.png');
    }

  flapSound = createAudio('assets/sfx_wing.mp3');
  pointSound = createAudio('assets/sfx_point.mp3');
  failSound = createAudio('assets/sfx_die.mp3');
  bgSound = createAudio('assets/Luke-Bergs-Take-It-Easy(chosic.com).mp3');
}

function setup(){
  new Canvas(400, 600)

  //bird sprite
  bird = new Sprite();
  bird.x = width/2
  bird.y = 200;
  bird.width = 30;
  bird.height = 30;
  bird.img = flapMidImg;
  bird.visible = false;

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
  floor.img = base;

  sky = new Sprite();
  sky.x = 0;
  sly.y = 20;
  sky.width = width*2;
  sky.visible = false;
  sky.collider = "static";



  pipeGroup = new Group();
    // setup group for score
  scoreDigits = new Group();
  scoreDigits.collider = 'none';
  scoreDigits.layer = 1000;

  // setup the start message and display
  startScreenLabel = new Sprite(width/2, height/2, 50, 50, 'none');
  startScreenLabel.img = startScreenImg;
}

function draw(){
  image(bg, 0, 0, width, height);

  if ( kb.presses('space') || mouse.presses()) {
    startGame = true;
     startScreenLabel.visible = false;
    bird.visible = true;
  }
  if (startGame){
    bgSound.play();
    // new code to make bird dynamic only when game start
    bird.collider = "dynamic"; 
  // make the bird move "forward"
    bird.x += 2; // make the bird move forward
    camera.x = bird.x; // "lock" the camera pos to the bird.x pos
    floor.x = camera.x;// "lock" the floor pos to the bird.x pos
    sky.x = camera.x;

      // Apply upward push when space is pressed
    if (kb.presses('space') || mouse.presses()) {
      flapSound.play();
      bird.vel.y = -5; // which direction do you think this is?
      bird.sleeping = false; // wake up if sleeping
     
    }
    
    // Activity: Change image according to flying action/ falling
    if (bird.vel.y < -1) {
       flapSound.play();
      bird.img = flapUpImg; // flying upward
      bird.rotation = -30; // rotate up
    } 
    else if (bird.vel.y > 1) {
       flapSound.play();
      bird.img = flapDownImg; // falling
      bird.rotation = 30; // rotate down
    } 
    else {
      bird.img = flapMidImg; // neutral
      bird.rotation = 0;
    }

    if (frameCount === 1){
      spawnPipePair();
    }

    if (frameCount % 120 === 0){
      spawnPipePair();
    }
    
    // remove offscreenpipes
    for (let pipe of pipeGroup){
      if (pipe.x < camera.x - 250){ ///Note
        pipe.remove();
      }
    }

    for(let pipe of pipeGroup){
      let pipeRightEdge = pipe.x + pipe.w/2;
      let birdLeftEdge = bird.x - bird.w/2;

      if(pipe.passed == false && pipeRightEdge < birdLeftEdge ){
        pipe.passed = true;
        pointSound.play();
        score++;
      }

    }

    drawScore(width/2, 20, score, 24, 36);

    // End Game on Collision
    // note that this is checking collision against the group
    if (bird.collides(pipeGroup) || bird.collides(floor) || bird.collides(sky)){
      failSound.play();
      gameoverLabel = new Sprite(width/2, height/2, 192, 42);
      gameoverLabel.img = gameoverImg;
      gameoverLabel.layer = 100; // make the game over text come to front
      gameoverLabel.x = camera.x;
      bgSound.stop();
      noLoop(); 

      setTimeout(() => {
        score = 0;
        startGame = false;

        pipeGroup.removeAll();
        bird.vel.x = 0;
        bird.vel.y = 0;
        bird.rotation = 0;
        bird.collider = 'static';
        bird.y = 200;
        bird.visible = false;

        gameoverLabel.remove();
        startScreenLabel.visible = true;
        startScreenLabel.x = bird.x;
        startScreenLabel.y = height/2 - 50;
        
        loop();


      },3000);

    }



    // Debug info (optional)
    fill("blue");
    textSize(14);
    text('vel.y: ' + bird.vel.y.toFixed(2), 10, 20);
    text('isMoving: ' + bird.isMoving, 10, 40);
    text('sleeping: ' + bird.sleeping , 10, 60);
    text('bird.x: ' + bird.x.toFixed(2), 10, 80);
  }
}



function spawnPipePair(){
  let gap = 60;
  let midY = random(250, height-250);

  // bottomPipe = new Sprite(bird.x + 400, midY +gap+200, 52, 320, "static");
  // bottomPipe.img = pipeImg;

  // pipeGroup.add(bottomPipe);

  topPipe = new Sprite(bird.x + 400, midY -gap-200, 52, 320, "static");
  topPipe.img = pipe;
  topPipe.rotation = 180; //semi-circle turn

  //   pipeGroup.add(topPipe);

  //   pipeGroup.layer = 0; //back most layer

  topPipe.passed = false

  //create the bottom pipe sprite
  bottomPipe = new Sprite(bird.x + 400, midY + gap / 2 + 200, 52, 320, 'static')
  bottomPipe.img = pipe;

  pipeGroup.add(topPipe);
  pipeGroup.add(bottomPipe);
  pipeGroup.layer = 0;
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
