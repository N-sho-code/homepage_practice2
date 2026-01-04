const SCREEN_SIZE_W = 256;
const SCREEN_SIZE_H = 224;

let can = document.getElementById("can");
let con =can.getContext("2d");

can.width = SCREEN_SIZE_W;
can.height = SCREEN_SIZE_H;

con.fillStyle="#66AAFF";
con.fillRect(0,0,SCREEN_SIZE_W,SCREEN_SIZE_H);

let chImg = new Image();
chImg.src = "images/sprite.png";
chImg.onload = draw;
function draw(){
    con.drawImage(chImg,0,0,16,32,0,0,16,32);
}

setInterval(mainLoop,1000/60);
function mainLoop(){
    
}
