//Create variables here
var dog, happyDog, database, foodS, foodStock, dogImg;
var feedDog, addFood, fedTime, lastFed, foodObj;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {

  feed = createButton("Feed the dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

  createCanvas(1100, 500);
  
  dog = createSprite(870, 200, 20, 20);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  foodObj = new Food();
  
}

function draw() {  

 background("green"); 

 
 
 fedTime = database.ref('FeedTime');
 fedTime.on("value", function(data){
   lastFed = data.val();
 });
  
 fill (255, 255, 254);
 textSize(15);
 if(lastFed>=12){
 ("Last Feed : "+ lastFed%12 + "PM", 350, 30);
 }
 else if(lastFed==0){
 ("Last Feed : 12 AM", 350, 30);
 }
 else{
   text ("Last Feed : "+ lastFed + "AM", 350, 30);
 }

 foodObj.display(); 
 
 drawSprites();
 
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}