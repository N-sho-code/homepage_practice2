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
//シーンの定義
const Scenes = {
    Field: "Field",
    Battle: "Battle",
    Event: "Event",
};
var scrollX, scrollY;
var frameCount;
var currentKey;
var scene;
var currentEvent;
var currentBattle;
var currentEnemy;
var player;

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
    player = new BattleCharacter("ユーザー", 128, 64, 64, 32);
}
var keyReleased = true; // キー押しっぱなし防止用
function keydown(e) {
    currentKey = e.keyCode;
}
function keyup(e) {
    currentKey = -1;
    keyReleased = true;
}
function inputCheck() {
    if (scrollX != 0 || scrollY != 0) return;
    if (keyReleased && currentKey == 13) {
        keyReleased = false;
        if (currentEvent.type == 0) {
            //NPC
            scene = Scenes.Field;
            player.hp = player.maxhp;
        } else if (currentEvent.type == 1) {
            //エネミー
            scene = Scenes.Battle;
            currentEnemy = new BattleCharacter("敵", 110, 64, 48, 30, imgEnemy);
            currentBattle = new Battle(player, currentEnemy);
        }
    }

    // var x = posx;
    // var y = posy;
    // フィールド 方向キーをチェック    
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
    //スプライトの当たり判定
    var spriteHit = false;
    spriteList.forEach(function (sp) {
        if (sp.posx == x && sp.posy == y) {
            spriteHit = true;
            return;
        }
    });

    //当たり判定
    if (spriteHit) {
        scene = Scenes.Event;
        dispatchEvent(x, y);
    } else if (map[y][x] == 0 || map[y][x] == 1) {
        //移動可能なら移動
        spUser.posx = x;
        spUser.posy = y;
        scrollX = animx * DrawSize;
        scrollY = animy * DrawSize;
        // if (map[y][x] == 0 || map[y][x] == 1) {
        //     //移動可能なら移動
        //     spUser.posx = x;
        //     spUser.posy = y;
        //     scrollX = animx * DrawSize;
        //     scrollY = animy * DrawSize;
    } else {
        //移動不可なら壁当たりアニメーション
        scrollX = -1 * animx * ((DrawSize / AnimationNum) * 3);
        scrollY = -1 * animy * ((DrawSize / AnimationNum) * 3);
    }
}
//座標から発生させるイベントを決定する。
function dispatchEvent(x, y) {
    if (x == 10 && y == 8) {
        currentEvent = new GameEvent(0, ["村人「イベントテスト」"]);
    } else if (x == 14 && y == 14) {
        currentEvent = new GameEvent(1, ["敵「バトル」"]);
    } else {
        currentEvent = new GameEvent(0, "Error");
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
                : sp.posy - spUser.posy - MapHeight;

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

    // キャラの描画
    g.drawImage(
        spUser.image[Math.floor(frameCount / 10) % 2],
        Math.floor((canvas.width - DrawSize) / 2),
        Math.floor((canvas.height - DrawSize) / 2) - DrawSize / 6,
        DrawSize,
        DrawSize
    );

    if (scene == Scenes.Event) {
        // イベントメッセージの描画
        drawMessage(currentEvent.message);
    }
    if (scene == Scenes.Battle) {
        var enemyShake = 0;
        if (currentBattle.status == 2) enemyShake = ((frameCount / 5) % 2) * 3;
        //敵キャラの描画
        g.drawImage(
            currentEnemy.image,
            canvas.width / 2 - currentEnemy.image.width / 2 + enemyShake,
            (canvas.height * 2) / 5 - currentEnemy.image.height / 2,
        );
        //戦闘メッセージの描画
        drawMessage(currentBattle.message);
        var statusShake = 0;
        if (currentBattle.status == 3) statusShake = ((frameCount / 5) % 2) * 3;
        //HPの描画
        drawStatus(statusShake);
    }
    var statusShake = 0;
    // HPの描画
    drawStatus(statusShake);
}
//HP表示
function drawStatus(x = 0) {
    //残HPで色を変える
    var color = "rgb(255,255,255)";
    if (player.hp == 0) {
        color = "rgb(255,32,32)";
    } else if (player.hp < player.maxhp / 2) {
        color = "rgb(255,180,32)";
    }
    drawWindow(10 + x, 10, 128, 64, 10, color);
    drawString("HP:" + player.hp, 30 + x, 50, color);
}
// イベントメッセージ描画
function drawMessage(message) {
    var WindowMargin = 10;
    var WindowWidth = canvas.width - WindowMargin * 2;
    var WindowHeight = canvas.height / 4;
    drawWindow(WindowMargin, canvas.height - WindowHeight - WindowMargin, WindowWidth, WindowHeight, WindowMargin);
    for (var i = 0; i < message.length; i++) {
        drawString(message[i], WindowMargin * 3, canvas.height - WindowHeight + WindowMargin + 24 * (i + 1));
    }
}

// メッセージウィンドウ描画
function drawWindow(x, y, WindowWidth, WindowHeight, WindowMargin = 10, frameColor = "rgb(255,255,255)") {
    g.fillStyle = frameColor;
    g.fillRect(x, y, WindowWidth, WindowHeight);
    g.fillStyle = "rgb(0,0,0)";
    g.fillRect(x + WindowMargin, y + WindowMargin, WindowWidth - WindowMargin * 2, WindowHeight - WindowMargin * 2);
}

// 文字列描画
function drawString(string, x, y, color = "rgb(255,255,255)") {
    g.font = "bold 16pt Arial";
    g.fillStyle = color;
    g.fillText(string, x, y);
}


//スプライトクラス
class Sprite {
    image = [];
    posx = 0;
    posy = 0;
}
// ゲームイベント
class GameEvent {
    type = 0;
    message = "";
    constructor(type, message) {
        this.type = type;
        this.message = message;
    }
}
//戦闘用キャラクターデータ
class BattleCharacter {
    name = "";    //名前
    hp = 0;       //HP
    maxhp = 0;    //最大HP
    atc = 0;      //攻撃力
    def = 0;      //防御力
    speed = 0;    //素早さ
    image;      //画像

    constructor(name, hp, atc, def, speed, image) {
        this.name = name;
        this.hp = hp;
        this.maxhp = hp;
        this.atc = atc;
        this.def = def;
        this.speed = speed;
        this.image = image;
    }
}
//戦闘管理クラス
class Battle {
    status = 0;
    pro

}
