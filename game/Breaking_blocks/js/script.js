var canvas  = document.getElementById("myCanvas");
var ctx =canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height -30;

var dx = 2;
var dy = -2;

var ballRedius = 10;

function drawBall(){
    ctx.beginPath();
    ctx.arc(x,y,ballRedius,0,Math.PI*2,false);
    ctx.fillStyle="#0095DD";
    ctx.fill();
    ctx.closePath();
}
function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBall();

    if(y+dy > canvas.height-ballRedius||y+dy < ballRedius){
        dy = -dy;
    }
    if(x+dx > canvas.width -ballRedius||x+dx < ballRedius){
        dx = -dx;
    }
    x+=dx;
    y+=dy;
}
setInterval(draw,10);

// ctx.beginPath();
// ctx.rect(20,40,50,50);
// ctx.fillStyle="#ff0000";
// ctx.fill();
// ctx.closePath();


// ctx.beginPath();
// ctx.rect(160,10,100,40);
// ctx.strokeStyle="rgba(0,0,255,0.5)";
// ctx.stroke();
// ctx.fillStyle="#ffffff";
// ctx.fill();
// ctx.closePath();

