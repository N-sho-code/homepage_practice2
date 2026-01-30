var canvas, g;
var maptip;
var map;
var posx, posy;
var spUser, spEnemy, imgNpc;
var spriteList;
var imgEnemy;
var MapWidth = 16;
var MapHeight = 16;
var MapDrawWidth = 9;
var MapDrawHeight = 9;
// var DrawSize = 48;
var DrawSize = 64;
var AnimationNum = 16;
//スプライトクラス
class Sprite {
    image = [];
    posx = 0;
    posy = 0;
}
var scrollX, scrollY;
var frameCount;
var currentKey;
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
        [0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,0,0,0,0,0,0,3,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,3,3,3,2,2,0,0,0,0,0],
        [0,0,0,0,0,0,3,3,3,2,2,0,0,0,0,0],
        [0,0,0,0,0,0,0,3,0,0,2,0,0,0,0,0],
        [0,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,3,3,1,1,1,0,0,0,0,0,0,0,0,0],
        [0,1,3,3,3,3,1,0,0,0,0,0,0,0,0,2],
        [0,0,2,2,2,2,2,2,2,0,0,0,0,0,2,2],
    ];
    //マップチップ読込
    maptip = [];
    for (var i = 0; i < 4; i++) {
        maptip[i] = new Image();
        maptip[i].src = "./image/maptip" + i + ".png";
    }
    //スプライトの初期化
    spUser = new Sprite();
    spEnemy = new Sprite();
    imgNpc = new Sprite();
    spriteList = [];
    spriteList.push(spUser);
    spriteList.push(spEnemy);
    spriteList.push(imgNpc);
    //初期位置
    // posx = 5;
    // posy = 5;
    spUser.posx = 12;
    spUser.posy = 7;
    spEnemy.posx = 14;
    spEnemy.posy = 14;
    imgNpc.posx = 10;
    imgNpc.posy = 8;
    //キャラ画像読込
    //imgUser = [];
    for (var i = 0; i < 2; i++) {
        //     imgUser[i] = new Image();
        //     imgUser[i].src = "./image/user" + i + ".png";
        spUser.image[i] = new Image();
        spEnemy.image[i] = new Image();
        imgNpc.image[i] = new Image();
        spUser.image[i].src = "./image/user" + i + ".png";
        spEnemy.image[i].src = "./image/enemy" + i + ".png";
        imgNpc.image[i].src = "./image/npc" + i + ".png";
    }
    imgEnemy = new Image();
    imgEnemy.src = "/image/enemy.png";
    //その他
    scrollX = 0;
    scrollY = 0;
    frameCount = 0;
    currentKey = -1;
}
function keydown(e) {
    currentKey = e.keyCode;
}
function keyup(e) {
    currentKey = -1;
}
function inputCheck() {
    if (scrollX != 0 || scrollY != 0) return;

    // var x = posx;
    // var y = posy;
    var x = spUser.posx;
    var y = spUser.posy;    
    var animx = 0;
    var animy = 0;
    if (currentKey == 37) {
        //左
        x = (spUser.posx - 1 + MapWidth) % MapWidth;
        animx = -1;
    } else if (currentKey == 38) {
        //上
        y = (spUser.posy - 1 + MapHeight) % MapHeight;
        animy = -1;
    } else if (currentKey == 39) {
        //右
        x = (spUser.posx + 1) % MapWidth;
        animx = 1;
    } else if (currentKey == 40) {
        //下
        y = (spUser.posy + 1) % MapHeight;
        animy = 1;
    }

    //当たり判定
    if (map[y][x] == 0 || map[y][x] == 1) {
        spUser.posx = x;
        spUser.posy = y;
        scrollX = animx * DrawSize;
        scrollY = animy * DrawSize;
    } else {
        scrollX = -1 * animx * ((DrawSize / AnimationNum) * 3);
        scrollY = -1 * animy * ((DrawSize / AnimationNum) * 3);
    }
}
function gameloop() {
    update();
    draw();
}
function update() {
    inputCheck();
    // マップスクロール量の更新
    if (scrollX > 0) scrollX -= DrawSize / AnimationNum;
    if (scrollX < 0) scrollX += DrawSize / AnimationNum;
    if (scrollY > 0) scrollY -= DrawSize / AnimationNum;
    if (scrollY < 0) scrollY += DrawSize / AnimationNum;

    frameCount++;
}
function draw() {
    //マップの描画
    var startX = Math.floor((canvas.width - MapDrawWidth * DrawSize) / 2);
    var startY = Math.floor((canvas.height - MapDrawHeight * DrawSize) / 2);
    for (var i = 0; i < MapDrawHeight; i++) {
        for (var j = 0; j < MapDrawWidth; j++) {
            //始点の算出
            var x = (spUser.posx - Math.floor(MapDrawWidth / 2) + j + MapWidth) % MapWidth;
            var y = (spUser.posy - Math.floor(MapDrawHeight / 2) + i + MapHeight) % MapHeight;
            //マップチップの描画
            //g.drawImage(maptip[map[y][x]], j * DrawSize, i * DrawSize, DrawSize, DrawSize);
            //マップチップの描画
            g.drawImage(
                maptip[map[y][x]],
                startX + j * DrawSize + scrollX,
                startY + i * DrawSize + scrollY,
                DrawSize,
                DrawSize
            );
        }
    }
    // キャラの描画
    // g.drawImage(
    //     // imgUser,
    //     // DrawSize * Math.floor(MapDrawWidth / 2),
    //     // DrawSize * Math.floor(MapDrawHeight / 2),
    //     imgUser[Math.floor(frameCount / 10) % 2],
    //     Math.floor((canvas.width - DrawSize) / 2),
    //     Math.floor((canvas.height - DrawSize) / 2) - DrawSize / 6,
    //     DrawSize,
    //     DrawSize
    // );
    //スプライトの描画
    spriteList.forEach(function (sp) {
        //自キャラからの距離 ループを考慮して近い方(三項演算子)
        var x =
            Math.abs(sp.posx - spUser.posx) < Math.abs(sp.posx - spUser.posx - MapWidth)
                ? sp.posx - spUser.posx
                : sp.posx - spUser.posx - MapWidth;
        var y =
            Math.abs(sp.posy - spUser.posy) < Math.abs(sp.posy - spUser.posy - MapWidth)
                ? sp.posy - spUser.posy
                : sp.posy - spUser.posy - MapWidth;

        //TODO:描画範囲中にある時だけ描画する
        g.drawImage(
            // imgUser,
            // DrawSize * Math.floor(MapDrawWidth / 2),
            // DrawSize * Math.floor(MapDrawHeight / 2),
            sp.image[Math.floor(frameCount / 10) % 2],
            Math.floor((canvas.width - DrawSize) / 2) + x * DrawSize + scrollX,
            Math.floor((canvas.height - DrawSize) / 2) + y * DrawSize - DrawSize / 6 + scrollY,
            DrawSize,
            DrawSize
        );
    });
}