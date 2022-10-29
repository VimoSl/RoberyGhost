let player, camera = {x: 0, y: 0};
let currLvl = Levels[0];
class Player {
	constructor(startPos) {
		this.x = startPos.x;
		this.y = startPos.y;
		this.sx = 40;
		this.sy = 40;
		this.cooldown = 0;
		this.transAfter = -1;
		this.ghost = false;
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
		this.moveBy({
			x: isKeyPressed[keyLeft] * -1 + isKeyPressed[keyRight] * 1,
			y: isKeyPressed[keyUp] * -1 + isKeyPressed[keyDown] * 1,
		});
		if(this.isInCollision()){
			this.moveBy({
				x: -(isKeyPressed[keyLeft] * -1 + isKeyPressed[keyRight] * 1),
				y: -(isKeyPressed[keyUp] * -1 + isKeyPressed[keyDown] * 1),
			});
		}
		this.cooldown--;
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
	}
	draw() {
		if(this.ghost){
			drawImage(ghost, this.x, this.y, this.sx, this.sy);
		}else{
			rect("green", this.x, this.y, this.sx, this.sy);
		}
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
// koi? igrata
