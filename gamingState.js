let player, camera = {x: 0, y: 0};
let currLvl = Levels[0];

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