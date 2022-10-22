let canvas = document.getElementById("canvas"),
	mx = 0,
	my = 0;
let context = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const gamingState = 0;
const mainState = 1;
const fixedScreenSize = { x: 1000, y: 500 };

const isKeyPressed = [];
for (let i = 0; i < 256; i++) {
	isKeyPressed[i] = false;
}

const areColliding = function (pos1, pos2) {
	return (
		pos2.x <= pos1.x + pos1.sx &&
		pos1.x <= pos2.x + pos2.sx &&
		pos2.y <= pos1.y + pos1.sy &&
		pos1.y <= pos2.y + pos2.sy
	);
};

const keyLeft = 65;
const keyRight = 68;
const keyUp = 87;
const keyDown = 83;

let State = gamingState;
const generalScale = Math.min(
	(canvas.height - 10) / fixedScreenSize.y,
	(canvas.width - 10) / fixedScreenSize.x
);
const ScreenSize = {
	x: fixedScreenSize.x * generalScale,
	y: fixedScreenSize.y * generalScale,
};
const transX = (canvas.width - ScreenSize.x) / 2,
	transY = (canvas.height - ScreenSize.y) / 2;
const screenRatio = ScreenSize.x / fixedScreenSize.x;