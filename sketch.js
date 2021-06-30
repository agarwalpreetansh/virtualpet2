//Create variables here
var dog;
var happydog;
var datbase;
var foods;
var foodstock;
var hello;
var feedpet;
var addfoodforpet;
var fedTime;
var lastFed;
var foodObj;
var hi;
var bye;
var feed;
var addFood;
function preload()
{
hi=loadImage("images/dogimg.png")
bye=loadImage("images/dogimg1.png")

}

function setup() {
	database = firebase.database();
  
  createCanvas(1000,1000);
  foodObj = new Food();

  dog=createSprite(850,200,150,150)
  dog.addImage(hi)
  dog.scale=0.15

  foodstock=database.ref('foodleft')
  foodstock.on("value",readStock)



 feed=createButton("feed the dog")
 feed.position(700,95);
 feed.mousePressed(feedDog);

 addFood=createButton("Add Food")
addFood.position(800,95);
addFood.mousePressed(addFoods);


}


function draw() {  
background(46,139,87)
foodObj.display();

fedTime=database.ref('FeedTime')
fedTime.on("value",function(data){
  lastFed=data.val();
})




fill(255,255,255)
textSize(15);
if(lastFed>12){
  text("Last feed : " + lastFed%12 + "PM",350,30)
}else if(lastFed==0){
text("Last Feed : 12 AM ",350,20)
}else {
  text("Last feed : "+lastFed+"PM",350,30)
  }




  drawSprites();
  //add styles here
  textSize(30)
  fill("black")
  text("Food remaining: "+ foods,10,30)
}

function readStock(data){
  foods=data.val();
  foodObj.updateFoodStock(foods)
}
 



function feedDog(){
  dog.addImage(bye);
if(foodObj.getFoodStock()<=0){
  foodObj.updateFoodStock(foodObj.getFoodStock()*0)
}
else{
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
}
  database.ref('/').update({
foodleft:foodObj.getFoodStock(),
FeedTime:hour()
  })
}

function addFoods(){
  foods++;
  database.ref('/').update({
    foodleft:foods
  })
}
