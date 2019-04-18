/**
 * 共通変数
 */
var v = document.getElementById("video");


/**
 * 関数定義
 */
//動画の長さ（秒）を表示
function getDuration() {
    document.getElementById("nagasa").innerHTML = v.duration;
};

// サーバと同期
function synchro() {
    document.querySelector('#logArea').value += 'request eventSource\n';

    const eventSource = new EventSource('./sync/');
    eventSource.onopen = function () {
        document.querySelector('#logArea').value += 'eventSource open\n';
    };
    eventSource.onerror = function () {
        document.querySelector('#logArea').value += 'eventSource error\n';
    };
    eventSource.onmessage = function (event) {
        console.log(event);
    };
    eventSource.addEventListener('start', function (event) {
        const eventInfo = {
            data: event.data
        };
        document.querySelector('#logArea').value += 'event=' + JSON.stringify(eventInfo) + "\n";
        v.currentTime = eventInfo.data
        v.play();
    }, false);
    eventSource.addEventListener('stop', function (event) {
        const eventInfo = {
            data: event.data
        };
        document.querySelector('#logArea').value += 'event=' + JSON.stringify(eventInfo) + "\n";
        v.currentTime = eventInfo.data
        v.pause();
    }, false);
    window.currentEventSource = eventSource;
};

function sendEvent(eventType) {
    var data = {"eventType": eventType, "currentTime": v.currentTime};
    console.log("data = " + data);
    fetch("./control/",{
            method : 'POST',
            body : data,
            })
        // JSON-string from `response.json()` call
        .then(data => console.log(JSON.stringify(data)))
        .catch(error => console.error(error));
};

function playVideo() {
    //再生完了の表示をクリア
    document.getElementById("logArea").value += "call playVideo\n";

    fetch("./control/start?currentTime=" + v.currentTime ,{
        method : 'GET'
        })
    .then(data => console.log(JSON.stringify(data)))
    .catch(error => console.error(error));
    //動画を再生
    v.play();

};

// 動画を一時停止
function stopVideo(){
    v.pause();
    fetch("./control/stop?currentTime=" + v.currentTime ,{
        method : 'GET'
        })
    .then(data => console.log(JSON.stringify(data)))
    .catch(error => console.error(error));
};

// 動画が再生中
function updateTime(){
    document.getElementById("currentTime").innerHTML = v.currentTime;
};

// 動画のシークバーを移動して確定
function seeked(){
    sendEvent("seeked", v.currentTime);
};

function servalPopup() {
    // 何秒か経ったらクラス外す（フレームアウト
    setTimeout(function () {
        target.className = "";
    }, 2100);
};

function tanoshi() {
    fetch("./tanoshi/")
        .then((response) => response.text()  )
        . then((text) => document.querySelector('#logArea').value += "たのしー！\n");
};


/**
 * 画面ロード時のイベント
 */

window.onload = function () {
    getDuration();
};

/**
 * イベントハンドラのセット
 */
// サーバ同期開始
document.getElementById('syncButton').addEventListener('click', synchro);

// 再生
document.getElementById("player").addEventListener("click", playVideo);
document.getElementById("stoper").addEventListener("click", stopVideo);

// 動画イベント

//現在の再生位置（秒）を表示
v.addEventListener("timeupdate", updateTime);

v.addEventListener("seeked", seeked);