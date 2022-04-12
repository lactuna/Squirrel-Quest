// global constants
const moveArrayTime = 2000;
const squirrel = "https://cdn.glitch.global/8f79f0ef-b183-4d5b-a490-d81619bbbbd7/squirrel.png?v=1649572938080";
const grass = "https://cdn.glitch.global/8f79f0ef-b183-4d5b-a490-d81619bbbbd7/grass.png?v=1649572928478";
const bread = "https://cdn.glitch.global/8f79f0ef-b183-4d5b-a490-d81619bbbbd7/bread.png?v=1649573007540";
const scooter = "https://cdn.glitch.global/8f79f0ef-b183-4d5b-a490-d81619bbbbd7/scooter.png?v=1649573013036";
const student = "https://cdn.glitch.global/8f79f0ef-b183-4d5b-a490-d81619bbbbd7/student.png?v=1649573025233";
const testudo = "https://cdn.glitch.global/8f79f0ef-b183-4d5b-a490-d81619bbbbd7/testudo.png?v=1649573018719";
const blanky = "https://cdn.glitch.global/8f79f0ef-b183-4d5b-a490-d81619bbbbd7/blanky.png?v=1649577277617";
//Global Variables
var row0 = [0,0,0]; //Use a 2D array in the future?
var row1 = [0,0,0];
var row2 = [0,0,0];
var row3 = [0,0,0];
var row4 = [0,0,0];
var rowSq = [0,1,0];
var progress = 0; //Iterate everytime a new row is initiated (logical only if no challenging rows exist when the game starts) 
var gamePlaying = false;
var lives = 3; //Use if adding lives 
var volume = 0.5; //Use if creating adding sound
var highScore = 0; //ABANDONED
var breadCount = 0;
var terpOverride = false;
var keyyy = event.key;


function startGame(){
  //initialize game variables
  progress = 0;
  breadCount = 0;
  lives = 3;
  gamePlaying = true;
  refresh();
  row0 = [0,0,0]; //Use a 2D array in the future?
  row1 = [0,0,0];
  row2 = [0,0,0];
  row3 = [0,0,0];
  row4 = [0,0,0];
  rowSq = [0,1,0]; 
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  playGame(); 
}
function stopGame(){
  gamePlaying = false;
  terpOverride = false;
  row0 = [0,0,0]; //Use a 2D array in the future?
  row1 = [0,0,0];
  row2 = [0,0,0];
  row3 = [0,0,0];
  row4 = [0,0,0];
  rowSq = [0,1,0]; 
  refresh();
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
}

function loseGame(){
  stopGame();
  highScore = progress - 4;
  alert("Game Over. You lost. You cleared " + (progress - 4) + " rows of danger and got " + breadCount + " Carbies in the process!");
}
function winGame(){
  stopGame();
  highScore = 100;
  alert("You won! You made it to Testudo and got " + breadCount + " Carbies in the process!");
  if (breadCount > 99){
    alert("Wow! Triple digit carbies! You're a true Carby Caretaker!");
  }
}


function playGame(){
  refresh();
  let delay = moveArrayTime; //set delay to initial wait time
  if (gamePlaying){ 
    if (progress == 100){
      terpOverride = true;
    }
    if (progress == 105){
      winGame();  
      return;
      }
    if (!gamePlaying){
      loseGame();
      return;
    }
    obbyCheck();
    swippySwap();
    progress++;
    refresh();
    setTimeout(playGame,delay); //Recursive method that keeps playing until game playing does not equal true
  }
}

