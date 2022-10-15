function update() {}
function draw() {
	context.globalAlpha = 1;
	context.fillStyle = "black";
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.globalAlpha = 1;
	if (State == gamingState) {
		gamingDraw();
	}
	requestAnimationFrame(draw);
}
document.addEventListener("keydown", function (e) {
	console.log(e.key);
});
document.addEventListener("mousemove", function (e) {
	mx = e.x;
	my = e.y;
});
draw();
setInterval(update, 10);
