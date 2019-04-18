/**
 * 共通変数
 */
var v = document.getElementById("video");


/**
 * イベントハンドラ定義
 */
const handlers = {

    //動画の長さ（秒）を表示
    getDuration: function () {
        document.getElementById("nagasa").innerHTML = v.duration;
    },

    // サーバと同期
    synchro: function () {
        document.querySelector('#logArea').value += 'request eventSource\n';
       
        const eventSource = new EventSource('http://localhost:8081/sync/');
        eventSource.onopen = function () {
            document.querySelector('#logArea').value += 'eventSource open\n';
        };
        eventSource.onerror = function () {
            document.querySelector('#logArea').value += 'eventSource error\n';
        };
        eventSource.onmessage = function (event) {
            console.log(event);
        };
        eventSource.addEventListener('tanoshi-count', function (event) {
            const eventInfo = {
                // たのしー！
                data: event.data
            };
            document.querySelector('#logArea').value += 'event=' + JSON.stringify(eventInfo) + "\n";
            document.querySelector('#tanoshiCount').innerHTML = eventInfo.data + "たのしー！";
            handlers.servalPopup();
        }, false);
        window.currentEventSource = eventSource;
    },

    sendEvent: function() {
        postData(`http://example.com/answer`, {answer: 42})
            // JSON-string from `response.json()` call
            .then(data => console.log(JSON.stringify(data))) 
            .catch(error => console.error(error));
    },

    playVideo: function () {
        //再生完了の表示をクリア
        document.getElementById("ended").innerHTML = "";
        //動画を再生
        v.play();

    },

    // 動画を一時停止
    stopVideo: function(){
        v.pause();
    },


    updateTime: function(){
        document.getElementById("currentTime").innerHTML = v.currentTime;
    },

    videoEnded: function(){
        document.getElementById("ended").innerHTML = "動画の再生が完了しました。";
    },


    servalPopup: function () {
        // 何秒か経ったらクラス外す（フレームアウト
        setTimeout(function () {
            target.className = "";
        }, 2100);

    },

    tanoshi: function () {
        fetch("./tanoshi/")
            .then((response) => response.text()  )
            . then((text) => document.querySelector('#logArea').value += "たのしー！\n");
    }

};

/**
 * 画面ロード時のイベント
 */

window.onload = function () {
    handlers.getDuration();
};

/**
 * イベントハンドラのセット
 */
// サーバ同期開始
document.getElementById('syncButton').addEventListener('click', handlers.synchro);

// 再生
document.getElementById("player").addEventListener("click", handlers.playVideo);
document.getElementById("stoper").addEventListener("click", handlers.stopVideo);

// 動画イベント

//再生完了を知らせる
v.addEventListener("timeupdate", handlers.updateTime, false);

//現在の再生位置（秒）を表示
v.addEventListener("ended", handlers.videoEnded, false);
