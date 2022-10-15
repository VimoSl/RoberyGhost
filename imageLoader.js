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
