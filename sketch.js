var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allAthletes;
var distance = 0;
var database;

var form, player, game;

var athletes, athlete1, athlete2, athlete3, athlete4;

var  athlete1Img, athlete2Img, athlete3Img, athlete4Img;

var hurdle

function preload(){
  athlete1Img = loadImage("../images/athlete1.png");
  athlete2Img = loadImage("../images/athlete2.png");
  athlete3Img = loadImage("../images/athlete3.png");
  athlete4Img = loadImage("../images/athlete4.png");
  ground = loadImage("../images/track.jpg");
}

function setup(){
  canvas = createCanvas(displayWidth - 30, displayHeight+290);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  hurdle=new Hurdles();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
    hurdle.erect();
  }
  if(gameState === 2){
    game.end();
  }
}
