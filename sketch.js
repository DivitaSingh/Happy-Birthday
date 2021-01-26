var score = 0;
var PLAY = 0;
var Chances = 3;
var END = 1;
var gameState = PLAY;
var froz,back1,design,rock,redo;
var back,invisibleGround,elsa,restart,snowGroup,obstaclesGroup;
var invisibleGround,snow,obstacle; 

function preload(){
  froz=loadImage("Elsa.png");
  back1=loadImage("background.png");
  design=loadImage("design.png");
  rock=loadImage("Rock2.png");
  redo=loadImage("Redo.png");
  faster=loadImage("buster.png");
  sound1=loadSound("Recording.m4a");
  //sound2=loadSound("Recording-1.m4ava");
  frame=loadImage("Frame.png");
 
}

function setup() {
  createCanvas(550,360);
  
back=createSprite(300,180);
back.addImage(back1);
back.scale=2;
back.velocityX=-1.2;
back.x = back.width /2;
  
invisibleGround=createSprite(300,100,600,10);
invisibleGround.visible = false;

invisibleGround2=createSprite(300,430,600,10);
invisibleGround2.visible = false;

elsa=createSprite(100,250,50,50 ); 
elsa.addImage(froz);
elsa.scale=0.40; 
elsa.debug=false;
elsa.setCollider("rectangle",-3,-9,50,250);

var note=createSprite(850,345,50,50);
note.addImage(frame);
note.velocityX=-3;
  
restart=createSprite(270,250,10,10);
restart.addImage(redo);
restart.scale = 0.5;  

boosterGroup = new Group();
snowGroup = new Group();
obstaclesGroup = new Group();
  
}
function draw() {
  background("Aqua");
  
  
   if(gameState === PLAY){
   
     
    restart.visible = false;   
    score = score + Math.round(getFrameRate()/60);
    if (back.x < 0){
      back.x = back.width/2;
    }   
     if(keyDown("up")){
    elsa.y=elsa.y-3.5;
  } 
  if(keyDown("down")){
    elsa.y=elsa.y+3.5;
  } 
    spawnbooster();
    spawnsnow();
    spawnObstacles();
   
   if (elsa.y<150 && elsa.y>100){
    elsa.scale=0.25;
  }
  if (elsa.y<200 && elsa.y>150){
    elsa.scale=0.30;
  }
  if (elsa.y<250 && elsa.y>200){
    elsa.scale=0.35;
  }
  if (elsa.y<300 && elsa.y>250){
    elsa.scale=0.45;
  }     
    
    if (elsa.isTouching(boosterGroup)){
        score=score+250;
        boosterGroup.destroyEach(0);
        sound1.play();
    }
   if(obstaclesGroup.isTouching(elsa)){
        gameState = END;     
        //sound2.play();
   }  
 }
  else if (gameState === END) {
      
      restart.visible = true;    
      back.velocityX = 0;
      elsa.velocityY = 0
      obstaclesGroup.setLifetimeEach(-1);    
      obstaclesGroup.setVelocityXEach(0);   
      boosterGroup.setVelocityXEach(0);
     if(mousePressedOver(restart)) {
      reset();
    }
  } 
 elsa.collide(invisibleGround);
 elsa.collide(invisibleGround2);
  //spawn the snow
 spawnsnow();
 drawSprites();
  
  fill("black");
 textSize(20);
 textFont("Algerian");
 stroke("blue");
 text("Score : " +score  ,400,20)
  
}

function spawnsnow() {
  if (frameCount % 80 === 0) {
   snow = createSprite(200,50);
   snow.x=Math.round(random(20,600));
   snow.addImage(design);
   //console.log(snow.x);
   snow.scale = 0.1;
   snow.velocityY =2.5;
   snow.setlifetime = 800;
   snowGroup.add(snow);
  } 
}
function spawnbooster() {
  if (frameCount % 650 === 0) {
   booster = createSprite(1650,50);
   booster.y=Math.round(random(130,330));
   booster.addImage(faster);
   booster.scale = 0.3;
   booster.velocityX =-2.2;
   booster.setlifetime = 800;
   boosterGroup.add(booster);
  } 
}
  
function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(1000,165,10,40);
   obstacle.addImage(rock);
   obstacle.y=Math.round(random(130,330));
   obstacle.velocityX = -6;
   obstacle.scale = 0.2;
   obstacle.debug=false;
   obstacle.setCollider("circle",0,0,105);
   var rand = Math.round(random(1,4));    
     switch(rand){     
             case 1: obstacle.scale = 0.2;
                     break;
             case 2:obstacle.scale = 0.3;
                    break;
             case 3: obstacle.scale = 0.4;
                     break;
             case 4: obstacle.scale = 0.5;
                     break;
             default:break;     
     }     
   obstacle.lifetime = 300;
   obstaclesGroup.add(obstacle);
 }
}
    
function reset(){
  gameState=PLAY;
  restart.visible=false;
  obstaclesGroup.destroyEach();
  back.velocityX=-1.2;
  score=0;
}