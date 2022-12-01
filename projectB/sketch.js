// p5.js drum machine
// incorporating elements of tone.js library
// Inspiration: https://editor.p5js.org/asd0999/sketches/r1od2atFQ

// setting global variables
let beat = 0;
let value = 0;

let cells = [];

let buttonColor = "#7c3f58";
let textColor = "#e2f3e4";
let bpmTextColor = "#e2f3e4";
let canvasColor = "#ee8695";
let gridColor = "##e2f3e4";

// amount of steps or beats in one musical line
let numSteps = 8; // number of columns / loop (x-axis)
let currentStep = 0;
let numSamples = 4; // number of sounds / kit (y-axis)

// button for play/pause, slider for controlling BPM / speed
let playButton;
let slider;

// other settings
let a = 40; // cell height variable
let b = 25; // cell width variable
let gridW, gridH, cellW, cellH; // initializing values for grid
let colors = ["#292831", "#333f58", "#4a7a96", "#96b0b3" ]; // array of colors

// sample kits/sounds
let beats; // kit 1
let trap; // kit 2
let mix; // kit 3
let kitChosen; // variable for choosing drum kit
let soundNames = ["kick", "snare", "hat", "other"];
// associate different sounds with each kit
//Tone.Player is a way to load and play back an audio file

// three sets of beat sounds ----------------------------
beats = new Tone.Players({
  kick: "sounds/beats/kick1.wav",
  snare: "sounds/beats/snare1.wav",
  hat: "sounds/beats/hat1.wav",
  other: "sounds/beats/other1.wav",
});

// to be replaced with different kit sounds //
trap = new Tone.Players({
  kick: "sounds/trap/kick2.wav",
  snare: "sounds/trap/snare2.wav",
  hat: "sounds/trap/hat2.wav",
  other: "sounds/trap/other2.wav",
});
mix = new Tone.Players({
  kick: "sounds/mix/kick3.mp3",
  snare: "sounds/mix/snare3.mp3",
  hat: "sounds/mix/hat3.mp3",
  other: "sounds/mix/other3.mp3",
});

// ----------------------------

// toMaster function connects the output to the context's destination node
beats.toMaster();
trap.toMaster();
mix.toMaster();

// transport is a timekeeper function in tone.js
//8th means 8th notes
Tone.Transport.scheduleRepeat(onTheBeat, "8n");



// slider for bpm
function setup() {
  mascot = new mascot(340, 600);
  
  slider = createSlider(0, 200, 100);
  slider.position(900, 810);
  slider.style("width", "200px");

  // drop down menu to select kit
  menu = createSelect();
  menu.position(430, 745);
  menu.size(150, 70);
  menu.style('background-color', buttonColor);
  menu.style("font-family", "Fredoka One");
  menu.style("font-size", "30px");
  menu.style("text-align", "center");
  menu.style("border-width", "0px") // get rid of border width
  menu.style("color", textColor)
  menu.style("border-radius", "20px")
  menu.selected("beats");
  menu.option("beats");
  menu.option("trap");
  menu.option("mix");
  menu.changed(mySelectEvent);
  kitChosen = menu.value();

  // initialize cell
  // OFF = 0, ON = 1
  for (let sample = 0; sample < numSamples; sample++) {
    cells[sample] = [];
    for (let step = 0; step < numSteps; step++) {
      cells[sample][step] = 0;
    }
  }

  // play button
  playButton = createButton("PLAY");
  playButton.position(650, 740);
  playButton.mouseClicked(togglePlay);
  playButton.style('background-color', buttonColor);
  playButton.size(200, 100);
  playButton.style("font-family", "Fredoka One");
  playButton.style("color", textColor)
  playButton.style("font-size", "48px");
  playButton.style("border-width", "0px") // get rid of border/stroke
  playButton.style("border-radius", "20px")

  // grid
  let canvas = createCanvas(800, 700);
  canvas.parent("canvasContainer"); // placement for interactive window
  gridW = width - 2 * b;
  gridH = height / 2 - 2 * a;
  cellW = gridW / numSteps;
  cellH = gridH / numSamples;
}

function onTheBeat(time) {
  currentStep = beat % numSteps;
  for (let sample = 0; sample < numSamples; sample++) {
    if (cells[sample][currentStep]) {
      let k, k2, k3;
      if (kitChosen == "beats") {
        k = beats.get(soundNames[sample]);
        k.start(time);
      } else if (kitChosen == "trap") {
        k2 = trap.get(soundNames[sample]);
        k2.start(time);
      } else if (kitChosen == "mix") {
        k3 = mix.get(soundNames[sample]);
        k3.start(time);
      }
    }
  }
  beat++;
}

function draw() {
  background(canvasColor);
  
  mascot.display();
  mascot.update();

fill("#7c3f58")
  noStroke();
  rect(610, 360, 80, 45, 20);
  textSize(24);
  fill(bpmTextColor);
  noStroke();
  
  text('BPM', 625, 390);
  
  textFont('Fredoka One');
  // setting up the slider
  let maxBpm = slider.value();

  // use Tone.Transport...
  Tone.Transport.bpm.value = maxBpm;
  fill(value);

  // fill the cells in grid
  for (let step = 0; step < numSteps; step++) {
    for (let sample = 0; sample < numSamples; sample++) {
      if (cells[sample][step] == 1) {
        fill(colors[sample]);
        rect(
          b + step * cellW,
          a + sample * cellH,
          cellW,
          cellH
        );
      }
    }
  }

  // horizontal lines
  for (let i = 0; i <= numSamples; i++) {
    let y = a + i * cellH;
    right = width - b;
    strokeWeight(3);
    stroke(gridColor);
    
    line(b, y, right, y);
  }

  // vertical lines
  noStroke();
  for (let i = 0; i <= numSteps; i++) {
    right = width - b;
    strokeWeight(3);
    stroke(gridColor);
    
    line(b + i * cellW, a, b + i * cellW, a + gridH);

    // highlight the cell that is playing
    let step = (beat - 1) % numSteps;
    if (i == step && Tone.Transport.state == "started") {
      fill(0,40); // highlight column with a shade of black
      noStroke();
      rect(b + i * cellW, a, cellW, gridH);
    }
  }
  
  
}


function mousePressed() {
  // make sure the mouse is in the grid
  if (
    b < mouseX &&
    mouseX < b + gridW &&
    a < mouseY &&
    mouseY < a + gridH
  ) {
    // margins
    let x = mouseX - b;
    let y = mouseY - a;

    // which cell is clicked
    let i = floor(x / cellW);
    let j = floor(y / cellH);

    // cell on/off switch
    cells[j][i] = !cells[j][i];
  }
}
// PLAY / PAUSE button
function togglePlay() {
  if (Tone.Transport.state == "started") {
    Tone.Transport.stop();
    playButton.html("PLAY");
  } else {
    if (beats.loaded && trap.loaded) {
      Tone.Transport.start();
      playButton.html("PAUSE");
    }
  }
}

// select the kits mySelectEvent is a function in p5.js
function mySelectEvent() {
  if (menu.value() == "beats") {
    kitChosen = "beats";
  } else if (menu.value() == "trap") {
    kitChosen = "trap";
  } else if (menu.value() == "mix") {
    kitChosen = "mix";
  }
  // say which kit is selected and playing in console
  console.log("playing kit: " + kitChosen);
}
