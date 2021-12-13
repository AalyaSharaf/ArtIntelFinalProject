//Aalya Sharaf
//Final Project
//December 14, 2021

let font;

var gameScreen = 0;

//elements in the background of the game
let clouds;
let grass;

//the falling object
let rock;

//game hearts
let Heart;
let HeartX1 = 10;
let HeartX2 = 60;
let HeartX3 = 110;

//character position variables
let CharXPos;
let CharYPos1;
let CharYPos2;
let CharSpeed = 10;

//Array called from my class
let fallingRocks = [];

//video elements
let capture;
let poseNet;
let poses;

function preload(){
  //loading in all the images needed
  font = loadFont ("data/BalooBhaijaan2-Bold.ttf");
  Heart = loadImage("data/Heart.png");
  clouds = loadImage("data/clouds.png");
  grass = loadImage("data/grass.png");
  rock = loadImage("data/rock.png");
}

// time variable for delay & Capture variable
let time;
let captureX;
let captureY;

function setup() {
  createCanvas (windowWidth, windowHeight);
  //adding video element
  capture = createCapture(VIDEO);

  //size of the video
  captureX = 300;
  captureY = 0.75 * captureX;
  capture.size(captureX, captureY);
  capture.hide();

  //loading posenet model, taken from ml5 website. 
  poseNet = ml5.poseNet(capture, () => {
    console.log("Model loaded.");
  });

  //adds a delay, without it the character would be too jittery in its movements. 
  time = millis();
  CharXPos = width / 2;
  CharYPos1 = height - 130;
  CharYPos2 = height - 130;

  //measures the right wrist position
  poseNet.on('pose', (results) => {
    if(results.length > 0){
      let wrist = results[0].pose.rightWrist;
      let xPosition = wrist.x;
      let confidence = wrist.confidence;

      //creating a condition -> moves the character according to wrist position. 
      if(confidence > 0.2 && millis() - time > 20){
        if(xPosition > (captureX / 2 + 25)){
          moveCharacter("left");
        }else if(xPosition < (captureX / 2 - 25)){
          moveCharacter("right");
        }

        time = millis();
      }
    }
  });
  
  //calls the class, an array of falling objects
  for (let i = 0; i < 4; i++) {
    fallingRocks.push(new Rock());
  }
}

function homeScreen() {
  
  // all text displayed on the main screen
  background(135, 206, 235);
  // homeDesign();
  textFont (font);
  // strokeWeight(4);
  // stroke(255);
  // fill(135, 206, 235);
  // rectMode (CENTER);
  // rect(width/2, height/2, 600, 300);
  // fill(255, 183, 3);
  fill(223, 113, 27);
  noStroke();
  textAlign(CENTER);
  textSize(80);
  text("Click to Start", width/2, height/2 - 40);
  rectMode (CENTER);
  textSize(35);
  fill(255, 255, 0);
  text("Objective: Avoid falling Objects!", width/2, height/2 + 40);
}

function game() {
  //the details & mechanics of the game further explained in other areas of the code
  background(135, 206, 235);
  image(clouds, 0, 0, windowWidth);
  image(grass, 0, windowHeight-150, windowWidth);
  drawCharacter();
  image(capture, width - 300, height - 300);
  gameLives();
  
  //for loop so I am able to call on my array of objects at the start of the game
  
  for (let i = 0; i < fallingRocks.length; i++) {
    fallingRocks[i].display();
    fallingRocks[i].descend();
    fallingRocks[i].checkCollisions();
  }
}

function gameOverScreen() {
  //all the texts displayed on the gameover screen
  background(135, 206, 235);
  textFont (font);
  fill(223, 113, 27);
  noStroke();
  textAlign(CENTER);
  textSize(80);
  text("Game Over!", width/2, height/2 - 40);
  rectMode (CENTER);
  textSize(35);
  fill(255, 255, 0);
  text("Click to Play Again", width/2, height/2 + 40);
}

function drawCharacter() {
  noStroke();
  fill (220, 36, 84);
  ellipse (CharXPos, CharYPos1, 70, 70);
  // fill (135, 206, 235);
  // ellipse (CharXPos, CharYPos2, 40, 40);
}

function moveCharacter(direction) {

  //implementing controls to move the spaceship
  if (direction == "right") {
      CharXPos += CharSpeed;
  }
  else {
      CharXPos += -CharSpeed;
  }
  
  // these two if statements create a boundary so spaceship cant go off screen. 
  if (CharXPos < 0) {
    CharXPos = 0;
  } 
  if (CharXPos>width) {
    CharXPos = 0;
  }
}

function gameLives() {
  //places the lives on the game screen  
 image(Heart, HeartX1, 10);
 image(Heart, HeartX2, 10);
 image(Heart, HeartX3, 10);
}

function homeDesign(){
  
  //the rocket and planet images found on the home screen
  
  // image(Alien, -30, height-200);
  // image(Rocket, 400, 10);
}


function draw() {

  // the gamescreen variable allows to easliy switch between screens.
  // 0: Home Screen, 1: Game Screen, 2: Game Over Screen

  if (gameScreen == 0) {
    homeScreen();
  } else if (gameScreen == 1) {
    game();
  } else if ( gameScreen == 2) {
    gameOverScreen();
  }
}


function mousePressed() {

  //this is to be able to transition between the different game screens when the mouse is pressed

  if (gameScreen == 0) {
    startGame();
  }
  if (gameScreen == 2) {
    resetGame();
  }
}

function startGame() {
  gameScreen = 1;
}

function resetGame() {

  //all the details that are needed to start a new game are stored in this functions so that everytime the game is over, they are loaded again. 

  CharXPos = width/2;

  // //this resets the meteorites at the top of the screen

  for (let i = 0; i < fallingRocks.length; i++) {
    fallingRocks[i].display();
    fallingRocks[i].descend();
    fallingRocks[i].checkCollisions();
  }

  //this replaces with new game lives

  HeartX1 = 10;
  HeartX2 = 60;
  HeartX3 = 110;
  gameScreen = 0;
}