function obbyCheck(){
  for (let i = 0; i < row4.length; i++){
    if (row4[i] >= 2 && rowSq[i] == 1){
      loseGame();
      break;
    }
    if (row4[i] >= 1 && rowSq[i] == 1){
      breadCount++;
      break;
    }
  }
}
function swippySwap(){
  if (!terpOverride){
    row0[0] = Math.floor(Math.random() * 4);
    row0[1] = Math.floor(Math.random() * 4);
    row0[2] = Math.floor(Math.random() * 4);
    //Easy Mode
    if ((row0[0] > 1 && row0[1] > 1) || (row0[0] > 1 && row0[2] > 1) || (row0[1] > 1 && row0[2] > 1)){
      row0[0] = Math.floor(Math.random() * 2);
      row0[1] = Math.floor(Math.random() * 2);
      row0[2] = Math.floor(Math.random() * 2);
    }
    if ((row0[2] > 1 && row1[1] > 1) || (row0[0] > 1 && row1[1] > 1)){
      row0[0] = Math.floor(Math.random() * 2);
      row0[2] = Math.floor(Math.random() * 2);
    }
  }
  else{
    if (row1[0] >= 0){
      row0 = [-4,-4,-4];
    }
    else if (row1[0] == -4){
      row0 = [-3,-3,-3];
    }
    else if (row1[0] == -3){
      row0 = [-2,-5,-2];
    }
    else if (row1[0] == -2){
      row0 = [-1,-1,-1];
    }
  }
    for (let i = 0; i < row4.length; i++){
      row4[i] = row3[i];
    }
    for (let i = 0; i < row4.length; i++){
      row3[i] = row2[i];
    }
    for (let i = 0; i < row4.length; i++){
      row2[i] = row1[i];
    }
    for (let i = 0; i < row4.length; i++){
      row1[i] = row0[i];
    }
  refresh();
}
function moverGroover(){
  if(!gamePlaying){
    return;
  }
  if (rowSq[0] == 1 && (keyyy == 'd' || keyyy == 'D' || keyyy == 68)){
      rowSq[0] = 0;
      rowSq[1] = 1;
  }
  else if (rowSq[2] == 1 && (keyyy == 'a' || keyyy == 'A' || keyyy == 65)){
      rowSq[2] = 0;
      rowSq[1] = 1;
  }
  else if (rowSq[1] == 1 && (keyyy == 'a' || keyyy == 'A'|| keyyy == 65)){
      rowSq[0] = 1;
      rowSq[1] = 0;
  }
  else if (rowSq[1] == 1 && (keyyy == 'd' || keyyy == 'D'|| keyyy == 68)){
      rowSq[2] = 1;
      rowSq[1] = 0;
  }
  refresh();
  obbyCheck();
}

