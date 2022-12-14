function loadImg(src) {
	result = {};
	result.img = new Image();
	result.img.src = src;
	return result;
}
function rect(c, x, y, sx, sy) {
	context.save();
	context.fillStyle = c;
	context.translate(transX, transY);
	context.fillRect(
		x * screenRatio,
		y * screenRatio,
		sx * screenRatio,
		sy * screenRatio
	);
	context.restore();
}

function strokeRect(c, x, y, sx, sy) {
	context.save();
	context.strokeStyle = c;
	context.translate(transX, transY);
	context.strokeRect(
		x * screenRatio,
		y * screenRatio,
		sx * screenRatio,
		sy * screenRatio
	);
	context.restore();
}
function drawImage(img, x, y, xs, ys) {
	context.save();
	context.translate(transX, transY);
	context.drawImage(
		img.img,
		x * screenRatio,
		y * screenRatio,
		xs * screenRatio,
		ys * screenRatio
	);
	context.restore();
}
let circle = loadImg("./images/circle.png");
let square = loadImg("./images/square.png");
let ghost = loadImg("./images/ghost.png");
let ghostBack = loadImg("./images/ghost_back.png");
