function update() {
	if (State == gamingState) {
		gamingUpdate();
	}
}
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
	isKeyPressed[e.keyCode] = true;
});
document.addEventListener("keyup", function (e) {
	isKeyPressed[e.keyCode] = false;
	if(State==gamingState){
		gamingKeyUp(e.keyCode);
	}
});
document.addEventListener("mousemove", function (e) {
	mx = e.x;
	my = e.y;
});
draw();
setInterval(update, 10);
