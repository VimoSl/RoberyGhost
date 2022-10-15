let canvas = document.getElementById("canvas"),
	mx = 0,
	my = 0;
let context = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const gamingState = 0;
const mainState = 1;
const fixedScreenSize = { x: 1000, y: 500 };
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