//Makes sure that the images match what is in the array (could use toString to simplify)
function refresh() {
  if (row1[0] == 0){
    document.getElementById("10").src=grass;
  }
    if (row1[0] == 1){
      document.getElementById("10").src=bread;
    }
    if (row1[0] == 2){
      document.getElementById("10").src=scooter;
    }
    if (row1[0] == 3){
      document.getElementById("10").src=student;
    }
    if (row1[0] < 0){
      document.getElementById("10").src=blanky;
    }
  if (row1[1] == 0){
    document.getElementById("11").src=grass;
  }
    if (row1[1] == 1){
      document.getElementById("11").src=bread;
    }
    if (row1[1] == 2){
      document.getElementById("11").src=scooter;
    }
    if (row1[1] == 3){
      document.getElementById("11").src=student;
    }
    if (row1[1] == -5){
      document.getElementById("11").src=testudo;
    }
    if (row1[0] < 0){
      document.getElementById("11").src=blanky;
    }
  if (row1[2] == 0){
    document.getElementById("12").src=grass;
  }
    if (row1[2] == 1){
      document.getElementById("12").src=bread;
    }
    if (row1[2] == 2){
      document.getElementById("12").src=scooter;
    }
    if (row1[2] == 3){
      document.getElementById("12").src=student;
    }
    if (row1[2] < 0){
      document.getElementById("12").src=blanky;
    }
  if (row2[0] == 0){
    document.getElementById("20").src=grass;
  }
    if (row2[0] == 1){
      document.getElementById("20").src=bread;
    }
    if (row2[0] == 2){
      document.getElementById("20").src=scooter;
    }
    if (row2[0] == 3){
      document.getElementById("20").src=student;
    }
    if (row2[0] < 0){
      document.getElementById("20").src=blanky;
    }
  if (row2[1] == 0){
    document.getElementById("21").src=grass;
  }
    if (row2[1] == 1){
      document.getElementById("21").src=bread;
    }
    if (row2[1] == 2){
      document.getElementById("21").src=scooter;
    }
    if (row2[1] == 3){
      document.getElementById("21").src=student;
    }
    if (row2[1] == -5){
      document.getElementById("21").src=testudo;
    }
    if (row2[1] < 0){
      document.getElementById("21").src=blanky;
    }
  if (row2[2] == 0){
    document.getElementById("22").src=grass;
  }
    if (row2[2] == 1){
      document.getElementById("22").src=bread;
    }
    if (row2[2] == 2){
      document.getElementById("22").src=scooter;
    }
    if (row2[2] == 3){
      document.getElementById("22").src=student;
    }
    if (row2[2] < 0){
      document.getElementById("22").src=blanky;
    }
  if (row3[0] == 0){
    document.getElementById("30").src=grass;
  }
    if (row3[0] == 1){
      document.getElementById("30").src=bread;
    }
    if (row3[0] == 2){
      document.getElementById("30").src=scooter;
    }
    if (row3[0] == 3){
      document.getElementById("30").src=student;
    }
    if (row3[0] < 0){
      document.getElementById("30").src=blanky;
    }
  if (row3[1] == 0){
    document.getElementById("31").src=grass;
  }
    if (row3[1] == 1){
      document.getElementById("31").src=bread;
    }
    if (row3[1] == 2){
      document.getElementById("31").src=scooter;
    }
    if (row3[1] == 3){
      document.getElementById("31").src=student;
    }
    if (row3[1] < 0){
      document.getElementById("31").src=blanky;
    }
  if (row3[2] == 0){
    document.getElementById("32").src=grass;
  }
    if (row3[2] == 1){
      document.getElementById("32").src=bread;
    }
    if (row3[2] == 2){
      document.getElementById("32").src=scooter;
    }
    if (row3[2] == 3){
      document.getElementById("32").src=student;
    }
    if (row3[2] < 0){
      document.getElementById("32").src=blanky;
    }
  if (row4[0] == 0){
    document.getElementById("40").src=grass;
  }
    if (row4[0] == 1){
      document.getElementById("40").src=bread;
    }
    if (row4[0] == 2){
      document.getElementById("40").src=scooter;
    }
    if (row4[0] == 3){
      document.getElementById("40").src=student;
    }
    if (row4[0] < 0){
      document.getElementById("40").src=blanky;
    }
  if (row4[1] == 0){
    document.getElementById("41").src=grass;
  }
    if (row4[1] == 1){
      document.getElementById("41").src=bread;
    }
    if (row4[1] == 2){
      document.getElementById("41").src=scooter;
    }
    if (row4[1] == 3){
      document.getElementById("41").src=student;
    }
    if (row4[1] < 0){
      document.getElementById("41").src=blanky;
    }
  if (row4[2] == 0){
    document.getElementById("42").src=grass;
  }
    if (row4[2] == 1){
      document.getElementById("42").src=bread;
    }
    if (row4[2] == 2){
      document.getElementById("42").src=scooter;
    }
    if (row4[2] == 3){
      document.getElementById("42").src=student;
    }
    if (row4[2] < 0){
      document.getElementById("42").src=blanky;
    }
  if (rowSq[0] == 1){
    document.getElementById("40").src=squirrel;
  }
  if (rowSq[1] == 1){
    document.getElementById("41").src=squirrel;
  }
  if (rowSq[2] == 1){
    document.getElementById("42").src=squirrel;
  }
}

document.onkeypress = function(eventKeyName){moverGroover()};

// Sound Synthesis Functions
const freqMap = {
  1: 300,
  2: 400,
  3: 500,
  4: 600
}

// Page Initialization
// Init Sound Synthesizer
var AudioContext = window.AudioContext || window.webkitAudioContext 
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)