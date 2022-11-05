let player, camera = {x: 0, y: 0};
let currLvl = Levels[0];
class Clones{
	constructor(len){
		this.arr = new Array(len);
		for(let i=0; i<len; i++){
			this.arr[i] = {x: Infinity, y: Infinity, angle: Infinity};
		}
	}
	set(last){
		for(let i=0; i<this.arr.length-1; i++){
			this.arr[i].x = this.arr[i+1].x;
			this.arr[i].y = this.arr[i+1].y;
			this.arr[i].angle = this.arr[i+1].angle;
		}
		this.arr[this.arr.length-1].x = last.x;
		this.arr[this.arr.length-1].y = last.y;
		this.arr[this.arr.length-1].angle = last.angle;
	}
	draw(){
		for(let i in this.arr){
			context.save();
			context.globalAlpha = 0.001*i;
			coolRotete((this.arr[i].x+player.sx/2)*screenRatio+transX, (this.arr[i].y+player.sy/2)*screenRatio+transY, this.arr[i].angle+Math.PI/2);
			drawImage(ghost, this.arr[i].x, this.arr[i].y, player.sx, player.sy);
			context.restore();
		}
	}
}
class Player {
	constructor(startPos) {
		this.x = startPos.x;
		this.y = startPos.y;
		this.sx = 40;
		this.sy = 40;
		this.cooldown = 0;
		this.transAfter = -1;
		this.ghost = false;
		this.angle = 0;
		this.xScreen = (this.x+this.sx/2)*screenRatio+camera.x+transX;
		this.yScreen = (this.y+this.sy/2)*screenRatio+camera.y+transY;
		this.speed = this.ghost?0.5:1;
		this.clones = new Clones(50);
	}
	isInCollision() {
		for(let e of currLvl.objects){
			let scale = 0.8;
			let collisionBox = new Box(this.x+this.sx*(1-scale)/2, this.y+this.sy*(1-scale)/2, this.sx*scale, this.sy*scale);
			if(areColliding(collisionBox, e) && e.type!="door" && (!this.ghost || (e.type!="wall" && e.type!="mebel"))){
				return true;
			}
		}
		return false;
	}
	moveBy(delta) {
		this.x += delta.x;
		this.y += delta.y;
	}
	update() {
		this.transAfter--;
		if(this.transAfter==0){
			this.ghost = !player.ghost;
		}
		if(this.transAfter>0){
			return 0;
		}
		this.speed = !this.ghost?0.5:1;
		this.xScreen = (this.x+this.sx/2)*screenRatio+camera.x+transX;
		this.yScreen = (this.y+this.sy/2)*screenRatio+camera.y+transY;
		this.angle = angleBetween(this.xScreen, this.yScreen, mx, my);
		this.moveBy({
			x: Math.cos(this.angle)*clicked*this.speed,//isKeyPressed[keyLeft] * -1 + isKeyPressed[keyRight] * 1,
			y: Math.sin(this.angle)*clicked*this.speed//isKeyPressed[keyUp] * -1 + isKeyPressed[keyDown] * 1,
		});
		if(this.isInCollision()){
			this.moveBy({
				x: -Math.cos(this.angle)*this.speed,//isKeyPressed[keyLeft] * -1 + isKeyPressed[keyRight] * 1,
				y: -Math.sin(this.angle)*this.speed//isKeyPressed[keyUp] * -1 + isKeyPressed[keyDown] * 1,
			});
		}
		this.cooldown--;
		if(time%1==0){
			this.clones.set(this);
		}
	}
	screenF(){
		context.lineWidth = 5;
		strokeRect("white", 10, 10, 200, 20);
		this.cooldown = Math.max(0, this.cooldown);
		rect("purple", 10, 10, this.cooldown/2, 20);

		if(this.transAfter>0){
			context.lineWidth = 2;
			strokeRect("white", fixedScreenSize.x/2-135/2, 400, 135, 20);
			this.cooldown = Math.max(0, this.cooldown);
			rect("red", fixedScreenSize.x/2-135/2, 400, this.transAfter*3, 20);
		}
		context.fillStyle = "white";
		// context.fillRect((this.x+this.sx/2)*screenRatio+camera.x+transX, (this.y+this.sy/2)*screenRatio+camera.y+transY, 10, 10);
	}
	draw() {
		if(this.ghost){
			this.clones.draw();
		}
		context.save();
		coolRotete((this.x+this.sx/2)*screenRatio+transX, (this.y+this.sy/2)*screenRatio+transY, this.angle+Math.PI/2);
		if(this.ghost){
			drawImage(ghost, this.x, this.y, this.sx, this.sy);
		}else{
			rect("green", this.x, this.y, this.sx, this.sy);
		}
		context.restore();
		// drawImage(circle, this.x, this.y, this.sx, this.sy);
	}
}
player = new Player({x: 0, y: 0});



const gamingDraw = function () {
	// strokeRect("green", 0, 0, fixedScreenSize.x, fixedScreenSize.y); //arena size
	// strokeRect("green", 500, 0, 1, fixedScreenSize.y); //arena size
	// strokeRect("green", 0, 250, fixedScreenSize.x, 0); //arena size

	context.save();
	context.translate(camera.x, camera.y);
	currLvl.objects.forEach((e) => e.draw());
	player.draw();
	context.restore();
	player.screenF();
	
	context.fillStyle = "black";
	context.fillRect(0, 0, canvas.width, transY);
	context.fillRect(0, 0, transX, canvas.height);
	context.fillRect(0, ScreenSize.y+transY, canvas.width, transY);
	context.fillRect(ScreenSize.x+transX, 0, transX, canvas.height);
};
const gamingUpdate = function () {
	player.update();
	camera.x = (fixedScreenSize.x/2-player.x-player.sx/2)*screenRatio;
	camera.y = (fixedScreenSize.y/2-player.y-player.sy/2)*screenRatio;
};
const gamingKeyUp = function(key){
	if(key==32 && player.cooldown<=0){
		player.transAfter = 45;
		player.ghost = !player.ghost;
		player.cooldown = 400;
		if(player.isInCollision()){
			player.transAfter = -1;
			player.cooldown = 0;
		}
		player.ghost = !player.ghost;
	}
}
function randomNumber(a, b) {
	return Math.floor(Math.random() * (b - a) + a);
}
function dist(x1, y1, x2, y2) {
	return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}
function dist(x1, y1, x2, y2) {
	return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}