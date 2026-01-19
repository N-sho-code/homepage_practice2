var maptip;
var map;
var posx, posy;
var imgReimu;
var MapWidth = 16;
var MapHeight = 16;
var MapDrawWidth = 9;
var MapDrawHeight = 9;
var DrawSize = 48;
onload = function () {
    // 描画コンテキストの取得
    canvas = document.getElementById("gamecanvas");
    g = canvas.getContext("2d");
    // 初期化
    init();
    // 入力処理の指定
    document.onkeydown = keydown;
    document.onkeyup = keyup;
    // ゲームループの設定 60FPS
    setInterval("gameloop()", 16);
};
function init() {
    map = [
        [2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,2],
        [2,2,2,2,2,2,0,0,0,0,0,0,0,0,2,2],
        [2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,2],
        [2,2,2,2,2,0,0,0,1,0,0,0,1,1,0,0],
        [2,2,0,0,0,0,0,0,0,0,0,1,1,1,1,0],
        [2,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0],
        [2,0,0,1,1,0,0,0,0,1,0,0,1,1,0,0],
        //
        [0,0,0,1,1,0,0,0,0,0,0,3,0,0,0,0],
        [0,0,0,1,1,0,0,0,0,0,0,3,0,0,0,0],
        [0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0],
    ];
    //マップチップ読込
    maptip = [];
    for (var i = 0; i < 4; i++) {
        maptip[i] = new Image();
        maptip[i].src = "./image/maptip" + i + ".png";
    }
    //初期位置
    posx = 5;
    posy = 5;
    //キャラ画像読込
    imgReimu = new Image();
    imgReimu.src = "./image/user0.png";
}
function keydown(e) {
    //currentKey = e.keyCode;
    var x = posx;
    var y = posy;
    if (e.keyCode == 37) {
        //左
        x = (posx - 1 + MapWidth) % MapWidth;
    } else if (e.keyCode == 38) {
        //上
        y = (posy - 1 + MapHeight) % MapHeight;
    } else if (e.keyCode == 39) {
        //右
        x = (posx + 1) % MapWidth;
    } else if (e.keyCode == 40) {
        //下
        y = (posy + 1) % MapHeight;
    }

    //当たり判定
    if (map[y][x] == 0 || map[y][x] == 1) {
        posx = x;
        posy = y;
    }

}
function keyup(e) {
    currentKey = -1;
}

function draw() {
    //マップの描画
    for (var i = 0; i < MapDrawHeight; i++) {
        for (var j = 0; j < MapDrawWidth; j++) {
            //始点の算出
            var x = (posx - Math.floor(MapDrawWidth / 2) + j + MapWidth) % MapWidth;
            var y = (posy - Math.floor(MapDrawHeight / 2) + i + MapHeight) % MapHeight;
            //マップチップの描画
            g.drawImage(maptip[map[y][x]], j * DrawSize, i * DrawSize, DrawSize, DrawSize);
        }
    }
    //キャラの描画
    g.drawImage(
        imgReimu,
        DrawSize * Math.floor(MapDrawWidth / 2),
        DrawSize * Math.floor(MapDrawHeight / 2),
        DrawSize,
        DrawSize
    );
    // g.fillStyle = "black";
    // g.fillRect(0, 0, 432, 432);
}
function gameloop() {
    draw();
}