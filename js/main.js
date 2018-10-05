var count = 0; // クリック数
var login1 = 0;
var flg = 1; // クリックの制御
var Timer; // ゲームのタイマー
var PassSec;   // 秒数カウント用変数
var idm; //ユーザーのID
var user_point;　// ユーザーのポイント 
var point = 0; //会得ポイント
document.getElementById("game_start").style.display = "none";
document.getElementById("score").style.display = "none";


function click1() {
    count++;
    //ポイントを出す
}

function game_start(login) {
    login1 = login;
    document.getElementById("sidenavi").style.display = "none";
    startShowing();
    setTimeout(stop, 30000);
}

function stop() {
    console.log(count + "回のクリック");
    if (login1 == 1) {
        if (count >= 60) {
            point = 40;
            console.log(point + "ポイント");
        } else if (count >= 30) {
            point = 20;
            console.log(point + "ポイント");
        } else if (count >= 20) {
            point = 10;
            console.log(point + "ポイント");
        } else if (count >= 10) {
            point = 5;
            console.log(point + "ポイント");
        } else {
            point = 0;
            console.log(point + "ポイント");
        }
        console.log(point + "ポイントです。");
        db();
    } else {
        console.log("変数loginが「" + login1 + "」なのでログインしてません");
    }
    document.getElementById("score").innerHTML = "あなたの得点は" + count + "です。<br>会得ポイントは" + point + "です。<br>";   // 表示更新    
    document.getElementById("score").innerHTML += "<button onclick = \"next();\">次へ</button>";
    document.getElementById("score").style.display = "block";
    clearInterval(PassageID);
}

function next() {
    document.getElementById("sidenavi").style.display = "block";
    document.getElementById("score").style.display = "none";
    count = 0;
}


function showPassage() {
    PassSec++;   // カウントアップ
    var msg = "ボタンを押してから " + PassSec + "秒が経過しました。";   // 表示文作成
    document.getElementById("PassageArea").innerHTML = msg;   // 表示更新
    console.log("秒");
}

function startShowing() {
    PassSec = 0;   // カウンタのリセット
    PassageID = setInterval('showPassage()', 1000);   // タイマーをセット(1000ms間隔)
}


function db() {
    var database = firebase.database();
    var dataRef = database.ref('/' + idm);
    dataRef.once("value").then(function (snapshot) {
        user_point = snapshot.child("money").val();
        var updates = {};
        updates['/' + idm + '/money'] = user_point + point - 10;
        return firebase.database().ref().update(updates);
    });
    console.log(point+"追加");
}

// IDの読み込み
function printIDm() {
    var idm = getIDm();
    var database = firebase.database();
    var dataRef = database.ref('/' + idm);
    dataRef.once("value").then(function (snapshot) {
        document.getElementById("UserName").innerHTML = 'ユーザー名：' + snapshot.child("name").val();
        document.getElementById("Point").innerHTML = 'ポイント：' + snapshot.child("money").val();
        user_point = snapshot.child("money").val();
        if (user_point >= 10) { document.getElementById("gacha").style.display = "inline"; }
    });
    document.getElementById("gacha2").style.display = "none";
}

// テストID読み込み
function printIDmDummyWithoutServer() {
    var database = firebase.database();
    var seed = "1";
    idm = getIDmDummyWithoutServer(seed);
    var dataRef = database.ref('/' + idm);
    dataRef.once("value").then(function (snapshot) {
        document.getElementById("UserName").innerHTML = 'ユーザー名：' + snapshot.child("name").val();
        document.getElementById("Point").innerHTML = 'ポイント：' + snapshot.child("money").val();
        user_point = snapshot.child("money").val();
        if (user_point >= 10) { document.getElementById("game_start").style.display = "inline"; }
        console.log(idm)
    });
    document.getElementById("ggame_start").style.display = "none";
}

// 画面更新
function reload() {
    var database = firebase.database();
    var dataRef = database.ref('/' + idm);
    dataRef.once("value").then(function (snapshot) {
        document.getElementById("UserName").innerHTML = 'ユーザー名：' + snapshot.child("name").val();
        document.getElementById("Point").innerHTML = 'ポイント：' + snapshot.child("money").val();
        user_point = snapshot.child("money").val();
        if (user_point >= 10) { document.getElementById("game_start").style.display = "inline"; }// ガチャボタンの表示
        document.getElementById("gacha").style.display = "inline";
        // tetes1 = snapshot.child("money").val();
        // tetes2 = snapshot.child("name").val();
        // console.log(tetes1);
        // console.log(tetes2);
    });
}

// ログアウト
function logout() {
    idm = null;
    if (idm == null) { document.getElementById("gacha").style.display = "none"; }
    document.getElementById("UserName").innerHTML = 'ユーザー名：' + 'ログインして';
    document.getElementById("Point").innerHTML = 'ポイント：' + 'ログインして';
    document.getElementById("gacha2").style.display = "inline";
}

// ファンクションキー無効
function check() {
    if (event.keyCode != 122 && event.keyCode >= 112 && event.keyCode <= 123) {
        event.keyCode = 0;
        return false;
    }
}
// window.document.onkeydown = check;

