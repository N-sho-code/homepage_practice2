var canvas  = document.getElementById("myCanvas");
var ctx =canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height -30;

var dx = 2;
var dy = -2;

var ballRedius = 10;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth)/2;

var rightPressed = false;
var leftPressed = false;

var brickRowCount = 3;
var brickColumCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks =[];

for(var c = 0;c<brickColumCount;c++){
    bricks[c]=[];
    for(var r = 0;r<brickRowCount;r++){
        bricks[c][r]={x:0,y:0};
    }
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(x,y,ballRedius,0,Math.PI*2);
    ctx.fillStyle="#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX,canvas.height - paddleHeight,paddleWidth,paddleHeight);
    ctx.fillStyle="#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBricks(){
    for(var c = 0;c<brickColumCount;c++){
        for(var r = 0;r<brickRowCount;r++){
            var bricksX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            var bricksY = (r*(brickHeight+brickPadding))+brickOffsetTop;

            bricks[c][r].x = 0;
            bricks[c][r].y = 0;

            ctx.beginPath();
            ctx.rect(bricksX,bricksY,brickWidth,brickHeight);
            ctx.fillStyle="#0095DD";
            ctx.fill();
            ctx.closePath();        
        }
    }
}
function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBall();
    drawBricks();
    drawPaddle();

    if(y+dy < ballRedius){
        dy = -dy;
    }else if(y+dy > canvas.height-ballRedius){
        alert("GAME OVER");
        document.location.reload();
        clearInterval(setInterval);
    }
    if(x+dx > canvas.width -ballRedius||x+dx < ballRedius){
        dx = -dx;
    }
    if(rightPressed && paddleX<canvas.width-paddleWidth){
        paddleX += 7;
    }else if(leftPressed && paddleX >0){
        paddleX -=7;
    }
    x+=dx;
    y+=dy;
}
document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);

function keyDownHandler(e){
    if(e.key=="Right"||e.key=="ArrowRight"){
        rightPressed = true;
    }
    else if(e.key=="Left"||e.key=="ArrowLeft"){
        leftPressed = true;
    }

}
function keyUpHandler(e){
    if(e.key=="Right"||e.key=="ArrowRight"){
        rightPressed = false;
    }
    else if(e.key=="Left"||e.key=="ArrowLeft"){
        leftPressed = false;
    }

}
var interval = setInterval(draw,10);
setInterval(draw,10);

