//creating a class of Rocks so it can be utilized in an array

class Rock {

  constructor() {
    //randomized positions so that the objects don't show up in the same place over & over.
    this.MetX = random(50, width-50);
    this.MetY = random(-200, -100);
    this.diameter = random(150, 250);
    this.yspeed = random(3, 10);
  }

  display() {
    stroke(255);
    fill(120);
    //uses the rock image and generates it in different sizes & positions.
    image(rock, this.MetX, this.MetY, this.diameter, this.diameter);
  }

  descend() {

    //adds random falling speed to falling rocks

    this.MetY += this.yspeed;

    //this makes it so that the rocks reset at a new position with a new speed and size everytime it reaches the bottom of the canvas

    if (this.MetY>height) {
      this.yspeed = random(3, 10); 
      this.MetX = random(50, width-50);
      this.diameter = random(150, 250);
      this.MetY = random(-200, -100);
    }
  }

  checkCollisions() {

    //The loops are there so that everytime there is a collision you lose a life.
    //This continues until there are no more lives & you lose the game.
    //the collisions are measured using the dist functions.

    let d = dist(this.MetX + this.diameter / 2, this.MetY + this.diameter / 2, CharXPos + 70 / 2, CharYPos2 + 70 / 2);

    //considers the radius of the rock as well as the character
    //that way the collision counts for when the center points intersect. 
    //everytime the character gets hit, a heart moves off screen.
    if (d < (this.diameter + 70 / 3) && HeartX2 == -200) {
      HeartX1 = -200;
      gameScreen = 2;
      for (let i = 0; i < fallingRocks.length; i++) {
        fallingRocks[i] = new Rock();
      } 
      
    }
    else if (d < (this.diameter/2 + 70 / 3) && HeartX3 == -200) {
      HeartX2 = -200;
      for (let i = 0; i < fallingRocks.length; i++) {
        fallingRocks[i] = new Rock();
      }
    } 
    else if (d < (this.diameter / 2 + 70 / 3)) {
      for (let i = 0; i < fallingRocks.length; i++) {
        fallingRocks[i] = new Rock();
      } 
      HeartX3 = -200; 
      for (let i = 0; i < fallingRocks.length; i++) {
        fallingRocks[i] = new Rock();
      }
      
    }  
  
  }
}
