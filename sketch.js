const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var ball,groundObj,leftSide,rightSide;
var world;
var radius = 70;
var bg, bg1

var lakeSprite, lakeSprite2
var fish, fish2, fishImg, picnic, picnicImg
var bush, bush1, bush2, swan, swan1, swan2, swan3
var pond, pondImg, duck, duck1Img, duck2Img, swing, swingImg;
var box, box1, paperBall, bin, boy , stand, kick

function preload(){

	bg = loadImage("images/park.jpg")

	dustbinImg = loadImage("images/dustbin.png");
	paperImg = loadImage("images/paper.png");

	picnicImg = loadAnimation("images/picnic.png")
	bush = loadImage("images/bush.png")
	pondImg = loadImage("images/pond.png")
	fishImg = loadAnimation("images/fish/1.png","images/fish/2.png","images/fish/3.png")
	duck1Img = loadAnimation("images/duck&ducklings/walking/1.png","images/duck&ducklings/walking/2.png","images/duck&ducklings/walking/3.png")
	duck2Img = loadAnimation("images/duck&ducklings/swimming/1.png","images/duck&ducklings/swimming/2.png","images/duck&ducklings/swimming/3.png")
	kick = loadAnimation("images/kick.png")
	swingImg = loadAnimation("images/slide/1.png","images/slide/1 copy.png","images/slide/2.png","images/slide/1 copy.png")
	stand = loadAnimation("images/stand.png")
	swan1 = loadAnimation ("images/swan/1.png")
	swan2 = loadAnimation ("images/swan/2.png")
	swan3 = loadAnimation ("images/swan/3.png")
	swanFlying = loadAnimation("images/swan/4.png","images/swan/5.png")
	//dustbinImg = addImage("dustbin.png");
	//paperImg = addImage("paper.png");

	//dustbin.loadImage("dustbin.png");
	//paper.addImage("paper.png");
	
	//dustbin.loadImage("dustbin.png");
	//paper.loadImage("paper.png");
}


function setup() {
	createCanvas(1400, 650);
	rectMode(CENTER);

	picnic = createSprite(1250,400)
	picnic.addAnimation("eating",picnicImg)
	picnic.scale = 0.2

	paperBall = createSprite(0,0,50,50)
	paperBall.visible = false

	bin = createSprite(1185,650,150,20)
	bin.visible = false

	pond = createSprite(230,370,50,50)
	pond.addImage(pondImg)
	pond.scale = 0.4

	lakeSprite = createSprite(180,370,5,50)
	lakeSprite.visible = false

	lakeSprite2 = createSprite(280,370,5,50)
	lakeSprite2.visible = false

	box1 = createSprite(350,400,10,50)
	box1.visible = false

	duck = createSprite(550,380,10,10)
	duck.addAnimation("waking",duck1Img)
	duck.scale = 0.2
	duck.velocityX = -2

	fish = createSprite(270,370,10,10)
	fish.addAnimation("swim",fishImg)
	fish.scale = 0.2
	fish.velocityX = -1.5

	fish2 = createSprite(290,380,10,10)
	fish2.addAnimation("swim",fishImg)
	fish2.scale = 0.1
	fish2.velocityX = -1

	bush1 = createSprite(50,350,50,50)
	bush1.addImage(bush)
	bush1.scale = 0.5

	swan = createSprite(200,380,10,10)
	swan.addAnimation("sleep", swan1)
	swan.addAnimation("awake", swan2)
	swan.addAnimation("fly", swanFlying)
	swan.scale = 0.3

	bush2 = createSprite(550,390,50,50)
	bush2.addImage(bush)
	bush2.scale = 0.3

	swing = createSprite(1050,370)
	swing.addAnimation("sliding",swingImg)
	swing.scale = 0.5

	boy = createSprite(300,520)
	boy.addAnimation("standing",stand)
	boy.scale = 1.7

	engine = Engine.create();
	world = engine.world;

	var ball_options={
		isStatic:false,
		restitution:0.3,
		density:0.4
	}

	ball = Bodies.circle(360,100,radius/2.6,ball_options);
	World.add(world,ball);

	ground=new Ground(width/2,670,width,20);
	leftSide = new Ground(1100,600,10,120);
	rightSide = new Ground(1270,600,10,120);
	bottomSide = new Ground(1185,650,150,20);

	Engine.run(engine);
  
}


function draw() {
	background(bg);
	rectMode(CENTER);

	paperBall.x = ball.position.x
	paperBall.y = ball.position.y

	ground.display();
	leftSide.display();  
	rightSide.display();
	bottomSide.display();

	
	imageMode(CENTER);

	//image(paperImg,ball.position.y,ball.position.x,radius,radius);
	//image(paperImg,ball.position.x,ball.position.y,radius/2,radius/2);
	//ellipse(ball.position.x,ball.position.y,radius,radius);
	image(paperImg,ball.position.x,ball.position.y,radius,radius);
	
	//image(1185, 570, 200,200);
	//rect(1185, 570, 200,200);
	image(dustbinImg, 1185, 570, 200,200);
	//ellipse(1185, 570, 200,200)

	if(fish.isTouching(lakeSprite)){
		fish.visible = false
		swan.changeAnimation("awake")
	}
	if(fish2.isTouching(lakeSprite)){
		fish2.visible = false
		swan.changeAnimation("fly")
		swan.scale = 0.4
		swan.setVelocity(4,-2)
	}

	if(duck.x - lakeSprite2.x < (duck.width - lakeSprite2.width)/2){
		duck.addAnimation("swimming",duck2Img)
		duck.changeAnimation("swimming",duck2Img)
		duck.y = 370
	}

	if(duck.x - lakeSprite.x < (duck.width - lakeSprite.width)/2){
		duck.changeAnimation("waking",duck1Img)
		duck.y = 370
	}


 drawSprites()

}

function keyPressed() {
  	if (keyCode === UP_ARROW) {

		Matter.Body.applyForce(ball,ball.position,{x:45,y:-55});
		boy.addAnimation("kicking", kick)
		boy.changeAnimation("kicking")
  	}
}
