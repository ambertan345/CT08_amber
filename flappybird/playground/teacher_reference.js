
// let bird, floor, sky; // objects
// let flapMidImg,  bg, base; // images
// let flapUpImg,flapDownImg; // images for flap up and down
// let pipe; // image for pipes
// let topPipe, bottomPipe;
// let pipeGroup; // declare the group for pipe
// let gameoverImg; // declare variable for image
// let gameoverLabel; // declare variable for game over sprite
// let startGame = false;

// let startScreenLabel; // declare variable for start screen
// let startScreenImg; // declare variable for image

// let score = 0;
// let numberImages = []; // store number/score images
// let scoreDigits; // group for storing the different numbers

// //sounds variable
// let flapSound, pointSound, failSound;
// let bgSound;

// function preload() {
//     // bird image, background and the floor
//     flapMidImg = loadImage('assets/yellowbird-midflap.png'); 
//     // preload images for flap up and down
//     flapUpImg = loadImage('assets/yellowbird-upflap.png');
//     flapDownImg = loadImage('assets/yellowbird-downflap.png')

//     pipe = loadImage('assets/pipe-green.png'); // preload image for pipe

//     bg = loadImage('assets/background-day.png');
//     base = loadImage('assets/base.png');

//     gameoverImg = loadImage('assets/gameover.png'); // preload the image

//     startScreenImg = loadImage('assets/message.png'); // preload the image

//     for (let i = 0; i < 10; i++){
//       numberImages[i] = loadImage('assets/' + i +'.png');
//     }

//     flapSound = createAudio('assets/sfx_wing.mp3');
//     pointSound = createAudio('assets/sfx_point.mp3');
//     failSound = createAudio('assets/sfx_die.mp3');
//     bgSound = createAudio('assets/Luke-Bergs-Take-It-Easy(chosic.com).mp3');
// }

// function setup() {
//   new Canvas(400, 600);

//   // Bird Sprite construction
//   bird = new Sprite();
//   bird.x = width / 2;
//   bird.y = 200,
//   bird.width = 30;
//   bird.height = 30;
//   bird.img = flapMidImg; // defined earlier in preload()
//   bird.visible = false;

//   // setting bird physics
//   bird.collider = "static"; 
//   bird.mass = 2;         // heavier = stronger pull from gravity
//   bird.drag = 0.02;      // air resistance
//   bird.bounciness = 0.5; // how much it bounces when hitting floor
//   world.gravity.y = 10;

//   // Floor to bounce bird
//   floor = new Sprite();
//   floor.x = 200;
//   floor.y = height - 20;
//   floor.width = 400;
//   floor.height = 125;
//   floor.collider = "static"; 
//   floor.img = base;

//   sky = new Sprite();
//   sky.x = 0;
//   sky.y = -20;
//   sky.width = width*2;
//   sky.visible = false;
//   sky.collider = "static"
 

//   pipeGroup = new Group();

//   // setup group for score
//   scoreDigits = new Group();
//   scoreDigits.collider = 'none';
//   scoreDigits.layer = 1000;

//   // setup the start message and display
//   startScreenLabel = new Sprite(width/2, height/2, 50, 50, 'none');
//   startScreenLabel.img = startScreenImg;
  
// }

// function draw() {
//   image(bg, 0, 0, width, height);        
  
//   // at start of game, press space or mouse to start
//   if (kb.presses('space') || mouse.presses()){
//     startGame = true;
//     startScreenLabel.visible = false;
//     bird.visible = true;
//   }

//   // if startGame flag is true, then run all the other code
//   if (startGame){
//     bgSound.play();
//     // new code to make bird dynamic only when game start
//     bird.collider = "dynamic"; 
//   // make the bird move "forward"
//     bird.x += 2; // make the bird move forward
//     camera.x = bird.x; // "lock" the camera pos to the bird.x pos
//     floor.x = camera.x;// "lock" the floor pos to the bird.x pos
//     sky.x = camera.x;

//       // Apply upward push when space is pressed
//     if (kb.presses('space') || mouse.presses()) {
//       flapSound.play();
//       bird.vel.y = -5; // which direction do you think this is?
//       bird.sleeping = false; // wake up if sleeping
     
//     }
    
