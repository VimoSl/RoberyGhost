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
		this.inventory = [];
	}
	delOrAddGhost(){
		for(let i=0; i<this.inventory.length; i++){
			if(this.inventory[i]=="ghost"){
				this.inventory.splice(i, 1);
			}
		}
		if(this.ghost){
			this.inventory.push("ghost");
		}
	}
	iHaveReq(lol){
		let req = JSON.parse(JSON.stringify(lol));
		for(let i=0; i<this.inventory.length; i++){
			for(let j=0; j<req.length; j++){
				if(this.inventory[i]==req[j]){
					req.splice(j, 1);
				}
			}
		}
		return (req.length==0);
	}
	isInCollision() {
		this.delOrAddGhost();
		for(let e of currLvl.objects){
			let scale = 0.8;
			let collisionBox = new Box(this.x+this.sx*(1-scale)/2, this.y+this.sy*(1-scale)/2, this.sx*scale, this.sy*scale);
			if(areColliding(collisionBox, e) && !this.iHaveReq(e.req)){
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