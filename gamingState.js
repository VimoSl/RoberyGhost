let player, camera = {x: 0, y: 0};
class Player {
	constructor(startPos) {
		this.x = startPos.x;
		this.y = startPos.y;
		this.sx = 30;
		this.sy = 30;
	}
	isInCollision() {
		for(let e of level){
			if(areColliding(this, e) && e.type!="door"){
				return false;
			}
		}
		return false;
	}
	moveBy(delta) {
		this.x += delta.x;
		this.y += delta.y;
	}
	update() {
		if(this.isInCollision()){
			return;
		}
		this.moveBy({
			x: isKeyPressed[keyLeft] * -1 + isKeyPressed[keyRight] * 1,
			y: isKeyPressed[keyUp] * -1 + isKeyPressed[keyDown] * 1,
		});
	}
	draw() {
		drawImage(circle, this.x, this.y, this.sx, this.sy);
	}
}
player = new Player({x: 0, y: 0});



const gamingDraw = function () {
	strokeRect("green", 0, 0, fixedScreenSize.x, fixedScreenSize.y); //arena size
	strokeRect("green", 500, 0, 1, fixedScreenSize.y); //arena size
	strokeRect("green", 0, 250, fixedScreenSize.x, 0); //arena size
	context.save();
	context.translate(camera.x, camera.y);
	level.forEach((e) => e.draw());
	player.draw();
	context.restore();
};
const gamingUpdate = function () {
	player.update();
	camera.x = (fixedScreenSize.x/2-player.x-player.sx/2)*screenRatio;
	camera.y = (fixedScreenSize.y/2-player.y-player.sy/2)*screenRatio;
};
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
