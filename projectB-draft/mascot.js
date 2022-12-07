class mascot {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
  }
  update() {
    //this.x = this.x + sin(frameCount * 0.1) * 5; // make him move side to side!
    //this.y = this.y + cos(frameCount * 0.1)*2;
  }
  display() {
    push();
    translate(this.x, this.y);

    drawArms(0, 0, 5);
    noStroke();
    // creature head
    fill("#fff6d3");
    ellipse(0, 0, 160, 80);

    // eyes
    fill("#fff6d3");
    ellipse(-50, -40, 50, 50);
    ellipse(50, -40, 50, 50);
    fill("#7c3f58");
    ellipse(-50, -40, 30, 30);
    ellipse(50, -40, 30, 30);
    // mouth
    rect(-14, 0, 30, 8);

    //arms - they are drumming!!
    function drawArms(x, y, speed) {
      push();
      let angle = frameCount / speed;
      //rotate(radians(cos(angle) * 8));
      translate(0, -10);
      strokeWeight(15);
      stroke("#7c3f58");

      //left arm
      curve(-7, 17, -37, 47, -58, 28, -19, 40);

      //right arm
      curve(7, 17, 37, 49, 58, 30, 19, 42);
      pop();
    }

    pop();
  }
}
