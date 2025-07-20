function setup() {
  // Set up the canvas
  new Canvas(800, 400);
  background(250); //background color

  // Basic shape testing
  // write your codes here
  // End Basic shape testing
    fill("skyblue");
    stroke("pink");
    strokeWeight(10);

  // Create a bouncing ball sprite
  // write your codes here
  ball - new Sprite()
//location of ball
ball.x = 100;
ball.y = 200;
ball.diameter = 40;
ball.color = "blue";
ball.vel.x = 3;
ball.vel.y = 3;
ball.bounciness = 1;
ball.collider = "dynamic" //optional

box = new Sprite();
box.x = 100;
box.y = 100;
box.w = 50;
box.h = 50;
box.color = "green";
box.collider = "static" //fixed
}


function draw() {
  // write your codes here
  background(250);
  if (ball.x < 0 + ball.diameter / 2 || ball.x > width - ball.diameter / 2){//collisons
    ball.vel.x *= -1;
  }
  if (ball.y < 0 + ball.diameter / 2 || ball.y > height - ball.diameter / 2){
    ball.vel.y *= -1;
  }

  box.x = mouse
}

