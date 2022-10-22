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
		pos2.x <= pos1.x + pos1.width &&
		pos1.x <= pos2.x + pos2.width &&
		pos2.y <= pos1.y + pos1.height &&
		pos1.y <= pos2.y + pos2.height
	);
};

const keyLeft = 37;
const keyRight = 39;
const keyUp = 38;
const keyDown = 40;

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

let player;
let level = [];
const types = ["door", "wall", "wall!", "mebel", "gold"];

class Box {
	constructor(x, y, sx, sy, type) {
		this.x = x * 0.25;
		this.y = y * 0.25;
		this.sx = sx * 0.25;
		this.sy = sy * 0.25;
		this.type = type;
	}
	draw() {
		let color;
		if (this.type == types[0]) {
			color = "brown";
		} else if (this.type == types[1]) {
			color = "gray";
		} else if (this.type == types[2]) {
			color = "lightblue";
		} else if (this.type == types[3]) {
			color = "red";
		} else if (this.type == types[4]) {
			color = "yellow";
		}
		rect(color, this.x * 1, this.y * 1, this.sx * 1, this.sy * 1);
	}
}

class Player {
	constructor(startPos) {
		this.x = startPos.x;
		this.y = startPos.y;
		this.width = 50;
		this.height = 50;
	}
	isInCollision(pos) {
		// level.forEach((e) => {});
	}
	moveBy(delta) {
		this.x += delta.x;
		this.y += delta.y;
	}
	update() {
		this.moveBy({
			x: isKeyPressed[keyLeft] * -5 + isKeyPressed[keyRight] * 5,
			y: isKeyPressed[keyUp] * -5 + isKeyPressed[keyDown] * 5,
		});
	}
	draw() {
		drawImage(circle, this.x, this.y, this.width, this.height);
	}
}