//     // Activity: Change image according to flying action/ falling
//     if (bird.vel.y < -1) {
//        flapSound.play();
//       bird.img = flapUpImg; // flying upward
//       bird.rotation = -30; // rotate up
//     } 
//     else if (bird.vel.y > 1) {
//        flapSound.play();
//       bird.img = flapDownImg; // falling
//       bird.rotation = 30; // rotate down
//     } 
//     else {
//       bird.img = flapMidImg; // neutral
//       bird.rotation = 0;
//     }

//     if (frameCount === 1){
//       spawnPipePair();
//     }

//     if (frameCount % 120 === 0){
//       spawnPipePair();
//     }
    
//     // remove offscreenpipes
//     for (let pipe of pipeGroup){
//       if (pipe.x < camera.x - 250){ ///Note
//         pipe.remove();
//       }
//     }

//     for(let pipe of pipeGroup){
//       let pipeRightEdge = pipe.x + pipe.w/2;
//       let birdLeftEdge = bird.x - bird.w/2;

//       if(pipe.passed == false && pipeRightEdge < birdLeftEdge ){
//         pipe.passed = true;
//         pointSound.play();
//         score++;
//       }

//     }

//     drawScore(width/2, 20, score, 24, 36);

//     // End Game on Collision
//     // note that this is checking collision against the group
//     if (bird.collides(pipeGroup) || bird.collides(floor) || bird.collides(sky)){
//       failSound.play();
//       gameoverLabel = new Sprite(width/2, height/2, 192, 42);
//       gameoverLabel.img = gameoverImg;
//       gameoverLabel.layer = 100; // make the game over text come to front
//       gameoverLabel.x = camera.x;
//       bgSound.stop();
//       noLoop(); 

//       setTimeout(() => {
//         score = 0;
//         startGame = false;

//         pipeGroup.removeAll();
//         bird.vel.x = 0;
//         bird.vel.y = 0;
//         bird.rotation = 0;
//         bird.collider = 'static';
//         bird.y = 200;
//         bird.visible = false;

//         gameoverLabel.remove();
//         startScreenLabel.visible = true;
//         startScreenLabel.x = bird.x;
//         startScreenLabel.y = height/2 - 50;
        
//         loop();


//       },3000);

//     }



//     // Debug info (optional)
//     fill("blue");
//     textSize(14);
//     text('vel.y: ' + bird.vel.y.toFixed(2), 10, 20);
//     text('isMoving: ' + bird.isMoving, 10, 40);
//     text('sleeping: ' + bird.sleeping , 10, 60);
//     text('bird.x: ' + bird.x.toFixed(2), 10, 80);
//   }
  
// }
 
// /* 
// Function to create a pair of pipes
// and add it to the group
// */ 
// function spawnPipePair(){
//   // control the gap and height of the top and bottom pipe
//   let gap = 70;
//   // let midY = height / 2;
//   let midY = random(250, height - 250); // random(min, max)

//   // create the top pipe
//   topPipe = new Sprite(bird.x + 400, midY - gap / 2 - 200, 52, 320, 'static');
//   topPipe.img = pipe;
//   topPipe.rotation = 180;

//   topPipe.passed = false;

//   // create the bottom pipe sprite
//   bottomPipe = new Sprite(bird.x + 400, midY + gap / 2 + 200, 52, 320, 'static');
//   bottomPipe.img = pipe;

//   pipeGroup.add(topPipe);
//   pipeGroup.add(bottomPipe);
//   pipeGroup.layer = 0;
// }


// function drawScore(x, y, score, digitWidth, digitHeight) {

//   // Clear old digit sprites
//   scoreDigits.removeAll();
//   // make it a string so we can get each digit indivisually rather than a value
//   let scoreStr = str(score);
//   // total width taken up by all digits
//   let totalWidth = scoreStr.length * digitWidth;
//   // starting x coordinates
//   let startX = x - totalWidth / 2;

//   for( let i = 0; i < scoreStr.length; i++){

//     let digit = int(scoreStr[i]); //gets the first digit in the score

//     let xPos = startX + i * digitWidth;

//     let digitSprite = new scoreDigits.Sprite(xPos, y, digitWidth, digitHeight);

//     digitSprite.img = numberImages[digit];
//   }

//   moveGroup(scoreDigits,camera.x,24);

// }

// function moveGroup(group,targetX,spacing){
//     let totalWidth = (group.length -1) * spacing;

//     let startX = targetX - totalWidth/2;

//     for(let i = 0; i < group.length; i++){
//         group[i].x = startX + i * spacing;
//     }
// }