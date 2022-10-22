const gamingDraw = function () {
	strokeRect("green", 0, 0, fixedScreenSize.x, fixedScreenSize.y); //arena size
	player.draw();
	level.forEach((e) => e.draw());
};
const gamingUpdate = function () {
	player.update();
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
