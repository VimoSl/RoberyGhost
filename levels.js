const types = ["brown", "gray", "cyan", "red", "yellow"];
class Box {
	constructor(x, y, sx, sy, color, req) {
		this.x = x;
		this.y = y;
		this.sx = sx;
		this.sy = sy;
		this.color = color;
		this.req = req;
	}
	draw() {
		// let color;
		// if (this.type == types[0]) {
		// 	color = "brown";
		// } else if (this.type == types[1]) {
		// 	color = "gray";
		// } else if (this.type == types[2]) {
		// 	color = "lightblue";
		// } else if (this.type == types[3]) {
		// 	color = "red";
		// } else if (this.type == types[4]) {
		// 	color = "yellow";
		// }
		// context.fillStyle = this.color;
		rect(this.color, this.x * 1, this.y * 1, this.sx * 1, this.sy * 1);
	}
}
class Item{
	constructor(texture, type){//types - key, gold
		this.texture = texture;
		this.type = type;
	}
}
class Level{
	constructor(objects, texture, items){
		this.objects = objects;
		this.texture = texture;
		this.items = items;
	}
}
function editLevel(lvl, tx, ty, scalar){
    for(let i=0; i<lvl.length; i++){
        lvl[i] = new Box(lvl[i].x*scalar+tx, lvl[i].y*scalar+ty, lvl[i].sx*scalar, lvl[i].sy*scalar, lvl[i].color, lvl[i].req);
    }
    return lvl;
}