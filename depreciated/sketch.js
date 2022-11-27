// flashlight functionality reference: https://editor.p5js.org/ebenjmuse/sketches/rJUFyTjbz

let rectSize = 30;
let particles = [];
let totalNum = 1; // Decide the number of particles here.
let imgW;
let imgH;
let img;

function preload() {
  img = loadImage("bg.png");
}

function setup() {
  // two lines below are for canvas placement on webpage
  let canvas = createCanvas(imgW, imgH);
  canvas.parent("canvasContainer");

  imgW = img.width;
  imgH = img.height;
  user = new User(imgW / 2, imgH / 2);

  // adding particles
  for (let i = 0; i < totalNum; i++) {
    particles[i] = new Particle(random(imgW), random(imgH));
  }

  // loading image setup
  pixelDensity(1);
}


function draw() {
  // flashlight --------------------- reference: https://editor.p5js.org/ebenjmuse/sketches/rJUFyTjbz
  loadPixels();
  var lightRadius = 120;
  // We must also call loadPixels() on the PImage since we are going to read its pixels.
  img.loadPixels();
  for (var y = 0; y < imgH; y++) {
    for (var x = 0; x < imgW; x++) {
      var loc = (x + y * imgW) * 4;
      // The functions red(), green(), and blue() pull out the three color components from a pixel.
      var r = img.pixels[loc];
      var g = img.pixels[loc + 1];
      var b = img.pixels[loc + 2];

      // Calculate an amount to change brightness
      // based on proximity to the mouse
      var distance = dist(x, y, user.x, user.y);

      // The closer the pixel is to the mouse, the lower the value of "distance"
      // We want closer pixels to be brighter, however, so we invert the value using map()
      // Pixels with a distance greater than the lightRadius have a brightness of 0.0
      // (or negative which is equivalent to 0 here)
      // Pixels with a distance of 0 have a brightness of 1.0.
      var adjustBrightness = map(distance, 0, lightRadius, 1, 0);
      r *= adjustBrightness;
      g *= adjustBrightness;
      b *= adjustBrightness;

      // Constrain RGB to between 0-255
      r = constrain(r, 0, 255);
      g = constrain(g, 0, 255);
      b = constrain(b, 0, 255);

      // Set the display pixel to the image pixel
      pixels[loc] = r;
      pixels[loc + 1] = g;
      pixels[loc + 2] = b;
      pixels[loc + 3] = 255; // Always have to set alpha
    }
  }

  updatePixels();
  // pixels end -----------------

  user.direction();

  user.display();

  //  Particles update and display code
  for (let i = 0; i < particles.length; i++) {
    particles[i].repelledFrom(user.x, user.y);
    particles[i].move();
    //particles[i].reappear();
    particles[i].bounce();
    particles[i].display(user.x, user.y);
    particles[i].rotate();
  }
}

//  Design interactions by using Mouse or Keyboard
function mousePressed() {
  // I decided not to add mousePressed functionality. Instead everything is controlled with keys
}

function keyPressed() {
  // use backspace button to delete particles!
  if (keyCode === BACKSPACE) {
    // if there is at least one particle,
    // delete it
    if (particles.length > 0) {
      let index = 0; // the first index = the oldest object
      particles.splice(index, 1);
    }
    // if the spacebar is pressed, add a new particle at a random location
  } else if (keyCode === 32) {
    // spacebar keycode is 32
    particles.push(new Particle(random(0, imgW), random(0, imgH)));
  }
}