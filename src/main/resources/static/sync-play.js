/**
 * 共通変数
 */
var v = document.getElementById("video");

var logger = document.querySelector('#logArea');

/**
 * 関数定義
 */
//動画の長さ（秒）を表示
function getDuration() {
    document.getElementById("nagasa").innerHTML = v.duration;
};

// サーバと同期
function synchro() {
    logger.value += 'request eventSource\n';

    const eventSource = new EventSource('./sync/');
    eventSource.onopen = function () {
        logger.value += 'eventSource open\n';
    };
    eventSource.onerror = function () {
        logger.value += 'eventSource error\n';
    };
    eventSource.onmessage = function (event) {
        console.log(event);
    };
    eventSource.addEventListener('start', function (event) {
        const eventInfo = {
            data: event.data
        };
        logger.value += 'event=' + JSON.stringify(eventInfo) + "\n";
        v.currentTime = eventInfo.data
        if(v.paused == true){
            v.play();
        }
    }, false);
    eventSource.addEventListener('stop', function (event) {
        if(v.paused == false){
            v.pause();
        }
        const eventInfo = {
            data: event.data
        };
        logger.value += 'event=' + JSON.stringify(eventInfo) + "\n";
        v.currentTime = eventInfo.data
    }, false);
    eventSource.addEventListener('seeked', function (event) {
            const eventInfo = {
                data: event.data
            };
            logger.value += 'event=' + JSON.stringify(eventInfo) + "\n";
            v.currentTime = eventInfo.data
        }, false);
    window.currentEventSource = eventSource;
};

function playVideo() {
    //再生完了の表示をクリア
    document.getElementById("logArea").value += "call playVideo\n";

    fetch("./control/start?currentTime=" + v.currentTime ,{
        method : 'GET'
        })
    .then(data => console.log(JSON.stringify(data)))
    .catch(error => console.error(error));
};

// 動画を一時停止
function stopVideo(){
    fetch("./control/stop",{
        method : 'GET'
        })
    .then(data => console.log(JSON.stringify(data)))
    .catch(error => console.error(error));
};

// 動画のシークバーを移動して確定
function seeked(){
    fetch("./control/seeked?currentTime=" + v.currentTime ,{
            method : 'GET'
            })
        .then(data => console.log(JSON.stringify(data)))
        .catch(error => console.error(error));
};

// 動画が再生中
function updateTime(){
//    document.getElementById("currentTime").innerHTML = v.currentTime;
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

v.addEventListener("play", playVideo);
// TODO: currentTimeの上書きはseekedとみなされるためループしちゃう
//v.addEventListener("seeked", seeked);
v.addEventListener("pause", stopVideo);