level = [
	new Box(450, 1550, 50, 50, "wall"),
	new Box(450, 1500, 50, 50, "wall"),
	new Box(450, 1450, 50, 50, "wall"),
	new Box(450, 1400, 50, 50, "wall!"),
	new Box(450, 1350, 50, 50, "wall!"),
	new Box(450, 1300, 50, 50, "wall!"),
	new Box(450, 1250, 50, 50, "wall!"),
	new Box(450, 1200, 50, 50, "wall!"),
	new Box(450, 1150, 50, 50, "wall!"),
	new Box(450, 1100, 50, 50, "wall!"),
	new Box(450, 1050, 50, 50, "wall!"),
	new Box(450, 1000, 50, 50, "wall!"),
	new Box(450, 950, 50, 50, "wall!"),
	new Box(450, 900, 50, 50, "wall!"),
	new Box(450, 850, 50, 50, "wall!"),
	new Box(450, 800, 50, 50, "wall!"),
	new Box(450, 750, 50, 50, "wall!"),
	new Box(450, 700, 50, 50, "wall!"),
	new Box(400, 700, 50, 50, "wall!"),
	new Box(400, 650, 50, 50, "wall!"),
	new Box(400, 600, 50, 50, "wall!"),
	new Box(400, 550, 50, 50, "wall!"),
	new Box(400, 500, 50, 50, "wall!"),
	new Box(400, 450, 50, 50, "wall!"),
	new Box(400, 400, 50, 50, "wall!"),
	new Box(350, 400, 50, 50, "wall!"),
	new Box(350, 350, 50, 50, "wall!"),
	new Box(300, 350, 50, 50, "wall!"),
	new Box(300, 300, 50, 50, "wall!"),
	new Box(300, 250, 50, 50, "wall!"),
	new Box(300, 200, 50, 50, "wall!"),
	new Box(350, 200, 50, 50, "wall!"),
	new Box(350, 150, 50, 50, "wall!"),
	new Box(400, 150, 50, 50, "wall!"),
	new Box(450, 150, 50, 50, "wall!"),
	new Box(450, 100, 50, 50, "wall!"),
	new Box(500, 100, 50, 50, "wall!"),
	new Box(550, 100, 50, 50, "wall!"),
	new Box(600, 100, 50, 50, "wall!"),
	new Box(650, 100, 50, 50, "wall!"),
	new Box(700, 100, 50, 50, "wall!"),
	new Box(750, 100, 50, 50, "wall!"),
	new Box(800, 100, 50, 50, "wall!"),
	new Box(850, 100, 50, 50, "wall!"),
	new Box(900, 100, 50, 50, "wall!"),
	new Box(950, 100, 50, 50, "wall!"),
	new Box(1000, 100, 50, 50, "wall!"),
	new Box(1050, 100, 50, 50, "wall!"),
	new Box(1100, 100, 50, 50, "wall!"),
	new Box(1150, 100, 50, 50, "wall!"),
	new Box(1200, 100, 50, 50, "wall!"),
	new Box(1250, 100, 50, 50, "wall!"),
	new Box(1300, 100, 50, 50, "wall!"),
	new Box(1350, 100, 50, 50, "wall!"),
	new Box(1400, 100, 50, 50, "wall!"),
	new Box(1450, 100, 50, 50, "wall!"),
	new Box(1500, 100, 50, 50, "wall!"),
	new Box(1550, 100, 50, 50, "wall!"),
	new Box(1600, 100, 50, 50, "wall!"),
	new Box(1650, 100, 50, 50, "wall!"),
	new Box(1700, 100, 50, 50, "wall!"),
	new Box(1750, 100, 50, 50, "wall!"),
	new Box(1800, 100, 50, 50, "wall!"),
	new Box(1850, 100, 50, 50, "wall!"),
	new Box(1900, 100, 50, 50, "wall!"),
	new Box(1950, 100, 50, 50, "wall!"),
	new Box(2000, 100, 50, 50, "wall!"),
	new Box(2000, 150, 50, 50, "wall!"),
	new Box(2050, 150, 50, 50, "wall!"),
	new Box(2050, 200, 50, 50, "wall!"),
	new Box(2050, 250, 50, 50, "wall!"),
	new Box(2050, 300, 50, 50, "wall!"),
	new Box(2000, 300, 50, 50, "wall!"),
	new Box(2000, 350, 50, 50, "wall!"),
	new Box(2000, 400, 50, 50, "wall!"),
	new Box(2000, 450, 50, 50, "wall!"),
	new Box(2000, 500, 50, 50, "wall!"),
	new Box(2000, 550, 50, 50, "wall!"),
	new Box(2000, 600, 50, 50, "wall!"),
	new Box(2000, 650, 50, 50, "wall!"),
	new Box(2000, 700, 50, 50, "wall!"),
	new Box(2000, 750, 50, 50, "wall!"),
	new Box(2000, 800, 50, 50, "wall!"),
	new Box(2000, 850, 50, 50, "wall!"),
	new Box(2000, 900, 50, 50, "wall!"),
	new Box(2000, 950, 50, 50, "wall!"),
	new Box(2000, 1000, 50, 50, "wall!"),
	new Box(2000, 1050, 50, 50, "wall!"),
	new Box(2000, 1100, 50, 50, "wall!"),
	new Box(2000, 1150, 50, 50, "wall!"),
	new Box(2000, 1200, 50, 50, "wall!"),
	new Box(2000, 1250, 50, 50, "wall!"),
	new Box(2000, 1300, 50, 50, "wall!"),
	new Box(2000, 1350, 50, 50, "wall!"),
	new Box(2000, 1400, 50, 50, "wall!"),
	new Box(2000, 1450, 50, 50, "wall!"),
	new Box(2000, 1500, 50, 50, "wall!"),
	new Box(2000, 1550, 50, 50, "wall!"),
	new Box(1950, 1550, 50, 50, "wall!"),
	new Box(1900, 1550, 50, 50, "wall!"),
	new Box(1850, 1550, 50, 50, "wall!"),
	new Box(1800, 1550, 50, 50, "wall!"),
	new Box(1750, 1550, 50, 50, "wall!"),
	new Box(1700, 1550, 50, 50, "wall!"),
	new Box(1650, 1550, 50, 50, "wall!"),
	new Box(1600, 1550, 50, 50, "wall!"),
	new Box(1550, 1550, 50, 50, "wall!"),
	new Box(1500, 1550, 50, 50, "wall!"),
	new Box(1450, 1550, 50, 50, "wall!"),
	new Box(1400, 1550, 50, 50, "wall!"),
	new Box(1350, 1550, 50, 50, "wall!"),
	new Box(1300, 1550, 50, 50, "wall!"),
	new Box(1250, 1550, 50, 50, "wall!"),
	new Box(1250, 1500, 50, 50, "wall!"),
	new Box(1200, 1500, 50, 50, "wall!"),
	new Box(1200, 1550, 50, 50, "wall!"),
	new Box(1150, 1550, 50, 50, "wall!"),
	new Box(1100, 1550, 50, 50, "wall!"),
	new Box(1050, 1550, 50, 50, "wall!"),
	new Box(1000, 1550, 50, 50, "wall!"),
	new Box(950, 1550, 50, 50, "wall!"),
	new Box(900, 1550, 50, 50, "wall!"),
	new Box(850, 1550, 50, 50, "wall!"),
	new Box(800, 1550, 50, 50, "wall!"),
	new Box(750, 1550, 50, 50, "wall!"),
	new Box(700, 1550, 50, 50, "wall!"),
	new Box(650, 1550, 50, 50, "wall!"),
	new Box(500, 1550, 50, 50, "door"),
	new Box(550, 1550, 50, 50, "door"),
	new Box(600, 1550, 50, 50, "door"),
	new Box(750, 150, 50, 50, "wall"),
	new Box(750, 200, 50, 50, "wall"),
	new Box(750, 250, 50, 50, "wall"),
	new Box(750, 300, 50, 50, "wall"),
	new Box(750, 350, 50, 50, "wall"),
	new Box(750, 400, 50, 50, "wall"),
	new Box(750, 450, 50, 50, "wall"),
	new Box(700, 450, 50, 50, "wall"),
	new Box(650, 450, 50, 50, "wall"),
	new Box(600, 450, 50, 50, "wall"),
	new Box(550, 450, 50, 50, "wall"),
	new Box(450, 450, 50, 50, "door"),
	new Box(500, 450, 50, 50, "door"),
	new Box(1300, 150, 50, 50, "wall"),
	new Box(1300, 200, 50, 50, "wall"),
	new Box(1300, 250, 50, 50, "wall"),
	new Box(1300, 300, 50, 50, "wall"),
	new Box(1300, 350, 50, 50, "wall"),
	new Box(1300, 400, 50, 50, "wall"),
	new Box(1300, 450, 50, 50, "wall"),
	new Box(1300, 500, 50, 50, "wall"),
	new Box(1300, 550, 50, 50, "wall"),
	new Box(1300, 600, 50, 50, "wall"),
	new Box(1300, 650, 50, 50, "wall"),
	new Box(1300, 700, 50, 50, "wall"),
	new Box(1300, 750, 50, 50, "wall"),
	new Box(1300, 800, 50, 50, "wall"),
	new Box(1300, 850, 50, 50, "wall"),
	new Box(1300, 900, 50, 50, "wall"),
	new Box(1300, 950, 50, 50, "wall"),
	new Box(1300, 1000, 50, 50, "wall"),
	new Box(1300, 1500, 50, 50, "wall"),
	new Box(1300, 1450, 50, 50, "wall"),
	new Box(1300, 1400, 50, 50, "wall"),
	new Box(1300, 1350, 50, 50, "wall"),
	new Box(1300, 1300, 50, 50, "wall"),
	new Box(1300, 1250, 50, 50, "wall"),
	new Box(1300, 1200, 50, 50, "wall"),
	new Box(1300, 1150, 50, 50, "wall"),
	new Box(1300, 1050, 50, 50, "door"),
	new Box(1300, 1100, 50, 50, "door"),
	new Box(1600, 550, 50, 50, "door"),
	new Box(1650, 550, 50, 50, "door"),
	new Box(1350, 550, 50, 50, "wall"),
	new Box(1400, 550, 50, 50, "wall"),
	new Box(1450, 550, 50, 50, "wall"),
	new Box(1500, 550, 50, 50, "wall"),
	new Box(1550, 550, 50, 50, "wall"),
	new Box(1700, 550, 50, 50, "wall"),
	new Box(1750, 550, 50, 50, "wall"),
	new Box(1800, 550, 50, 50, "wall"),
	new Box(1850, 550, 50, 50, "wall"),
	new Box(1900, 550, 50, 50, "wall"),
	new Box(1950, 550, 50, 50, "wall"),
	new Box(2000, 200, 50, 50, "gold"),
	new Box(400, 200, 50, 50, "gold"),
	new Box(750, 500, 50, 50, "wall"),
	new Box(750, 550, 50, 50, "wall"),
	new Box(750, 600, 50, 50, "wall"),
	new Box(750, 650, 50, 50, "wall"),
	new Box(750, 700, 50, 50, "wall"),
	new Box(750, 750, 50, 50, "wall"),
	new Box(750, 800, 50, 50, "wall"),
	new Box(750, 850, 50, 50, "wall"),
	new Box(750, 900, 50, 50, "wall"),
	new Box(750, 1450, 50, 50, "wall"),
	new Box(750, 1400, 50, 50, "wall"),
	new Box(750, 1350, 50, 50, "wall"),
	new Box(750, 1300, 50, 50, "wall"),
	new Box(750, 1250, 50, 50, "wall"),
	new Box(750, 1200, 50, 50, "wall"),
	new Box(750, 1150, 50, 50, "wall"),
	new Box(750, 1100, 50, 50, "wall"),
	new Box(750, 1050, 50, 50, "wall"),
	new Box(750, 1500, 50, 50, "wall"),
	new Box(800, 350, 50, 50, "wall"),
	new Box(850, 350, 50, 50, "wall"),
	new Box(900, 350, 50, 50, "wall"),
	new Box(950, 200, 50, 50, "wall"),
	new Box(950, 150, 50, 50, "wall"),
	new Box(950, 350, 50, 50, "wall"),
	new Box(950, 250, 50, 50, "door"),
	new Box(950, 300, 50, 50, "door"),
	new Box(750, 950, 50, 50, "door"),
	new Box(750, 1000, 50, 50, "door"),
];

player = new Player({
	x: 20,
	y: 20,
});
