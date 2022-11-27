//------------------OOP:Class Particle
class Particle {
    //  Constructor Function:properties
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.xSpd = random(-3, 1);
      this.ySpd = random(-3, 1);
      this.xdia = random(10, 15);
      this.ydia = random(15, 25);
      this.scaleAmount = random(1, 7);
      this.rotAngle = random(TWO_PI); // radians
      this.rotSpd = random(0.01, 0.02);
    }
  
    // methods
    move() {
      this.x += this.xSpd;
      this.y += this.ySpd;
    }
  
    //  Particle's appearance
    // Design the particle's appearance here.
      // YOUR CODE GOES HERE:
    display(targetX, targetY) {
      push();
      let distance = dist(this.x, this.y, targetX, targetY);
      
      // mapping the distantance and opacity so particles further from user lose opacity
      let opacity = map(distance, 200, 250, 100, 0); 
      // distance, range of distances, range of opacity 0-255
      
      translate(this.x, this.y);
      rotate(this.rotAngle);
      noStroke();
      
      // part of particle design
      fill(80, 42, 69, opacity); // opacity mapping to here
      ellipse(0, 0, this.xdia, this.ydia);
      
      // other part of particle design
      fill(135, 186, 197, opacity); // opacity mapping to here
      ellipse(
        this.scaleAmount,
        this.scaleAmount,
        this.ydia + this.scaleAmount, // these lines --> for fine-tuned variability
        this.xdia + this.scaleAmount
      );
      
      // rectangular parts of particle design
      fill(129, 110, 160, opacity);
      rect(-10, 0, this.scaleAmount * 3, this.scaleAmount * 3);
      pop();
    }
  
    // -------- PARTICLE BEHAVIORS ------------
    // NOTE: I changed the methods and this one is no longer used.
    // // First Method of particle: reappear
    // reappear() {
    //   if (this.x < 0) {
    //     this.x = imgW;
    //     this.xSpd = random(-3, 1);
    //   } else if (this.x > imgH) {
    //     this.x = 0;
    //     this.xSpd = random(-3, 1);
    //   }
    //   if (this.y < 0) {
    //     this.y = imgW;
    //     this.ySpd = random(-3, 1);
    //   } else if (this.y > imgH) {
    //     this.y = 0;
    //     this.ySpd = random(-3, 1);
    //   }
    // }
  
    // Method: Make particles bounce when they hit the edge of the screen
    bounce() {
      if (this.x < 0 || this.x > width) {
        this.xSpd *= -1;
      }
      if (this.y < 0 || this.y > height) {
        this.ySpd *= -1;
      }
    }
    // Method: make the particles repelled from the user (defined in a different class)
    repelledFrom(targetX, targetY) {
      // With dist(), we can easily get the distance
      // between the particle's current position and the target position.
      let distance = dist(this.x, this.y, targetX, targetY);
      // If the distance is too close (less than 30),
      // we apply the repelling acceleration (actually Force in Physics)
      if (distance < 30) {
        // By calculating "target position - this position"
        // we can get the direction to the target.
        // Then we FLIP the direction by multiplying with -1.
        // We also arbitrary decrease the acceleration to reach the target
        let xAcc = (targetX - this.x) * -1 * random(-0.2, -0.1);
        let yAcc = (targetY - this.y) * -1 * random(-0.2, -0.1);
        this.xSpd += xAcc;
        this.ySpd += yAcc;
        this.xSpd = constrain(this.xSpd, -2, 2);
        this.ySpd = constrain(this.xSpd, -2, 2);
      }
    }
    // Method: using the attributes for rotational angls, make the particles rotate
  
    rotate() {
      this.rotAngle += this.rotSpd;
    }
  }
  