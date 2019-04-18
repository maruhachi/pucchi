/**
 * 共通変数
 */

/**
 * 関数定義
 */

// 動画を一時停止
function stopVideo(){
    fetch("./control/stop",{
        method : 'GET'
        })
    .then(data => console.log(JSON.stringify(data)))
    .catch(error => console.error(error));
};

/**
 * 画面ロード時のイベント
 */

window.onload = function () {
};

/**
 * イベントハンドラのセット
 */
document.getElementById("stoper").addEventListener("click", stopVideo);
