//----------------------------------OOP:Class User

class User {
    constructor(startX, startY) {
      this.x = startX;
      this.y = startY;
      this.avatar = "";
    }
  
    display(self, frog) {
      noStroke();
  
      // head
      fill(210, 255, 198);
      ellipse(this.x, this.y, 40, 30);
      // eyes
      strokeWeight(1);
      stroke("black");
      fill("white");
      ellipse(this.x - 15, this.y - 15, 30, 30);
      ellipse(this.x + 15, this.y - 15, 30, 30);
  
      noStroke();
      fill("black");
      ellipse(this.x - 5, this.y - 10, 5, 5);
      ellipse(this.x + 5, this.y - 10, 5, 5);
  
      // nose
      fill(3, 0, 49);
      ellipse(this.x, this.y + 8, 10);
  
      // arms
      // push();
      // fill("black");
      // rect(this.x + 20, this.y, 10, 2);
      // rect(this.x - 30, this.y, 10, 2);
      // pop();
    }
  
    
    // I created this method for defining / controlling the user's movement based on keys
    direction(self) {
      // defining user movement based on 'AWSD' key presses
      if (this.x > 25 && keyIsDown(65)) {
        // 65 is keycode for "A" ; LEFT
        this.x -= 5;
      }
  
      if (this.x < imgW - 25 && keyIsDown(68)) {
        // 68 is keycode for "D" ; RIGHT
        this.x += 5;
      }
  
      if (this.y > 25 && keyIsDown(87)) {
        // 87 is keycode for "W" ; UP
        this.y -= 5;
      }
  
      if (this.y < imgH - 25 && keyIsDown(83)) {
        // 83 is keycode for "S" ; DOWN
        this.y += 5;
      }
    }
  
    switchAvatar(self) {
      // I did not complete this
      // It would have been for switching user appearance by mouse pressed
      // If I were to extend this project, it would be very easy to implement this
      // As I already have the code set up and linked between the project files.
    }
  }
  