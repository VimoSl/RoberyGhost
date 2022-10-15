class Body{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}
function gamingDraw(){
    rect("hsl(0, 100%, 30%)", 0, 0, fixedScreenSize.x, fixedScreenSize.y);//arena size
    drawImage(square, 900, 0, 50, 50);
}
function randomNumber(a, b){
    return Math.floor(Math.random()*(b-a)+a);
}
function dist(x1, y1, x2, y2){
    return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
}